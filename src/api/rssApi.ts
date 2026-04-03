import type { FeedItem, RssOverview } from '../types/rss';
import { parseXmlFeed } from './xmlParser';

const API_BASE = 'https://tools.tornevall.net/api';

/**
 * Fetch the RSS overview: categories, urls, availParams.
 */
export async function getOverview(): Promise<RssOverview> {
  const res = await fetch(`${API_BASE}/rss`);
  if (!res.ok) {
    throw new Error(`Failed to fetch overview: ${res.status} ${res.statusText}`);
  }
  const data: unknown = await res.json();
  return normalizeOverview(data);
}

/**
 * Fetch and parse the feed XML for a given selector (urlid, category slug, or analytics key).
 */
export async function getFeedXml(selector: string | number): Promise<FeedItem[]> {
  const res = await fetch(`${API_BASE}/rss/feed/${selector}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch feed: ${res.status} ${res.statusText}`);
  }
  const xmlText = await res.text();
  return parseXmlFeed(xmlText);
}

// ─── Normalization helpers ─────────────────────────────────────────────────

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function normalizeOverview(raw: unknown): RssOverview {
  if (!isRecord(raw)) {
    return { urls: [], categories: [] };
  }

  const urls = Array.isArray(raw['urls'])
    ? raw['urls'].map(normalizeSource)
    : [];

  const categories = Array.isArray(raw['categories'])
    ? raw['categories'].map(normalizeCategory)
    : [];

  const availParams = Array.isArray(raw['availParams'])
    ? raw['availParams'].map(String)
    : undefined;

  return { urls, categories, availParams };
}

function normalizeSource(raw: unknown) {
  if (!isRecord(raw)) return { urlid: 0, title: '', url: '' };
  return {
    urlid: typeof raw['urlid'] === 'number' ? raw['urlid'] : Number(raw['urlid'] ?? 0),
    title: String(raw['title'] ?? ''),
    url: String(raw['url'] ?? ''),
    category: raw['category'] != null ? String(raw['category']) : undefined,
    description: raw['description'] != null ? String(raw['description']) : undefined,
  };
}

function normalizeCategory(raw: unknown) {
  if (!isRecord(raw)) return { slug: '', title: '', feedCount: 0 };
  return {
    slug: String(raw['slug'] ?? ''),
    title: String(raw['title'] ?? raw['slug'] ?? ''),
    feedCount: typeof raw['feedCount'] === 'number' ? raw['feedCount'] : Number(raw['feedCount'] ?? 0),
  };
}
