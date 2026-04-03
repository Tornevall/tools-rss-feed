import type { RssFeedSource } from '../types/rss';

interface FeedListProps {
  sources: RssFeedSource[];
  selectedId: number | null;
  onSelect: (urlid: number) => void;
}

export function FeedList({ sources, selectedId, onSelect }: FeedListProps) {
  if (sources.length === 0) {
    return <p className="nav-empty">No sources found.</p>;
  }

  return (
    <section className="nav-section">
      <h3 className="nav-section-title">Sources</h3>
      <ul className="nav-list" role="listbox" aria-label="Feed sources">
        {sources.map((src) => (
          <li key={src.urlid}>
            <button
              className={`nav-item ${selectedId === src.urlid ? 'nav-item--active' : ''}`}
              onClick={() => onSelect(src.urlid)}
              role="option"
              aria-selected={selectedId === src.urlid}
              title={src.url}
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
