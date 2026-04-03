import type { FeedSelector, RssOverview } from '../types/rss';
import { Sidebar } from './Sidebar';
import { FeedView } from './FeedView';

interface AppShellProps {
  overview: RssOverview;
  selected: FeedSelector | null;
  onSelect: (selector: FeedSelector) => void;
}

export function AppShell({ overview, selected, onSelect }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1 className="app-title">📡 RSS Watch</h1>
        <p className="app-subtitle">Tornevall Networks</p>
      </header>

      <div className="app-body">
        <aside className="app-sidebar">
          <Sidebar overview={overview} selected={selected} onSelect={onSelect} />
        </aside>

        <main className="app-main" role="main">
          <FeedView selector={selected} />
        </main>
      </div>
    </div>
  );
}
