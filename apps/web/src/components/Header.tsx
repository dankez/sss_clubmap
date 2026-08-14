import React from 'react';
import { Search, Map, Users, Palette, Shield, UserCheck, Mountain, MapPin, Layers, Globe } from 'lucide-react';
import { MapLayerId } from './LayerControlWidget';

export type ThemeId = 'slate-clean' | 'speleo-emerald' | 'dark-glow' | 'terrain-topo' | 'editorial-atlas';

interface HeaderProps {
  activeTab: 'map' | 'areas' | 'groups' | 'about';
  setActiveTab: (tab: 'map' | 'areas' | 'groups' | 'about') => void;
  onOpenSearch: () => void;
  groupsCount: number;
  areasCount: number;
  currentTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
  currentMapLayer: MapLayerId;
  onLayerChange: (layerId: MapLayerId) => void;
  is3D: boolean;
  onToggle3D: () => void;
  showPolygons: boolean;
  onTogglePolygons: () => void;
  showPois: boolean;
  onTogglePois: () => void;
  onOpenWpModal: () => void;
  onOpenAdminModal: () => void;
  isLoggedIn: boolean;
  adminEmail: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  groupsCount,
  areasCount,
  currentTheme,
  onThemeChange,
  currentMapLayer,
  onLayerChange,
  is3D,
  onToggle3D,
  showPolygons,
  onTogglePolygons,
  showPois,
  onTogglePois,
  onOpenWpModal,
  onOpenAdminModal,
  isLoggedIn,
  adminEmail,
}) => {
  return (
    <header className="header-bar">
      {/* Brand Logo & Title with Official SSS Logo */}
      <div className="header-logo" onClick={() => setActiveTab('map')}>
        <div className="logo-icon">
          <img src="/logos/sss_logo_official.png" alt="SSS" className="sss-logo-head-img" />
        </div>
        <div className="logo-text">
          <span className="logo-title font-display">SSS Map</span>
          <span className="logo-subtitle">Slovenská Speleologická Spoločnosť</span>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav className="header-nav">
        <button
          className={`nav-item ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
          title="Zobraziť mapu"
        >
          <Map size={15} />
          <span>Mapa</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'areas' ? 'active' : ''}`}
          onClick={() => setActiveTab('areas')}
          title="Zobraziť oblasti"
        >
          <span>Oblasti</span>
          <span className="nav-badge">{areasCount}</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'groups' ? 'active' : ''}`}
          onClick={() => setActiveTab('groups')}
          title="Zobraziť zoznam skupín"
        >
          <Users size={15} />
          <span>Skupiny</span>
          <span className="nav-badge">{groupsCount}</span>
        </button>
        <button
          className={`nav-item nav-item-sss ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
          title="O Slovenskej Speleologickej Spoločnosti (sss.sk)"
        >
          <img src="/logos/sss_logo_official.png" alt="SSS Logo" className="nav-sss-mini-logo" />
          <span>O SSS</span>
        </button>
      </nav>

      {/* Action Controls - Toggles & Icon Dropdowns */}
      <div className="header-actions">
        {/* Toggle Polygons ON/OFF Button */}
        <button
          className={`icon-action-btn ${showPolygons ? 'is-active-toggle' : ''}`}
          onClick={onTogglePolygons}
          title={showPolygons ? 'Vypnúť polygóny oblastí' : 'Zapnúť polygóny oblastí'}
        >
          <Layers size={16} />
        </button>

        {/* Toggle POI Logos ON/OFF Button */}
        <button
          className={`icon-action-btn ${showPois ? 'is-active-toggle' : ''}`}
          onClick={onTogglePois}
          title={showPois ? 'Vypnúť POI logá klubov' : 'Zapnúť POI logá klubov'}
        >
          <MapPin size={16} />
        </button>

        {/* True 3D Map View Toggle Button */}
        <button
          className={`icon-action-btn btn-3d ${is3D ? 'is-3d-active' : ''}`}
          onClick={onToggle3D}
          title={is3D ? 'Prepnúť do 2D zobrazenia' : 'Prepnúť do reálneho 3D terénu (DEM)'}
        >
          <span className="btn-3d-text">3D</span>
        </button>

        {/* Map Layer Switcher Icon Dropdown */}
        <div className="icon-dropdown-box" title="Podkladová mapa terénu (OpenTopoMap, Vrstevnice)">
          <Mountain size={16} className="action-icon layer-icon-color" />
          <select
            className="icon-select font-ui"
            value={currentMapLayer}
            onChange={(e) => onLayerChange(e.target.value as MapLayerId)}
          >
            <option value="opentopomap">🏔️ Terén & Vrstevnice (OpenTopoMap)</option>
            <option value="arcgis-topo">🗺️ ArcGIS World Topo</option>
            <option value="cyclosm">🚴 Outdoor Topo & Relief</option>
            <option value="slate-clean">✨ Slate Clean Light</option>
            <option value="dark-glow">🦇 Dark Cave Glow</option>
          </select>
        </div>

        {/* Visual Theme Switcher Icon Dropdown */}
        <div className="icon-dropdown-box" title="Vizuálna téma UI">
          <Palette size={16} className="action-icon theme-icon-color" />
          <select
            className="icon-select font-ui"
            value={currentTheme}
            onChange={(e) => onThemeChange(e.target.value as ThemeId)}
          >
            <option value="slate-clean">✨ Slate Clean Light</option>
            <option value="speleo-emerald">🌿 Speleo Emerald</option>
            <option value="dark-glow">🦇 Dark Cave Glow</option>
            <option value="terrain-topo">🗺️ Outdoor Topo Atlas</option>
            <option value="editorial-atlas">📜 Vintage NatGeo Atlas</option>
          </select>
        </div>

        {/* Web Embed & WordPress Shortcode Generator Button */}
        <button
          className="icon-action-btn wp-btn"
          onClick={onOpenWpModal}
          title="Vložiť mapu na web (HTML iFrame & WordPress Plugin)"
        >
          <Globe size={16} className="wp-globe-icon" />
        </button>

        {/* Global Quick Search Button */}
        <button className="icon-action-btn search-btn" onClick={onOpenSearch} title="Rýchle vyhľadávanie (⌘K)">
          <Search size={16} />
        </button>

        {/* Admin Portal Button */}
        <button
          className={`icon-action-btn admin-btn ${isLoggedIn ? 'is-logged-in' : ''}`}
          onClick={onOpenAdminModal}
          title={isLoggedIn ? `Prihlásený ako ${adminEmail}` : 'Prihlásiť sa ako správca'}
        >
          {isLoggedIn ? <UserCheck size={16} /> : <Shield size={16} />}
        </button>
      </div>

      <style>{`
        .header-bar {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          max-width: 100%;
          height: 48px;
          background: rgba(26, 32, 29, 0.94);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(213, 206, 194, 0.15);
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 10;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          transition: background 0.3s ease, border-color 0.3s ease;
        }

        .theme-slate-clean .header-bar {
          background: rgba(255, 255, 255, 0.94);
          border-bottom: 1px solid rgba(148, 163, 184, 0.25);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
        }

        .theme-slate-clean .logo-title { color: #0F172A; }
        .theme-slate-clean .logo-subtitle { color: #64748B; }

        .theme-slate-clean .header-nav {
          background: rgba(226, 232, 240, 0.7);
        }

        .theme-slate-clean .nav-item {
          color: #475569;
        }

        .theme-slate-clean .nav-item.active {
          color: #0F172A;
          background: #FFFFFF;
        }

        .header-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          cursor: pointer;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(224, 145, 47, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 2px;
        }

        .sss-logo-head-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .logo-title {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--color-limestone);
          line-height: 1.1;
        }

        .logo-subtitle {
          font-size: 0.65rem;
          color: var(--color-fog);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: rgba(0, 0, 0, 0.25);
          padding: 3px;
          border-radius: var(--radius-md);
        }

        .nav-item {
          background: transparent;
          border: none;
          color: var(--color-fog);
          font-family: var(--font-ui);
          font-size: 0.82rem;
          font-weight: 500;
          padding: 0.35rem 0.7rem;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: all var(--transition-fast);
        }

        .nav-item:hover {
          color: var(--color-limestone);
          background: rgba(255, 255, 255, 0.08);
        }

        .nav-item.active {
          color: var(--color-cave-stone);
          background: var(--color-limestone);
          font-weight: 600;
        }

        .nav-sss-mini-logo {
          width: 18px;
          height: 18px;
          object-fit: contain;
          border-radius: 3px;
          background: #FFFFFF;
          padding: 1px;
        }

        .nav-badge {
          background: rgba(224, 145, 47, 0.2);
          color: var(--color-lantern-amber);
          font-size: 0.7rem;
          padding: 1px 5px;
          border-radius: 99px;
          font-weight: 600;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .btn-3d-text {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.78rem;
          letter-spacing: 0.04em;
        }

        .icon-action-btn.is-active-toggle {
          background: rgba(13, 148, 136, 0.25) !important;
          border-color: #0D9488 !important;
          color: #0D9488 !important;
        }

        .btn-3d.is-3d-active {
          background: var(--color-lantern-amber) !important;
          color: #1A140E !important;
          border-color: var(--color-lantern-amber) !important;
          box-shadow: 0 0 14px rgba(224, 145, 47, 0.5);
        }

        .wp-btn {
          color: var(--color-lantern-amber) !important;
          border-color: rgba(224, 145, 47, 0.3) !important;
        }

        .wp-btn:hover {
          background: rgba(224, 145, 47, 0.2) !important;
        }

        .wp-globe-icon {
          color: var(--color-lantern-amber);
        }

        .icon-dropdown-box {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(213, 206, 194, 0.18);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s;
        }

        .theme-slate-clean .icon-dropdown-box {
          background: rgba(241, 245, 249, 0.9);
          border-color: rgba(148, 163, 184, 0.35);
        }

        .icon-dropdown-box:hover {
          border-color: var(--color-lantern-amber);
          background: rgba(224, 145, 47, 0.12);
        }

        .action-icon {
          pointer-events: none;
        }

        .layer-icon-color { color: #0D9488; }
        .theme-icon-color { color: var(--color-lantern-amber); }

        .icon-select {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }

        .icon-select option {
          background: #1E2522;
          color: #F4EFE6;
          padding: 8px;
        }

        .icon-action-btn {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(213, 206, 194, 0.18);
          color: var(--color-fog);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .theme-slate-clean .icon-action-btn {
          background: rgba(241, 245, 249, 0.9);
          border-color: rgba(148, 163, 184, 0.35);
          color: #475569;
        }

        .icon-action-btn:hover {
          border-color: var(--color-lantern-amber);
          color: var(--color-lantern-amber);
          background: rgba(224, 145, 47, 0.12);
        }

        .admin-btn.is-logged-in {
          background: rgba(91, 124, 78, 0.25);
          border-color: rgba(91, 124, 78, 0.5);
          color: #8FD8A0;
        }

        @media (max-width: 768px) {
          .logo-subtitle { display: none; }
          .nav-item span { display: none; }
        }
      `}</style>
    </header>
  );
};
