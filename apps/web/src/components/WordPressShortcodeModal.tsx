import React, { useState } from 'react';
import { X, Code, Copy, Check, Download, Layers, MapPin, Mountain, Globe } from 'lucide-react';
import { GroupData, AreaData } from '../types';
import { MapLayerId } from './LayerControlWidget';
import { ThemeId } from './Header';

interface WordPressShortcodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  groups: GroupData[];
  areas: AreaData[];
  currentMapLayer: MapLayerId;
  currentTheme: ThemeId;
  showPolygons: boolean;
  showPois: boolean;
  is3D: boolean;
}

export const WordPressShortcodeModal: React.FC<WordPressShortcodeModalProps> = ({
  isOpen,
  onClose,
  groups,
  areas,
  currentMapLayer,
  currentTheme,
  showPolygons,
  showPois,
  is3D,
}) => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [selectedAreaId, setSelectedAreaId] = useState<string>('');
  const [layer, setLayer] = useState<MapLayerId>(currentMapLayer);
  const [theme, setTheme] = useState<ThemeId>(currentTheme);
  const [polygons, setPolygons] = useState<boolean>(showPolygons);
  const [pois, setPois] = useState<boolean>(showPois);
  const [enable3D, setEnable3D] = useState<boolean>(is3D);
  const [height, setHeight] = useState<string>('520px');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Build Shortcode string
  let shortcode = `[sss_speleo_map`;
  if (selectedGroupId) shortcode += ` group="${selectedGroupId}"`;
  if (selectedAreaId) shortcode += ` area="${selectedAreaId}"`;
  if (layer !== 'opentopomap') shortcode += ` layer="${layer}"`;
  if (theme !== 'slate-clean') shortcode += ` theme="${theme}"`;
  if (!polygons) shortcode += ` polygons="false"`;
  if (!pois) shortcode += ` pois="false"`;
  if (enable3D) shortcode += ` is3d="true"`;
  if (height !== '520px') shortcode += ` height="${height}"`;
  shortcode += `]`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortcode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="wp-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-title-box">
            <div className="wp-badge-icon">
              <Globe size={22} className="wp-icon-gold" />
            </div>
            <div>
              <span className="wp-badge">WebSupport & WordPress Plugin</span>
              <h2 className="modal-title font-display">Generátor Shortcode pre WordPress</h2>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Zatvoriť">
            <X size={20} />
          </button>
        </div>

        <div className="wp-modal-body">
          <p className="wp-intro font-ui">
            Nakonfigurujte si parametre mapy. Generovaný <strong>shortcode</strong> stačí vložiť do akéhokoľvek
            príspevku alebo stránky vo WordPress (WebSupport Webhosting).
          </p>

          <div className="wp-config-grid">
            {/* Group Selection */}
            <div className="config-group">
              <label>Klub / Skupina (Voliteľné)</label>
              <select value={selectedGroupId} onChange={(e) => setSelectedGroupId(e.target.value)}>
                <option value="">-- Všetky kluby na mape --</option>
                {groups.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name} ({g.hq_city || 'Sídlo'})
                  </option>
                ))}
              </select>
            </div>

            {/* Area Selection */}
            <div className="config-group">
              <label>Krasová oblasť (Voliteľné)</label>
              <select value={selectedAreaId} onChange={(e) => setSelectedAreaId(e.target.value)}>
                <option value="">-- Všetky oblasti --</option>
                {areas.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Basemap Layer */}
            <div className="config-group">
              <label><Mountain size={14} /> Podkladová mapa</label>
              <select value={layer} onChange={(e) => setLayer(e.target.value as MapLayerId)}>
                <option value="opentopomap">🏔️ Terén & Vrstevnice (OpenTopoMap)</option>
                <option value="arcgis-topo">🗺️ ArcGIS World Topo</option>
                <option value="cyclosm">🚴 Outdoor Topo & Relief</option>
                <option value="slate-clean">✨ Slate Clean Light</option>
                <option value="dark-glow">🦇 Dark Cave Glow</option>
              </select>
            </div>

            {/* Theme */}
            <div className="config-group">
              <label>Vizuálna téma</label>
              <select value={theme} onChange={(e) => setTheme(e.target.value as ThemeId)}>
                <option value="slate-clean">✨ Slate Clean Light</option>
                <option value="speleo-emerald">🌿 Speleo Emerald</option>
                <option value="dark-glow">🦇 Dark Cave Glow</option>
                <option value="terrain-topo">🗺️ Outdoor Topo Atlas</option>
                <option value="editorial-atlas">📜 Vintage NatGeo Atlas</option>
              </select>
            </div>
          </div>

          {/* Toggle Switches Row */}
          <div className="wp-toggles-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={polygons}
                onChange={(e) => setPolygons(e.target.checked)}
              />
              <Layers size={15} /> Polygóny oblastí
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={pois}
                onChange={(e) => setPois(e.target.checked)}
              />
              <MapPin size={15} /> POI logá klubov
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={enable3D}
                onChange={(e) => setEnable3D(e.target.checked)}
              />
              <Mountain size={15} /> 3D DEM Terén
            </label>

            <div className="height-input-box">
              <span>Výška:</span>
              <input
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="520px"
              />
            </div>
          </div>

          {/* Generated Shortcode Box */}
          <div className="shortcode-output-box">
            <div className="shortcode-box-header">
              <span className="shortcode-tag font-ui"><Code size={14} /> Vygenerovaný WordPress Shortcode:</span>
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? <Check size={15} className="copied-icon" /> : <Copy size={15} />}
                <span>{copied ? 'Kopírované!' : 'Kopírovať shortcode'}</span>
              </button>
            </div>
            <code className="shortcode-text font-mono">{shortcode}</code>
          </div>

          {/* Plugin Download Box */}
          <div className="plugin-download-banner">
            <div className="banner-left">
              <strong>WordPress Plugin Pre WebSupport Hosting</strong>
              <p>Stiahnite si bezplatný plugin SSS Speleo Map a nainštalujte ho vo WordPress (Plugins → Pridať nový → Nahrať súbor .zip).</p>
            </div>
            <a
              href="/wordpress-plugin/sss-speleo-map-plugin.zip"
              download="sss-speleo-map-plugin.zip"
              className="download-plugin-btn font-ui"
            >
              <Download size={16} /> Stiahnuť Plugin (.zip)
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.78);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .wp-modal {
          width: 780px;
          max-width: 95%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 2rem;
          background: rgba(28, 34, 31, 0.96);
          border-radius: var(--radius-lg);
        }

        .header-title-box {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .wp-badge-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(224, 145, 47, 0.15);
          border: 1px solid rgba(224, 145, 47, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wp-icon-gold {
          color: var(--color-lantern-amber);
        }

        .wp-badge {
          font-size: 0.72rem;
          color: var(--color-lantern-amber);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 700;
        }

        .modal-title {
          font-size: 1.35rem;
          color: var(--color-limestone);
          margin: 0;
        }

        .wp-intro {
          font-size: 0.9rem;
          color: var(--color-fog);
          margin: 1rem 0 1.25rem 0;
          line-height: 1.5;
        }

        .wp-config-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .config-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .config-group label {
          font-size: 0.8rem;
          color: var(--color-fog);
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .config-group select {
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(213, 206, 194, 0.2);
          border-radius: var(--radius-md);
          padding: 0.6rem 0.85rem;
          color: var(--color-limestone);
          font-size: 0.88rem;
          outline: none;
        }

        .wp-toggles-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1.25rem;
          background: rgba(0, 0, 0, 0.25);
          padding: 0.85rem 1.1rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.25rem;
          border: 1px solid rgba(213, 206, 194, 0.1);
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--color-limestone);
          font-size: 0.85rem;
          cursor: pointer;
        }

        .height-input-box {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.85rem;
          color: var(--color-fog);
          margin-left: auto;
        }

        .height-input-box input {
          width: 80px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(213, 206, 194, 0.2);
          color: var(--color-limestone);
          padding: 0.3rem 0.5rem;
          border-radius: 6px;
          font-size: 0.82rem;
          outline: none;
        }

        .shortcode-output-box {
          background: #111614;
          border: 1px solid rgba(224, 145, 47, 0.35);
          border-radius: var(--radius-md);
          padding: 1rem;
          margin-bottom: 1.25rem;
        }

        .shortcode-box-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .shortcode-tag {
          font-size: 0.8rem;
          color: var(--color-lantern-amber);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 600;
        }

        .copy-btn {
          background: rgba(224, 145, 47, 0.2);
          border: 1px solid var(--color-lantern-amber);
          color: var(--color-lantern-amber);
          padding: 0.35rem 0.75rem;
          border-radius: 6px;
          font-size: 0.8rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          transition: all 0.2s;
        }

        .copy-btn:hover {
          background: var(--color-lantern-amber);
          color: #1A140E;
        }

        .shortcode-text {
          display: block;
          color: #8FD8A0;
          font-size: 0.95rem;
          word-break: break-all;
          user-select: all;
          background: rgba(0, 0, 0, 0.4);
          padding: 0.65rem 0.85rem;
          border-radius: 6px;
        }

        .plugin-download-banner {
          background: rgba(13, 148, 136, 0.12);
          border: 1px solid rgba(13, 148, 136, 0.35);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .banner-left strong {
          color: #8FD8A0;
          display: block;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .banner-left p {
          color: var(--color-fog);
          font-size: 0.8rem;
          margin: 0;
        }

        .download-plugin-btn {
          background: #0D9488;
          color: #FFFFFF;
          font-weight: 600;
          font-size: 0.85rem;
          padding: 0.55rem 0.95rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          white-space: nowrap;
          transition: all 0.2s;
        }

        .download-plugin-btn:hover {
          background: #0F766E;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
};
