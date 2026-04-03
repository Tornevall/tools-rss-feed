import { useState } from 'react';
import type { FeedItem } from '../types/rss';
import { formatDate } from '../utils/date';
import { truncate } from '../utils/text';

interface FeedItemCardProps {
  item: FeedItem;
}

export function FeedItemCard({ item }: FeedItemCardProps) {
  const [expanded, setExpanded] = useState(false);

  const hasSummary = item.summary.trim().length > 0;
  const hasContent = item.content.trim().length > 0;
  const canExpand = hasContent && item.content !== item.summary;

  return (
    <article className="feed-card">
      <header className="feed-card-header">
        <h2 className="feed-card-title">
          {item.link ? (
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.title || '(no title)'}
            </a>
          ) : (
            item.title || '(no title)'
          )}
        </h2>
        <div className="feed-card-meta">
          {item.publishedAt && (
            <span className="feed-card-date">{formatDate(item.publishedAt)}</span>
          )}
          {item.sourceTitle && (
            <span className="feed-card-source">{item.sourceTitle}</span>
          )}
          {item.category && (
            <span className="feed-card-category">{item.category}</span>
          )}
        </div>
      </header>

      {hasSummary && (
        <p className="feed-card-summary">
          {expanded ? item.summary : truncate(item.summary, 300)}
        </p>
      )}

      {expanded && hasContent && (
        <div className="feed-card-content">
          {item.content}
        </div>
      )}

      <footer className="feed-card-footer">
        {canExpand && (
          <button
            className="btn-link"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-external"
          >
            Open ↗
          </a>
        )}
      </footer>
    </article>
  );
}
