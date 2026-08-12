import React from 'react';
import { Compass, Search, Map, Users, Info, Palette } from 'lucide-react';

export type ThemeId = 'speleo-emerald' | 'dark-glow' | 'terrain-topo' | 'slate-clean' | 'editorial-atlas';

interface HeaderProps {
  activeTab: 'map' | 'areas' | 'groups' | 'about';
  setActiveTab: (tab: 'map' | 'areas' | 'groups' | 'about') => void;
  onOpenSearch: () => void;
  groupsCount: number;
  areasCount: number;
  currentTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  groupsCount,
  areasCount,
  currentTheme,
  onThemeChange,
}) => {
  return (
    <header className="header-bar">
      <div className="header-logo" onClick={() => setActiveTab('map')}>
        <div className="logo-icon">
          <Compass className="icon-amber" size={24} />
        </div>
        <div className="logo-text">
          <span className="logo-title font-display">SSS Map</span>
          <span className="logo-subtitle">Slovenská Speleologická Spoločnosť</span>
        </div>
      </div>

      <nav className="header-nav">
        <button
          className={`nav-item ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <Map size={16} />
          <span>Mapa</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'areas' ? 'active' : ''}`}
          onClick={() => setActiveTab('areas')}
        >
          <span>Oblasti</span>
          <span className="nav-badge">{areasCount}</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'groups' ? 'active' : ''}`}
          onClick={() => setActiveTab('groups')}
        >
          <Users size={16} />
          <span>Skupiny</span>
          <span className="nav-badge">{groupsCount}</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <Info size={16} />
          <span>O speleológii</span>
        </button>
      </nav>

      <div className="header-actions">
        {/* Live Theme Switcher */}
        <div className="theme-switcher">
          <Palette size={15} className="theme-icon" />
          <select
            className="theme-select font-ui"
            value={currentTheme}
            onChange={(e) => onThemeChange(e.target.value as ThemeId)}
            title="Vyberte vizuálnu tému mapy"
          >
            <option value="speleo-emerald">🌿 Speleo Emerald</option>
            <option value="dark-glow">🦇 Dark Cave Glow</option>
            <option value="terrain-topo">🗺️ Outdoor Topo Atlas</option>
            <option value="slate-clean">✨ Slate Clean Light</option>
            <option value="editorial-atlas">📜 Vintage NatGeo Atlas</option>
          </select>
        </div>

        <button className="search-btn" onClick={onOpenSearch}>
          <Search size={16} />
          <span className="search-placeholder">Nájsť...</span>
          <kbd className="search-kbd">⌘K</kbd>
        </button>
      </div>

      <style>{`
        .header-bar {
          position: absolute;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 32px);
          max-width: 1280px;
          height: 64px;
          background: rgba(30, 37, 34, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(213, 206, 194, 0.16);
          border-radius: var(--radius-lg);
          padding: 0 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 10;
          box-shadow: var(--shadow-floating);
        }

        .header-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
        }

        .logo-icon {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          background: rgba(224, 145, 47, 0.15);
          border: 1px solid rgba(224, 145, 47, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-amber {
          color: var(--color-lantern-amber);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .logo-title {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--color-limestone);
          letter-spacing: -0.01em;
        }

        .logo-subtitle {
          font-size: 0.7rem;
          color: var(--color-fog);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(0, 0, 0, 0.25);
          padding: 4px;
          border-radius: var(--radius-md);
        }

        .nav-item {
          background: transparent;
          border: none;
          color: var(--color-fog);
          font-family: var(--font-ui);
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0.45rem 0.85rem;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: all var(--transition-fast);
        }

        .nav-item:hover {
          color: var(--color-limestone);
          background: rgba(255, 255, 255, 0.06);
        }

        .nav-item.active {
          color: var(--color-cave-stone);
          background: var(--color-limestone);
          font-weight: 600;
        }

        .nav-badge {
          background: rgba(224, 145, 47, 0.2);
          color: var(--color-lantern-amber);
          font-size: 0.72rem;
          padding: 1px 6px;
          border-radius: 99px;
          font-weight: 600;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .theme-switcher {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(213, 206, 194, 0.16);
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-md);
        }

        .theme-icon {
          color: var(--color-lantern-amber);
        }

        .theme-select {
          background: transparent;
          border: none;
          outline: none;
          color: var(--color-limestone);
          font-size: 0.8rem;
          cursor: pointer;
          font-weight: 500;
        }

        .theme-select option {
          background: #1E2522;
          color: #F4EFE6;
        }

        .search-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(213, 206, 194, 0.15);
          color: var(--color-fog);
          border-radius: var(--radius-md);
          padding: 0.45rem 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all var(--transition-fast);
        }

        .search-btn:hover {
          border-color: var(--color-lantern-amber);
          color: var(--color-limestone);
          background: rgba(224, 145, 47, 0.08);
        }

        .search-placeholder {
          font-size: 0.82rem;
        }

        .search-kbd {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          padding: 1px 5px;
          font-size: 0.7rem;
          color: var(--color-fog);
        }

        @media (max-width: 900px) {
          .theme-select {
            font-size: 0.75rem;
          }
          .search-placeholder, .search-kbd {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
