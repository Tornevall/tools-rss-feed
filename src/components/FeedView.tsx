import type { FeedSelector } from '../types/rss';
import { useFeed } from '../hooks/useFeed';
import { FeedItemCard } from './FeedItemCard';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';

interface FeedViewProps {
  selector: FeedSelector | null;
}

export function FeedView({ selector }: FeedViewProps) {
  const { items, loading, error } = useFeed(selector);

  if (selector === null) {
    return (
      <div className="feed-view feed-view--empty">
        <p>Select a category or source to view entries.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="feed-view">
        <LoadingState message="Loading feed…" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="feed-view">
        <ErrorState message={`Could not load feed: ${error}`} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="feed-view feed-view--empty">
        <p>No entries found in this feed.</p>
      </div>
    );
  }

  return (
    <div className="feed-view">
      <ul className="feed-item-list" aria-label="Feed entries">
        {items.map((item, idx) => (
          <li key={item.id || `item-${idx}`}>
            <FeedItemCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
