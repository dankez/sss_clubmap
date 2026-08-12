import React from 'react';
import { AreaData, GroupData } from '../types';
import { X, Layers, Users, ChevronRight } from 'lucide-react';

interface AreaCardProps {
  area: AreaData;
  groups: GroupData[];
  onClose: () => void;
  onSelectGroup: (group: GroupData) => void;
}

export const AreaCard: React.FC<AreaCardProps> = ({
  area,
  groups,
  onClose,
  onSelectGroup,
}) => {
  return (
    <div className="area-card-overlay glass-panel">
      <button className="close-btn" onClick={onClose} aria-label="Zatvoriť">
        <X size={18} />
      </button>

      <div className="area-header">
        <span className="area-badge">
          <Layers size={14} /> Krasová oblasť
        </span>
        <h2 className="area-title font-display">{area.name}</h2>
        {area.aggregated_cave_count && (
          <div className="cave-count-tag">
            <span className="cave-num">{area.aggregated_cave_count.value}+</span>
            <span className="cave-text">známych jaskýň</span>
          </div>
        )}
      </div>

      <p className="area-desc">{area.description || 'Významná speleologická oblasť Slovenska.'}</p>

      <div className="area-section">
        <h4 className="section-title">
          <Users size={15} /> Pôsobiace skupiny ({groups.length})
        </h4>
        <div className="groups-list">
          {groups.length > 0 ? (
            groups.slice(0, 6).map((group) => (
              <div
                key={group.id}
                className="group-item-chip"
                onClick={() => onSelectGroup(group)}
              >
                <div className="group-avatar">
                  {group.name.substring(0, 2).toUpperCase()}
                </div>
                <span className="group-item-name">{group.name}</span>
                <ChevronRight size={14} className="arrow-icon" />
              </div>
            ))
          ) : (
            <p className="empty-groups-text">Údaj nie je momentálne k dispozícii.</p>
          )}
        </div>
      </div>

      <style>{`
        .area-card-overlay {
          position: absolute;
          bottom: 28px;
          left: 28px;
          width: 380px;
          max-width: calc(100vw - 56px);
          max-height: calc(100vh - 120px);
          overflow-y: auto;
          padding: 1.5rem;
          z-index: 12;
          color: var(--color-limestone);
          animation: slideUp 0.3s ease-out forwards;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: var(--color-fog);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          color: var(--color-limestone);
        }

        .area-header {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }

        .area-badge {
          font-size: 0.75rem;
          color: var(--color-lantern-amber);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 600;
        }

        .area-title {
          font-size: 1.75rem;
          color: var(--color-limestone);
          line-height: 1.2;
        }

        .cave-count-tag {
          display: inline-flex;
          align-items: baseline;
          gap: 0.4rem;
          background: rgba(224, 145, 47, 0.15);
          border: 1px solid rgba(224, 145, 47, 0.3);
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-sm);
          width: fit-content;
          margin-top: 0.2rem;
        }

        .cave-num {
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--color-lantern-amber);
        }

        .cave-text {
          font-size: 0.8rem;
          color: var(--color-fog);
        }

        .area-desc {
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--color-fog);
          margin-bottom: 1.25rem;
        }

        .section-title {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-fog);
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .groups-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .group-item-chip {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(218, 211, 196, 0.1);
          border-radius: var(--radius-md);
          padding: 0.6rem 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .group-item-chip:hover {
          background: rgba(224, 145, 47, 0.12);
          border-color: rgba(224, 145, 47, 0.4);
        }

        .group-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--color-cave-water);
          color: var(--color-limestone);
          font-size: 0.7rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .group-item-name {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-limestone);
          flex: 1;
        }

        .arrow-icon {
          color: var(--color-rock-grey);
        }

        .group-item-chip:hover .arrow-icon {
          color: var(--color-lantern-amber);
        }

        .empty-groups-text {
          font-size: 0.85rem;
          color: var(--color-fog);
          font-style: italic;
        }

        @media (max-width: 640px) {
          .area-card-overlay {
            left: 16px;
            right: 16px;
            bottom: 16px;
            width: auto;
          }
        }
      `}</style>
    </div>
  );
};
