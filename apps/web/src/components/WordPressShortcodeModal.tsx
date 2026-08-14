import React, { useState } from 'react';
import { X, Code, Copy, Check, Download, Layers, MapPin, Mountain, Globe, Layout, ExternalLink, Link2, Sparkles, Maximize2, ZoomIn } from 'lucide-react';
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

export type EmbedTab = 'iframe' | 'shortcode' | 'url';

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
  const [activeEmbedTab, setActiveEmbedTab] = useState<EmbedTab>('iframe');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [selectedAreaId, setSelectedAreaId] = useState<string>('');
  const [layer, setLayer] = useState<MapLayerId>(currentMapLayer);
  const [theme, setTheme] = useState<ThemeId>(currentTheme);
  const [polygons, setPolygons] = useState<boolean>(showPolygons);
  const [pois, setPois] = useState<boolean>(showPois);
  const [enable3D, setEnable3D] = useState<boolean>(is3D);
  const [width, setWidth] = useState<string>('100%');
  const [height, setHeight] = useState<string>('560px');
  const [zoom, setZoom] = useState<string>('');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  // Base URL for standalone embed
  const origin = typeof window !== 'undefined' && window.location.origin.includes('http') && !window.location.origin.includes('localhost') && !window.location.origin.includes('127.0.0.1')
    ? window.location.origin
    : 'https://kluby.sss.sk';

  // Construct URL parameters
  const params = new URLSearchParams();
  params.set('embed', 'true');
  if (selectedGroupId) params.set('group', selectedGroupId);
  if (selectedAreaId) params.set('area', selectedAreaId);
  if (layer !== 'opentopomap') params.set('layer', layer);
  if (theme !== 'slate-clean') params.set('theme', theme);
  if (!polygons) params.set('polygons', 'false');
  if (!pois) params.set('pois', 'false');
  if (enable3D) params.set('is3d', 'true');
  if (zoom.trim()) params.set('zoom', zoom.trim());

  const embedUrl = `${origin}/?${params.toString()}`;

  // Construct HTML iFrame embed code
  const iframeCode = `<iframe
  src="${embedUrl}"
  width="${width}"
  height="${height}"
  frameborder="0"
  style="border: 0; border-radius: 12px; width: ${width}; min-height: ${height}; box-shadow: 0 4px 20px rgba(0,0,0,0.15);"
  allow="geolocation"
  loading="lazy"
  title="SSS Speleo Mapa"
></iframe>`;

  // Construct WordPress Shortcode
  let shortcode = `[sss_speleo_map`;
  if (selectedGroupId) shortcode += ` group="${selectedGroupId}"`;
  if (selectedAreaId) shortcode += ` area="${selectedAreaId}"`;
  if (layer !== 'opentopomap') shortcode += ` layer="${layer}"`;
  if (theme !== 'slate-clean') shortcode += ` theme="${theme}"`;
  if (!polygons) shortcode += ` polygons="false"`;
  if (!pois) shortcode += ` pois="false"`;
  if (enable3D) shortcode += ` is3d="true"`;
  if (width !== '100%') shortcode += ` width="${width}"`;
  if (height !== '560px') shortcode += ` height="${height}"`;
  if (zoom.trim()) shortcode += ` zoom="${zoom.trim()}"`;
  shortcode += `]`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="wp-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="header-title-box">
            <div className="wp-badge-icon">
              <Layout size={22} className="wp-icon-gold" />
            </div>
            <div>
              <span className="wp-badge">Vloženie mapy na web & portál</span>
              <h2 className="modal-title font-display">Generátor iFrame kódu & WordPress Shortcode</h2>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Zatvoriť">
            <X size={20} />
          </button>
        </div>

        <div className="wp-modal-body">
          {/* Format Tabs Switcher */}
          <div className="embed-tabs-bar">
            <button
              className={`embed-tab-btn ${activeEmbedTab === 'iframe' ? 'active' : ''}`}
              onClick={() => setActiveEmbedTab('iframe')}
            >
              <Code size={16} />
              <span>Univerzálny HTML iFrame</span>
              <span className="tab-pill">Odporúčané pre všetky weby</span>
            </button>
            <button
              className={`embed-tab-btn ${activeEmbedTab === 'shortcode' ? 'active' : ''}`}
              onClick={() => setActiveEmbedTab('shortcode')}
            >
              <Globe size={16} />
              <span>WordPress Shortcode</span>
              <span className="tab-pill">WebSupport Plugin</span>
            </button>
            <button
              className={`embed-tab-btn ${activeEmbedTab === 'url' ? 'active' : ''}`}
              onClick={() => setActiveEmbedTab('url')}
            >
              <Link2 size={16} />
              <span>Priamy Embed Odkaz</span>
            </button>
          </div>

          <p className="wp-intro font-ui">
            {activeEmbedTab === 'iframe' && (
              <>
                Vygenerovaný <strong>HTML kód iFrame</strong> môžete vložiť do akéhokoľvek redakčného systému alebo webu (Webnode, Wix, Squarespace, Joomla, Drupal, vlastné HTML, Notion a ďalšie).
              </>
            )}
            {activeEmbedTab === 'shortcode' && (
              <>
                Vygenerovaný <strong>shortcode</strong> vložte do príspevku alebo stránky vo WordPress s nainštalovaným bezplatným SSS pluginom (WebSupport Webhosting).
              </>
            )}
            {activeEmbedTab === 'url' && (
              <>
                Priamy odkaz na samostatné zobrazenie mapy v režime <strong>embed</strong> bez rušivých prvkov na celej obrazovke.
              </>
            )}
          </p>

          {/* Configuration Grid */}
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
              <label><Sparkles size={14} /> Vizuálna téma</label>
              <select value={theme} onChange={(e) => setTheme(e.target.value as ThemeId)}>
                <option value="slate-clean">✨ Slate Clean Light</option>
                <option value="speleo-emerald">🌿 Speleo Emerald</option>
                <option value="dark-glow">🦇 Dark Cave Glow</option>
                <option value="terrain-topo">🗺️ Outdoor Topo Atlas</option>
                <option value="editorial-atlas">📜 Vintage NatGeo Atlas</option>
              </select>
            </div>
          </div>

          {/* Dimensions & Viewport Zoom Row */}
          <div className="wp-dimensions-grid">
            <div className="dim-input-group">
              <label><Maximize2 size={14} /> Šírka mapy (Width)</label>
              <input
                type="text"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="100% alebo 800px"
              />
            </div>

            <div className="dim-input-group">
              <label><Maximize2 size={14} /> Výška mapy (Height)</label>
              <input
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="560px"
              />
            </div>

            <div className="dim-input-group dim-zoom-group">
              <label><ZoomIn size={14} /> Priblíženie / Zoom výrezu</label>
              <div className="zoom-select-wrapper">
                <select
                  value={['', '7.5', '9', '11', '13', '15'].includes(zoom) ? zoom : 'custom'}
                  onChange={(e) => {
                    if (e.target.value === 'custom') setZoom('10.5');
                    else setZoom(e.target.value);
                  }}
                >
                  <option value="">Auto (podľa výberu)</option>
                  <option value="7.5">7.5 — Celé Slovensko</option>
                  <option value="9">9.0 — Kraj / Región</option>
                  <option value="11">11.0 — Krasová oblasť</option>
                  <option value="13">13.0 — Klub / Masív</option>
                  <option value="15">15.0 — Detail lokality</option>
                  <option value="custom">Vlastný zoom...</option>
                </select>
                {(!['', '7.5', '9', '11', '13', '15'].includes(zoom) || zoom === 'custom') && (
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="18"
                    value={zoom}
                    onChange={(e) => setZoom(e.target.value)}
                    placeholder="10.5"
                    className="custom-zoom-input"
                  />
                )}
              </div>
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
          </div>

          {/* Active Code Output Box */}
          {activeEmbedTab === 'iframe' && (
            <div className="shortcode-output-box">
              <div className="shortcode-box-header">
                <span className="shortcode-tag font-ui">
                  <Code size={15} /> Vygenerovaný HTML iFrame kód:
                </span>
                <div className="output-actions-row">
                  <a
                    href={embedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="preview-embed-link font-ui"
                  >
                    <span>Otvoriť náhľad</span>
                    <ExternalLink size={12} />
                  </a>
                  <button className="copy-btn" onClick={() => copyToClipboard(iframeCode, 'iframe')}>
                    {copiedType === 'iframe' ? <Check size={15} className="copied-icon" /> : <Copy size={15} />}
                    <span>{copiedType === 'iframe' ? 'Kopírované do schránky!' : 'Kopírovať iFrame kód'}</span>
                  </button>
                </div>
              </div>
              <pre className="code-text-pre font-mono"><code>{iframeCode}</code></pre>
            </div>
          )}

          {activeEmbedTab === 'shortcode' && (
            <div className="shortcode-output-box">
              <div className="shortcode-box-header">
                <span className="shortcode-tag font-ui">
                  <Globe size={15} /> Vygenerovaný WordPress Shortcode:
                </span>
                <button className="copy-btn" onClick={() => copyToClipboard(shortcode, 'shortcode')}>
                  {copiedType === 'shortcode' ? <Check size={15} className="copied-icon" /> : <Copy size={15} />}
                  <span>{copiedType === 'shortcode' ? 'Kopírované!' : 'Kopírovať shortcode'}</span>
                </button>
              </div>
              <code className="shortcode-text font-mono">{shortcode}</code>
            </div>
          )}

          {activeEmbedTab === 'url' && (
            <div className="shortcode-output-box">
              <div className="shortcode-box-header">
                <span className="shortcode-tag font-ui">
                  <Link2 size={15} /> Priamy odkaz na vloženie (URL):
                </span>
                <div className="output-actions-row">
                  <a
                    href={embedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="preview-embed-link font-ui"
                  >
                    <span>Otvoriť v okne</span>
                    <ExternalLink size={12} />
                  </a>
                  <button className="copy-btn" onClick={() => copyToClipboard(embedUrl, 'url')}>
                    {copiedType === 'url' ? <Check size={15} className="copied-icon" /> : <Copy size={15} />}
                    <span>{copiedType === 'url' ? 'Kopírované!' : 'Kopírovať URL'}</span>
                  </button>
                </div>
              </div>
              <code className="shortcode-text font-mono">{embedUrl}</code>
            </div>
          )}

          {/* Plugin Download Box for WordPress */}
          <div className="plugin-download-banner">
            <div className="banner-left">
              <strong>WordPress Plugin Pre WebSupport Hosting & CMS</strong>
              <p>Ak používate WordPress, stiahnite si bezplatný plugin SSS Speleo Map (Plugins → Pridať nový → Nahrať .zip). Pre všetky ostatné systémy použite záložku <strong>HTML iFrame</strong> vyššie.</p>
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
          background: rgba(0, 0, 0, 0.82);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .wp-modal {
          width: 820px;
          max-width: 95%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 2rem;
          background: #FFFFFF;
          color: #0F172A;
          border-radius: var(--radius-lg);
          border: 1px solid #E2E8F0;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.18), 0 4px 16px rgba(0, 0, 0, 0.08);
        }

        /* Dark Theme Support for modal */
        .theme-dark-glow .wp-modal,
        .theme-speleo-emerald .wp-modal {
          background: #161C19;
          color: #F8FAFC;
          border: 1.5px solid rgba(224, 145, 47, 0.4);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #E2E8F0;
          padding-bottom: 1.25rem;
          margin-bottom: 1.25rem;
        }

        .theme-dark-glow .modal-header,
        .theme-speleo-emerald .modal-header {
          border-bottom-color: rgba(255, 255, 255, 0.1);
        }

        .header-title-box {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .wp-badge-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #FEF3C7;
          border: 1.5px solid #FCD34D;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(217, 119, 6, 0.12);
        }

        .theme-dark-glow .wp-badge-icon,
        .theme-speleo-emerald .wp-badge-icon {
          background: rgba(224, 145, 47, 0.18);
          border-color: rgba(224, 145, 47, 0.45);
        }

        .wp-icon-gold {
          color: #D97706;
        }

        .wp-badge {
          font-size: 0.72rem;
          color: #D97706;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 800;
          display: block;
          margin-bottom: 0.15rem;
        }

        .modal-title {
          font-size: 1.35rem;
          color: #0F172A;
          margin: 0;
          line-height: 1.25;
        }

        .theme-dark-glow .modal-title,
        .theme-speleo-emerald .modal-title {
          color: #FFFFFF;
        }

        .close-btn {
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
          color: #64748B;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: #E2E8F0;
          color: #0F172A;
        }

        .theme-dark-glow .close-btn,
        .theme-speleo-emerald .close-btn {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.1);
          color: #CBD5E1;
        }

        .theme-dark-glow .close-btn:hover,
        .theme-speleo-emerald .close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
        }

        /* Embed Tabs Switcher */
        .embed-tabs-bar {
          display: flex;
          gap: 0.5rem;
          background: #F1F5F9;
          padding: 0.4rem;
          border-radius: var(--radius-md);
          border: 1px solid #E2E8F0;
          margin-bottom: 1.1rem;
        }

        .theme-dark-glow .embed-tabs-bar,
        .theme-speleo-emerald .embed-tabs-bar {
          background: #0D1210;
          border-color: rgba(213, 206, 194, 0.2);
        }

        .embed-tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.75rem 0.85rem;
          background: transparent;
          border: 1px solid transparent;
          border-radius: var(--radius-sm);
          color: #475569;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .embed-tab-btn:hover {
          color: #0F172A;
          background: #E2E8F0;
        }

        .embed-tab-btn.active {
          background: #FFFFFF;
          border: 1.5px solid #D97706;
          color: #0F172A;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .theme-dark-glow .embed-tab-btn,
        .theme-speleo-emerald .embed-tab-btn {
          color: #CBD5E1;
        }

        .theme-dark-glow .embed-tab-btn:hover,
        .theme-speleo-emerald .embed-tab-btn:hover {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.08);
        }

        .theme-dark-glow .embed-tab-btn.active,
        .theme-speleo-emerald .embed-tab-btn.active {
          background: linear-gradient(135deg, rgba(224, 145, 47, 0.35), rgba(13, 148, 136, 0.35));
          border-color: var(--color-lantern-amber);
          color: #FFFFFF;
        }

        .tab-pill {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          background: #FEF3C7;
          color: #D97706;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }

        .embed-tab-btn.active .tab-pill {
          background: #D97706;
          color: #FFFFFF;
        }

        .wp-intro {
          font-size: 0.88rem;
          color: #475569;
          margin: 0 0 1.25rem 0;
          line-height: 1.5;
        }

        .theme-dark-glow .wp-intro,
        .theme-speleo-emerald .wp-intro {
          color: #E2E8F0;
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
          font-weight: 700;
          color: #1E293B;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .theme-dark-glow .config-group label,
        .theme-speleo-emerald .config-group label {
          color: #F1F5F9;
        }

        .config-group select {
          background: #F8FAFC;
          border: 1.5px solid #CBD5E1;
          border-radius: var(--radius-md);
          padding: 0.65rem 0.85rem;
          color: #0F172A;
          font-size: 0.88rem;
          font-weight: 500;
          outline: none;
          transition: all 0.2s;
        }

        .config-group select:focus {
          border-color: #D97706;
          box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.15);
        }

        .theme-dark-glow .config-group select,
        .theme-speleo-emerald .config-group select {
          background: #0D1210;
          border-color: rgba(213, 206, 194, 0.25);
          color: #FFFFFF;
        }

        .wp-dimensions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1.6fr;
          gap: 0.85rem;
          background: #F8FAFC;
          padding: 0.85rem 1.1rem;
          border-radius: var(--radius-md);
          margin-bottom: 0.85rem;
          border: 1px solid #E2E8F0;
        }

        .theme-dark-glow .wp-dimensions-grid,
        .theme-speleo-emerald .wp-dimensions-grid {
          background: #0D1210;
          border-color: rgba(213, 206, 194, 0.2);
        }

        .dim-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .dim-input-group label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #1E293B;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .theme-dark-glow .dim-input-group label,
        .theme-speleo-emerald .dim-input-group label {
          color: #F1F5F9;
        }

        .dim-input-group input,
        .dim-input-group select {
          background: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          color: #0F172A;
          padding: 0.55rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          outline: none;
          font-weight: 600;
          transition: all 0.2s;
        }

        .dim-input-group input:focus,
        .dim-input-group select:focus {
          border-color: #D97706;
          box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.15);
        }

        .theme-dark-glow .dim-input-group input,
        .theme-dark-glow .dim-input-group select,
        .theme-speleo-emerald .dim-input-group input,
        .theme-speleo-emerald .dim-input-group select {
          background: #060908;
          border-color: rgba(213, 206, 194, 0.3);
          color: #FFFFFF;
        }

        .zoom-select-wrapper {
          display: flex;
          gap: 0.4rem;
          align-items: center;
        }

        .zoom-select-wrapper select {
          flex: 1;
        }

        .custom-zoom-input {
          width: 75px !important;
          text-align: center;
        }

        .wp-toggles-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1.5rem;
          background: #F8FAFC;
          padding: 0.75rem 1.1rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.25rem;
          border: 1px solid #E2E8F0;
        }

        .theme-dark-glow .wp-toggles-row,
        .theme-speleo-emerald .wp-toggles-row {
          background: #0D1210;
          border-color: rgba(213, 206, 194, 0.2);
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #1E293B;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
        }

        .theme-dark-glow .checkbox-label,
        .theme-speleo-emerald .checkbox-label {
          color: #FFFFFF;
        }

        .shortcode-output-box {
          background: #0F172A;
          border: 1.5px solid #334155;
          border-radius: var(--radius-md);
          padding: 1rem;
          margin-bottom: 1.25rem;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .shortcode-box-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.6rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .output-actions-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .preview-embed-link {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.78rem;
          color: #CBD5E1;
          text-decoration: none;
          padding: 0.35rem 0.6rem;
          border-radius: 6px;
          border: 1px solid #475569;
          background: rgba(255, 255, 255, 0.05);
          transition: all 0.2s;
        }

        .preview-embed-link:hover {
          color: #FBBF24;
          border-color: #FBBF24;
          background: rgba(251, 191, 36, 0.1);
        }

        .shortcode-tag {
          font-size: 0.82rem;
          color: #FBBF24;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 700;
        }

        .copy-btn {
          background: linear-gradient(135deg, #F59E0B, #D97706);
          border: none;
          color: #0F172A;
          font-weight: 800;
          padding: 0.45rem 0.95rem;
          border-radius: 6px;
          font-size: 0.82rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: all 0.2s;
          box-shadow: 0 2px 10px rgba(217, 119, 6, 0.35);
        }

        .copy-btn:hover {
          background: #FBBF24;
          transform: translateY(-1px);
        }

        .code-text-pre {
          margin: 0;
          background: #020617;
          padding: 0.85rem 1rem;
          border-radius: 6px;
          border: 1px solid #1E293B;
          overflow-x: auto;
        }

        .code-text-pre code {
          color: #4ADE80;
          font-size: 0.86rem;
          line-height: 1.45;
          word-break: break-all;
          white-space: pre-wrap;
        }

        .shortcode-text {
          display: block;
          color: #4ADE80;
          font-size: 0.92rem;
          word-break: break-all;
          user-select: all;
          background: #020617;
          padding: 0.85rem 1rem;
          border-radius: 6px;
          border: 1px solid #1E293B;
        }

        .plugin-download-banner {
          background: #F0FDFA;
          border: 1.5px solid #99F6E4;
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .theme-dark-glow .plugin-download-banner,
        .theme-speleo-emerald .plugin-download-banner {
          background: rgba(13, 148, 136, 0.14);
          border-color: rgba(13, 148, 136, 0.4);
        }

        .banner-left strong {
          color: #0F766E;
          display: block;
          font-size: 0.88rem;
          margin-bottom: 0.25rem;
        }

        .theme-dark-glow .banner-left strong,
        .theme-speleo-emerald .banner-left strong {
          color: #A7F3D0;
        }

        .banner-left p {
          color: #334155;
          font-size: 0.78rem;
          margin: 0;
          line-height: 1.4;
        }

        .theme-dark-glow .banner-left p,
        .theme-speleo-emerald .banner-left p {
          color: var(--color-fog);
        }

        .download-plugin-btn {
          background: #0D9488;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 0.55rem 0.95rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          white-space: nowrap;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(13, 148, 136, 0.25);
        }

        .download-plugin-btn:hover {
          background: #0F766E;
          transform: translateY(-1px);
        }

        @media (max-width: 640px) {
          .wp-config-grid {
            grid-template-columns: 1fr;
          }
          .embed-tabs-bar {
            flex-direction: column;
          }
          .plugin-download-banner {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};
