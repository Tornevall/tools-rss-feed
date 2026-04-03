import type { RssCategory } from '../types/rss';

interface CategoryListProps {
  categories: RssCategory[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
}

export function CategoryList({ categories, selectedSlug, onSelect }: CategoryListProps) {
  if (categories.length === 0) return null;

  return (
    <section className="nav-section">
      <h3 className="nav-section-title">Categories</h3>
      <ul className="nav-list" role="listbox" aria-label="Categories">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <button
              className={`nav-item ${selectedSlug === cat.slug ? 'nav-item--active' : ''}`}
              onClick={() => onSelect(cat.slug)}
              role="option"
              aria-selected={selectedSlug === cat.slug}
              title={cat.title}
            >
              <span className="nav-item-label">{cat.title || cat.slug}</span>
              <span className="nav-item-count">{cat.feedCount}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
