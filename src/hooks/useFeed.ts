import { useState, useEffect } from 'react';
import type { FeedState, FeedSelector } from '../types/rss';
import { getFeedXml } from '../api/rssApi';

interface FetchedData {
  forSelector: FeedSelector | null;
  items: FeedState['items'];
  error: string | null;
}

export function useFeed(selector: FeedSelector | null): FeedState {
  const [data, setData] = useState<FetchedData>({
    forSelector: null,
    items: [],
    error: null,
  });

  useEffect(() => {
    if (selector === null) return;

    let cancelled = false;

    getFeedXml(selector)
      .then((items) => {
        if (!cancelled) setData({ forSelector: selector, items, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : 'Unknown error';
          setData({ forSelector: selector, items: [], error: msg });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selector]);

  // Derive loading: true when a fetch is in-flight for the current selector
  const loading = selector !== null && data.forSelector !== selector;

  return { items: data.items, loading, error: data.error };
}
