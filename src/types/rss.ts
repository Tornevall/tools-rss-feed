// RSS Watch API types

export interface RssFeedSource {
  urlid: number;
  selector: string;
  title: string;
  url: string;
  category?: string;
  description?: string;
  publicSelector?: string;
  feedUrl?: string;
  categoryFeedUrl?: string;
  hidden?: boolean;
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

export type FeedSelector = string;

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
