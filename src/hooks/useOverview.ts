import { useState, useEffect } from 'react';
import type { OverviewState } from '../types/rss';
import { getOverview } from '../api/rssApi';

export function useOverview(): OverviewState {
  const [state, setState] = useState<OverviewState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    getOverview()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : 'Unknown error';
          setState({ data: null, loading: false, error: msg });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
