import React, { useState, useEffect, useRef } from 'react';
import { AreaData, GroupData } from '../types';
import { Search, X, Layers, Users, ChevronRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  areas: AreaData[];
  groups: GroupData[];
  onSelectArea: (area: AreaData) => void;
  onSelectGroup: (group: GroupData) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  areas,
  groups,
  onSelectArea,
  onSelectGroup,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const filteredAreas = areas.filter((a) =>
    a.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedQuery)
  );

  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedQuery)
  );

  return (
    <div className="search-backdrop" onClick={onClose}>
      <div className="search-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-wrapper">
          <Search size={20} className="search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="search-input font-ui"
            placeholder="Hľadať oblasť (napr. Kras, Tatry) alebo skupinu..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="clear-btn" onClick={() => setQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>

        <div className="results-container">
          {/* Areas Section */}
          {filteredAreas.length > 0 && (
            <div className="result-section">
              <div className="section-header">
                <Layers size={14} /> Krasové oblasti ({filteredAreas.length})
              </div>
              <div className="result-grid">
                {filteredAreas.map((area) => (
                  <div
                    key={area.id}
                    className="result-item"
                    onClick={() => {
                      onSelectArea(area);
                      onClose();
                    }}
                  >
                    <div className="result-icon area-icon">
                      <Layers size={16} />
                    </div>
                    <div className="result-info">
                      <span className="result-title">{area.name}</span>
                      <span className="result-sub">
                        {area.aggregated_cave_count?.value || 0}+ jaskýň
                      </span>
                    </div>
                    <ChevronRight size={16} className="item-arrow" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Groups Section */}
          {filteredGroups.length > 0 && (
            <div className="result-section">
              <div className="section-header">
                <Users size={14} /> Speleologické skupiny ({filteredGroups.length})
              </div>
              <div className="result-grid">
                {filteredGroups.slice(0, 12).map((group) => (
                  <div
                    key={group.id}
                    className="result-item"
                    onClick={() => {
                      onSelectGroup(group);
                      onClose();
                    }}
                  >
                    <div className="result-icon group-icon font-display">
                      {group.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="result-info">
                      <span className="result-title">{group.name}</span>
                      <span className="result-sub">
                        {group.public_contact?.email || 'Verejný profil SSS'}
                      </span>
                    </div>
                    <ChevronRight size={16} className="item-arrow" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredAreas.length === 0 && filteredGroups.length === 0 && (
            <div className="no-results">
              <p>Nenašli sa žiadne výsledky pre "{query}"</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .search-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          z-index: 100;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 100px;
        }

        .search-modal {
          width: 640px;
          max-width: calc(100vw - 32px);
          max-height: 70vh;
          display: flex;
          flex-direction: column;
          padding: 1.25rem;
          background: rgba(33, 30, 27, 0.95);
        }

        .search-input-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--color-lantern-amber);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          margin-bottom: 1rem;
        }

        .search-icon {
          color: var(--color-lantern-amber);
        }

        .search-input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--color-limestone);
          font-size: 1rem;
          width: 100%;
        }

        .clear-btn {
          background: transparent;
          border: none;
          color: var(--color-fog);
          cursor: pointer;
        }

        .results-container {
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .section-header {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-lantern-amber);
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .result-grid {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .result-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.85rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(218, 211, 196, 0.08);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .result-item:hover {
          background: rgba(224, 145, 47, 0.12);
          border-color: rgba(224, 145, 47, 0.4);
        }

        .result-icon {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .area-icon {
          background: rgba(224, 145, 47, 0.2);
          color: var(--color-lantern-amber);
        }

        .group-icon {
          background: var(--color-cave-water);
          color: var(--color-limestone);
          font-weight: 700;
          font-size: 0.85rem;
        }

        .result-info {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .result-title {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--color-limestone);
        }

        .result-sub {
          font-size: 0.75rem;
          color: var(--color-fog);
        }

        .item-arrow {
          color: var(--color-rock-grey);
        }

        .result-item:hover .item-arrow {
          color: var(--color-lantern-amber);
        }

        .no-results {
          padding: 2rem 0;
          text-align: center;
          color: var(--color-fog);
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};
