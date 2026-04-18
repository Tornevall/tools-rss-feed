import { useState } from 'react';
import type { FeedSelector } from './types/rss';
import { useOverview } from './hooks/useOverview';
import { AppShell } from './components/AppShell';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import './App.css';

export default function App() {
  const { data: overview, loading, error } = useOverview();
  const [selected, setSelected] = useState<FeedSelector | null>(null);

  if (loading) {
    return (
      <div className="app-loading">
        <LoadingState message="Loading RSS Watch…" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-loading">
        <ErrorState message={`Failed to load RSS overview: ${error}`} />
      </div>
    );
  }

  if (!overview) return null;

  // Auto-select first category or first source when nothing is selected yet
  const effectiveSelected: FeedSelector | null =
    selected ??
    overview.categories[0]?.slug ??
    overview.urls[0]?.selector ??
    null;

  return (
    <AppShell
      overview={overview}
      selected={effectiveSelected}
      onSelect={setSelected}
    />
  );
}
