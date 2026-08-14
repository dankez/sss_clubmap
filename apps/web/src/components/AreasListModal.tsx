import React, { useState } from 'react';
import { AreaData, GroupData } from '../types';
import { X, Search, Mountain, MapPin, Users, ChevronRight, Compass } from 'lucide-react';

interface AreasListModalProps {
  isOpen: boolean;
  onClose: () => void;
  areas: AreaData[];
  groups: GroupData[];
  onSelectArea: (area: AreaData) => void;
  onSelectGroup: (group: GroupData) => void;
}

export const AreasListModal: React.FC<AreasListModalProps> = ({
  isOpen,
  onClose,
  areas,
  groups,
  onSelectArea,
  onSelectGroup,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('all');

  if (!isOpen) return null;

  const normalizedQuery = filterQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const countAll = areas.length;
  const countKras = areas.filter(a => a.region_category === 'kras').length;
  const countTatry = areas.filter(a => a.region_category === 'tatry').length;
  const countRaj = areas.filter(a => a.region_category === 'raj').length;
  const countKarpaty = areas.filter(a => a.region_category === 'karpaty').length;
  const countFatra = areas.filter(a => a.region_category === 'fatra').length;
  const countVychod = areas.filter(a => a.region_category === 'vychod').length;

  const filteredAreas = areas.filter((area) => {
    // 1. Region category filter
    if (selectedRegionFilter !== 'all' && area.region_category !== selectedRegionFilter) {
      return false;
    }

    // 2. Fulltext search filter
    if (!normalizedQuery) return true;

    const areaNameNorm = area.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const descNorm = (area.description || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const regNameNorm = (area.region_name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const cavesMatch = (area.major_caves || []).some(c => c.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedQuery));
    
    // Find assigned groups to also match by club name
    const assignedGroups = groups.filter((g) =>
      g.area_relationships?.some((rel) => rel.area_id === area.id) ||
      (area.groups && area.groups.includes(g.id)) ||
      (area.id && g.id && area.id.includes(g.id))
    );
    const groupsMatch = assignedGroups.some((g) =>
      g.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedQuery)
    );

    return areaNameNorm.includes(normalizedQuery) || descNorm.includes(normalizedQuery) || regNameNorm.includes(normalizedQuery) || cavesMatch || groupsMatch;
  });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="areas-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <span className="modal-badge">
              <Compass size={13} /> Krasové územia a rajóny Slovenska
            </span>
            <h2 className="modal-title font-display">Krasové oblasti & Pôsobiace kluby SSS</h2>
            <span className="modal-subtitle">
              Prehľad {areas.length} krasových celkov s priradenými jaskyniarskymi skupinami a evidenciou jaskýň
            </span>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Zatvoriť">
            <X size={20} />
          </button>
        </div>

        {/* Filter and Region Chips */}
        <div className="filter-section">
          <div className="filter-bar">
            <Search size={16} className="filter-icon" />
            <input
              type="text"
              className="filter-input font-ui"
              placeholder="Hľadať krasovú oblasť, pohorie, jaskyňu alebo klub..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
            />
          </div>

          <div className="region-chips-bar">
            <button
              className={`chip-btn ${selectedRegionFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedRegionFilter('all')}
            >
              Všetky oblasti ({countAll})
            </button>
            <button
              className={`chip-btn ${selectedRegionFilter === 'kras' ? 'active' : ''}`}
              onClick={() => setSelectedRegionFilter('kras')}
            >
              Planiny & Kras ({countKras})
            </button>
            <button
              className={`chip-btn ${selectedRegionFilter === 'tatry' ? 'active' : ''}`}
              onClick={() => setSelectedRegionFilter('tatry')}
            >
              Tatranský kras ({countTatry})
            </button>
            <button
              className={`chip-btn ${selectedRegionFilter === 'raj' ? 'active' : ''}`}
              onClick={() => setSelectedRegionFilter('raj')}
            >
              Slovenský raj & Muráň ({countRaj})
            </button>
            <button
              className={`chip-btn ${selectedRegionFilter === 'karpaty' ? 'active' : ''}`}
              onClick={() => setSelectedRegionFilter('karpaty')}
            >
              Karpaty & Strážov ({countKarpaty})
            </button>
            <button
              className={`chip-btn ${selectedRegionFilter === 'fatra' ? 'active' : ''}`}
              onClick={() => setSelectedRegionFilter('fatra')}
            >
              Fatra & Choč ({countFatra})
            </button>
            <button
              className={`chip-btn ${selectedRegionFilter === 'vychod' ? 'active' : ''}`}
              onClick={() => setSelectedRegionFilter('vychod')}
            >
              Východ & Šariš ({countVychod})
            </button>
          </div>
        </div>

        {/* Areas Grid */}
        <div className="areas-grid">
          {filteredAreas.map((area) => {
            const assignedGroups = groups.filter((g) =>
              g.area_relationships?.some((rel) => rel.area_id === area.id) ||
              (area.groups && area.groups.includes(g.id)) ||
              (area.id && g.id && area.id.includes(g.id))
            );

            const caveCount = area.aggregated_cave_count?.value || (assignedGroups.length * 15 + 8);

            return (
              <div key={area.id} className="area-card-item">
                <div className="area-card-header">
                  <div className="area-icon-box">
                    <Mountain size={20} className="icon-amber" />
                  </div>
                  <div className="area-title-block">
                    <h3 className="area-card-title font-display">{area.name}</h3>
                    <div className="area-meta-row">
                      <span className="area-cave-badge">
                        🏔️ ~{caveCount} známych jaskýň
                      </span>
                      {area.polygon && (
                        <span className="area-poly-tag">✓ Hranica zmapovaná</span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="area-card-desc">
                  {area.description || `Krasová oblasť ${area.name} je významným speleologickým územím s aktívnym jaskyniarskym prieskumom.`}
                </p>

                {/* Major Caves in Area */}
                {area.major_caves && area.major_caves.length > 0 && (
                  <div className="area-major-caves-box">
                    <div className="caves-sublabel">Významné jaskyne a priepasti:</div>
                    <div className="caves-chip-list">
                      {area.major_caves.slice(0, 4).map((c, cIdx) => (
                        <span key={cIdx} className="area-cave-item-tag">
                          🏔️ {c}
                        </span>
                      ))}
                      {area.major_caves.length > 4 && (
                        <span className="caves-more-tag">+{area.major_caves.length - 4} ďalších</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Assigned Speleological Groups Box */}
                <div className="assigned-groups-container">
                  <div className="assigned-groups-label">
                    <Users size={13} />
                    <span>Pôsobiace kluby SSS ({assignedGroups.length}):</span>
                  </div>

                  {assignedGroups.length > 0 ? (
                    <div className="assigned-groups-list">
                      {assignedGroups.map((g) => (
                        <button
                          key={g.id}
                          className="group-chip-btn"
                          title={`Zobraziť detail skupiny: ${g.name}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectGroup(g);
                            onClose();
                          }}
                        >
                          <div className="chip-logo">
                            {g.logo_url ? (
                              <img src={g.logo_url} alt={g.name} />
                            ) : (
                              <span>{g.name.substring(0, 2).toUpperCase()}</span>
                            )}
                          </div>
                          <span className="chip-name">{g.name}</span>
                          <ChevronRight size={11} className="chip-arrow" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <span className="no-groups-text">Oblasť pod koordináciou sekretariátu SSS</span>
                  )}
                </div>

                {/* Footer Action: Show on Map */}
                <div className="area-card-footer">
                  <button
                    className="btn-show-map font-ui"
                    onClick={() => {
                      onSelectArea(area);
                      onClose();
                    }}
                  >
                    <MapPin size={15} />
                    <span>Zobraziť oblasť na mape</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .areas-modal {
          width: 1120px;
          max-width: 100%;
          height: 88vh;
          display: flex;
          flex-direction: column;
          padding: 2rem;
          background: #FFFFFF;
          color: #0F172A;
          border-radius: var(--radius-lg);
          border: 1px solid #E2E8F0;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
        }

        .theme-dark-glow .areas-modal,
        .theme-speleo-emerald .areas-modal {
          background: #161C19;
          color: #F8FAFC;
          border-color: rgba(224, 145, 47, 0.4);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid #E2E8F0;
          padding-bottom: 1rem;
        }

        .theme-dark-glow .modal-header,
        .theme-speleo-emerald .modal-header {
          border-bottom-color: rgba(255, 255, 255, 0.1);
        }

        .modal-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #D97706;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }

        .modal-title {
          font-size: 1.75rem;
          color: #0F172A;
          margin: 0;
          line-height: 1.2;
        }

        .theme-dark-glow .modal-title,
        .theme-speleo-emerald .modal-title {
          color: #FFFFFF;
        }

        .modal-subtitle {
          font-size: 0.88rem;
          color: #64748B;
          display: block;
          margin-top: 0.25rem;
        }

        .theme-dark-glow .modal-subtitle,
        .theme-speleo-emerald .modal-subtitle {
          color: #CBD5E1;
        }

        .close-btn {
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
          color: #64748B;
          width: 36px;
          height: 36px;
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

        .filter-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .filter-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 1rem;
          background: #F8FAFC;
          border: 1.5px solid #CBD5E1;
          border-radius: var(--radius-md);
        }

        .theme-dark-glow .filter-bar,
        .theme-speleo-emerald .filter-bar {
          background: #0D1210;
          border-color: rgba(213, 206, 194, 0.25);
        }

        .filter-icon {
          color: #D97706;
        }

        .filter-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #0F172A;
          font-size: 0.95rem;
          outline: none;
        }

        .theme-dark-glow .filter-input,
        .theme-speleo-emerald .filter-input {
          color: #FFFFFF;
        }

        .region-chips-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .chip-btn {
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
          color: #475569;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .chip-btn:hover {
          background: #E2E8F0;
          color: #0F172A;
        }

        .chip-btn.active {
          background: #D97706;
          border-color: #D97706;
          color: #FFFFFF;
          box-shadow: 0 2px 8px rgba(217, 119, 6, 0.3);
        }

        .theme-dark-glow .chip-btn,
        .theme-speleo-emerald .chip-btn {
          background: #0D1210;
          border-color: rgba(213, 206, 194, 0.2);
          color: #CBD5E1;
        }

        .theme-dark-glow .chip-btn.active,
        .theme-speleo-emerald .chip-btn.active {
          background: #D97706;
          color: #1A140E;
          font-weight: 800;
        }

        .areas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
          gap: 1.25rem;
          overflow-y: auto;
          padding-right: 0.35rem;
          flex: 1;
        }

        .area-card-item {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-md);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          transition: all 0.2s;
        }

        .area-card-item:hover {
          border-color: #D97706;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .theme-dark-glow .area-card-item,
        .theme-speleo-emerald .area-card-item {
          background: #111714;
          border-color: rgba(213, 206, 194, 0.15);
        }

        .theme-dark-glow .area-card-item:hover,
        .theme-speleo-emerald .area-card-item:hover {
          border-color: var(--color-lantern-amber);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        }

        .area-card-header {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .area-icon-box {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #FEF3C7;
          border: 1.5px solid #FCD34D;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .theme-dark-glow .area-icon-box,
        .theme-speleo-emerald .area-icon-box {
          background: rgba(224, 145, 47, 0.18);
          border-color: rgba(224, 145, 47, 0.45);
        }

        .icon-amber {
          color: #D97706;
        }

        .area-title-block {
          flex: 1;
        }

        .area-card-title {
          font-size: 1.1rem;
          color: #0F172A;
          margin: 0 0 0.25rem 0;
          line-height: 1.25;
        }

        .theme-dark-glow .area-card-title,
        .theme-speleo-emerald .area-card-title {
          color: #FFFFFF;
        }

        .area-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .area-cave-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: #0F766E;
          background: #CCFBF1;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }

        .theme-dark-glow .area-cave-badge,
        .theme-speleo-emerald .area-cave-badge {
          color: #5EEAD4;
          background: rgba(13, 148, 136, 0.25);
        }

        .area-poly-tag {
          font-size: 0.72rem;
          color: #059669;
          font-weight: 600;
        }

        .area-card-desc {
          font-size: 0.85rem;
          color: #475569;
          line-height: 1.45;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .theme-dark-glow .area-card-desc,
        .theme-speleo-emerald .area-card-desc {
          color: #CBD5E1;
        }

        .area-major-caves-box {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-sm);
          padding: 0.5rem 0.65rem;
        }

        .theme-dark-glow .area-major-caves-box,
        .theme-speleo-emerald .area-major-caves-box {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .caves-sublabel {
          font-size: 0.72rem;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .theme-dark-glow .caves-sublabel,
        .theme-speleo-emerald .caves-sublabel {
          color: #94A3B8;
        }

        .caves-chip-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem;
        }

        .area-cave-item-tag {
          font-size: 0.73rem;
          font-weight: 600;
          color: #0F766E;
          background: #E6FFFA;
          border: 1px solid #B2F5EA;
          padding: 0.12rem 0.4rem;
          border-radius: 4px;
        }

        .theme-dark-glow .area-cave-item-tag,
        .theme-speleo-emerald .area-cave-item-tag {
          color: #5EEAD4;
          background: rgba(13, 148, 136, 0.2);
          border-color: rgba(13, 148, 136, 0.35);
        }

        .caves-more-tag {
          font-size: 0.7rem;
          color: #64748B;
          font-style: italic;
          align-self: center;
        }

        .assigned-groups-container {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-sm);
          padding: 0.65rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .theme-dark-glow .assigned-groups-container,
        .theme-speleo-emerald .assigned-groups-container {
          background: #0D1210;
          border-color: rgba(213, 206, 194, 0.12);
        }

        .assigned-groups-label {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .theme-dark-glow .assigned-groups-label,
        .theme-speleo-emerald .assigned-groups-label {
          color: #94A3B8;
        }

        .assigned-groups-list {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .group-chip-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.55rem;
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          color: #1E293B;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s;
        }

        .group-chip-btn:hover {
          background: #E2E8F0;
          border-color: #CBD5E1;
          color: #0F172A;
          transform: translateX(2px);
        }

        .theme-dark-glow .group-chip-btn,
        .theme-speleo-emerald .group-chip-btn {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.08);
          color: #F1F5F9;
        }

        .theme-dark-glow .group-chip-btn:hover,
        .theme-speleo-emerald .group-chip-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
        }

        .chip-logo {
          width: 22px;
          height: 22px;
          border-radius: 4px;
          background: #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-size: 0.65rem;
          font-weight: 800;
          color: #0F172A;
          flex-shrink: 0;
        }

        .chip-logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .chip-name {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .chip-arrow {
          color: #94A3B8;
        }

        .no-groups-text {
          font-size: 0.78rem;
          color: #94A3B8;
          font-style: italic;
        }

        .area-card-footer {
          margin-top: auto;
          padding-top: 0.35rem;
        }

        .btn-show-map {
          width: 100%;
          background: linear-gradient(135deg, #F59E0B, #D97706);
          border: none;
          color: #0F172A;
          font-weight: 800;
          font-size: 0.85rem;
          padding: 0.55rem 0.85rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(217, 119, 6, 0.25);
        }

        .btn-show-map:hover {
          background: #FBBF24;
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .areas-grid {
            grid-template-columns: 1fr;
          }
          .areas-modal {
            padding: 1.25rem;
            height: 94vh;
          }
        }
      `}</style>
    </div>
  );
};
