import { useState, useMemo } from 'react';
import type { RssOverview, FeedSelector } from '../types/rss';
import { CategoryList } from './CategoryList';
import { FeedList } from './FeedList';
import { SearchBox } from './SearchBox';

interface SidebarProps {
  overview: RssOverview;
  selected: FeedSelector | null;
  onSelect: (selector: FeedSelector) => void;
}

export function Sidebar({ overview, selected, onSelect }: SidebarProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const selectedCategory = typeof selected === 'string' ? selected : null;
  const selectedId = typeof selected === 'number' ? selected : null;

  const filteredSources = useMemo(() => {
    let sources = overview.urls;

    if (categoryFilter) {
      sources = sources.filter(
        (s) => s.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      sources = sources.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.url.toLowerCase().includes(q) ||
          (s.category ?? '').toLowerCase().includes(q)
      );
    }

    return sources;
  }, [overview.urls, categoryFilter, search]);

  function handleCategorySelect(slug: string) {
    setCategoryFilter(slug);
    onSelect(slug);
  }

  function handleSourceSelect(urlid: number) {
    onSelect(urlid);
  }

  return (
    <nav className="sidebar" aria-label="Navigation">
      <SearchBox
        value={search}
        onChange={setSearch}
        placeholder="Filter sources…"
      />

      <CategoryList
        categories={overview.categories}
        selectedSlug={selectedCategory}
        onSelect={handleCategorySelect}
      />

      <FeedList
        sources={filteredSources}
        selectedId={selectedId}
        onSelect={handleSourceSelect}
      />
    </nav>
  );
}
