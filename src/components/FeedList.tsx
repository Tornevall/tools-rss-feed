import type { RssFeedSource } from '../types/rss';

interface FeedListProps {
  sources: RssFeedSource[];
  selectedSelector: string | null;
  onSelect: (selector: string) => void;
}

export function FeedList({ sources, selectedSelector, onSelect }: FeedListProps) {
  if (sources.length === 0) {
    return <p className="nav-empty">No sources found.</p>;
  }

  return (
    <section className="nav-section">
      <h3 className="nav-section-title">Sources</h3>
      <ul className="nav-list" role="listbox" aria-label="Feed sources">
        {sources.map((src) => (
          <li key={src.selector || String(src.urlid)}>
            <button
              className={`nav-item ${selectedSelector === src.selector ? 'nav-item--active' : ''}`}
              onClick={() => onSelect(src.selector)}
              role="option"
              aria-selected={selectedSelector === src.selector}
              title={src.feedUrl || src.url}
            >
              <span className="nav-item-label">{src.title || src.url}</span>
              {src.category && (
                <span className="nav-item-tag">{src.category}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
