import React, { useState } from 'react';
import { Layers, Mountain } from 'lucide-react';

export type MapLayerId = 'opentopomap' | 'arcgis-topo' | 'cyclosm' | 'slate-clean' | 'dark-glow';

interface LayerControlWidgetProps {
  currentLayer: MapLayerId;
  onSelectLayer: (layerId: MapLayerId) => void;
}

export const MAP_LAYERS: Array<{ id: MapLayerId; name: string; desc: string; icon: string; tileUrl: string; maxZoom: number }> = [
  {
    id: 'opentopomap',
    name: 'OpenTopoMap (Najdetailnejší terén)',
    desc: 'Vrstevnice, názvy vrchov, výškové kótovanie a skalný reliéf',
    icon: '🏔️',
    tileUrl: 'https://tile.opentopomap.org/{z}/{x}/{y}.png',
    maxZoom: 17
  },
  {
    id: 'arcgis-topo',
    name: 'ArcGIS World Topo',
    desc: 'Detailná svetová topografia a terénne vrstevnice',
    icon: '🗺️',
    tileUrl: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{x}/{y}',
    maxZoom: 19
  },
  {
    id: 'cyclosm',
    name: 'Outdoor Topo & Relief',
    desc: 'Vrstevnice a terénne prvky prírody',
    icon: '🚴',
    tileUrl: 'https://a.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
    maxZoom: 18
  },
  {
    id: 'slate-clean',
    name: 'Slate Clean Light',
    desc: 'Svetlý výhodiskový podklad',
    icon: '✨',
    tileUrl: 'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    maxZoom: 19
  },
  {
    id: 'dark-glow',
    name: 'Dark Cave Glow',
    desc: 'Tmavý podklad pre kontrast',
    icon: '🦇',
    tileUrl: 'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
    maxZoom: 19
  }
];

export const LayerControlWidget: React.FC<LayerControlWidgetProps> = ({
  currentLayer,
  onSelectLayer,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="layer-control-container">
      <button
        className={`layer-toggle-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Vrstvy podkladových máp (Terén, vrstevnice, vrcholy)"
      >
        <Layers size={18} />
        <span className="layer-btn-text">Podkladové mapy</span>
      </button>

      {isOpen && (
        <div className="layer-menu glass-panel">
          <div className="layer-menu-header">
            <Mountain size={16} className="icon-amber" />
            <span>Výber podkladovej mapy terénu</span>
          </div>

          <div className="layers-list">
            {MAP_LAYERS.map((layer) => (
              <div
                key={layer.id}
                className={`layer-option-card ${currentLayer === layer.id ? 'selected' : ''}`}
                onClick={() => {
                  onSelectLayer(layer.id);
                  setIsOpen(false);
                }}
              >
                <span className="layer-icon">{layer.icon}</span>
                <div className="layer-info">
                  <span className="layer-name">{layer.name}</span>
                  <span className="layer-desc">{layer.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .layer-control-container {
          position: absolute;
          top: 92px;
          right: 24px;
          z-index: 15;
        }

        .layer-toggle-btn {
          background: rgba(30, 37, 34, 0.9);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(224, 145, 47, 0.35);
          color: var(--color-limestone);
          padding: 0.55rem 0.85rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-family: var(--font-ui);
          font-size: 0.85rem;
          font-weight: 600;
          box-shadow: var(--shadow-card);
          transition: all 0.2s ease;
        }

        .layer-toggle-btn:hover, .layer-toggle-btn.active {
          background: var(--color-lantern-amber);
          color: #1A140E;
          border-color: var(--color-lantern-amber);
        }

        .theme-slate-clean .layer-toggle-btn {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(148, 163, 184, 0.4);
          color: #0F172A;
        }

        .theme-slate-clean .layer-toggle-btn:hover,
        .theme-slate-clean .layer-toggle-btn.active {
          background: var(--color-lantern-amber);
          color: #1A140E;
        }

        .layer-menu {
          position: absolute;
          top: 48px;
          right: 0;
          width: 320px;
          padding: 1rem;
          background: rgba(30, 37, 34, 0.96);
          backdrop-filter: blur(20px);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-floating);
          animation: fadeInDown 0.2s ease-out forwards;
        }

        .theme-slate-clean .layer-menu {
          background: rgba(255, 255, 255, 0.97);
          border: 1px solid rgba(148, 163, 184, 0.3);
          color: #0F172A;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .layer-menu-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 600;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(213, 206, 194, 0.15);
          margin-bottom: 0.75rem;
          color: var(--color-limestone);
        }

        .theme-slate-clean .layer-menu-header {
          color: #0F172A;
        }

        .layers-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .layer-option-card {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          padding: 0.55rem 0.65rem;
          border-radius: var(--radius-md);
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
          background: rgba(255, 255, 255, 0.04);
        }

        .theme-slate-clean .layer-option-card {
          background: rgba(241, 245, 249, 0.8);
        }

        .layer-option-card:hover {
          border-color: var(--color-lantern-amber);
          background: rgba(224, 145, 47, 0.08);
        }

        .layer-option-card.selected {
          border-color: var(--color-lantern-amber);
          background: rgba(224, 145, 47, 0.16);
        }

        .layer-icon {
          font-size: 1.1rem;
        }

        .layer-info {
          display: flex;
          flex-direction: column;
        }

        .layer-name {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-limestone);
        }

        .theme-slate-clean .layer-name {
          color: #0F172A;
        }

        .layer-desc {
          font-size: 0.72rem;
          color: var(--color-fog);
          line-height: 1.3;
        }

        .theme-slate-clean .layer-desc {
          color: #64748B;
        }

        @media (max-width: 640px) {
          .layer-btn-text {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
