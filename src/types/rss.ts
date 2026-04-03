// RSS Watch API types

export interface RssFeedSource {
  urlid: number;
  title: string;
  url: string;
  category?: string;
  description?: string;
}

export interface RssCategory {
  slug: string;
  title: string;
  feedCount: number;
}

export interface RssOverview {
  urls: RssFeedSource[];
  categories: RssCategory[];
  availParams?: string[];
}

export interface FeedItem {
  id: string;
  title: string;
  link: string;
  summary: string;
  content: string;
  publishedAt: Date | null;
  sourceTitle: string;
  category: string;
}

export type FeedSelector =
  | number
  | string
  | 'analytics-daily'
  | 'analytics-weekly'
  | 'analytics-monthly'
  | 'analytics-yearly'
  | 'analytics-bulk';

export interface FeedState {
  items: FeedItem[];
  loading: boolean;
  error: string | null;
}

export interface OverviewState {
  data: RssOverview | null;
  loading: boolean;
  error: string | null;
}
