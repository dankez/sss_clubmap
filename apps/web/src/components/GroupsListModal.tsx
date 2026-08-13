import React, { useState } from 'react';
import { GroupData } from '../types';
import { X, Search, ChevronRight, Mail, Phone, Globe } from 'lucide-react';

interface GroupsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  groups: GroupData[];
  onSelectGroup: (group: GroupData) => void;
}

export const GroupsListModal: React.FC<GroupsListModalProps> = ({
  isOpen,
  onClose,
  groups,
  onSelectGroup,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  if (!isOpen) return null;

  const normalizedQuery = filterQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedQuery)
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="groups-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-badge">Adresár SSS</span>
            <h2 className="modal-title font-display">Speleologické skupiny na Slovensku</h2>
            <span className="modal-subtitle">Celkovo {groups.length} registrovaných klubov</span>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Zatvoriť">
            <X size={20} />
          </button>
        </div>

        <div className="filter-bar">
          <Search size={16} className="filter-icon" />
          <input
            type="text"
            className="filter-input font-ui"
            placeholder="Filtrovať podľa názvu..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
          />
        </div>

        <div className="groups-grid">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="group-card-item"
              onClick={() => {
                onSelectGroup(group);
                onClose();
              }}
            >
              <div className="group-card-top">
                <div className="group-avatar font-display">
                  {group.logo_url ? (
                    <img src={group.logo_url} alt={group.name} className="group-avatar-img" />
                  ) : (
                    group.name.substring(0, 2).toUpperCase()
                  )}
                </div>
                <div className="group-title-block">
                  <h3 className="group-card-title font-display">{group.name}</h3>
                  <span className="group-id-tag">{group.id}</span>
                </div>
              </div>

              <p className="group-card-desc">
                {group.short_description || `${group.name} pôsobí v oblasti speleológie na Slovensku.`}
              </p>

              <div className="group-card-footer">
                <div className="contact-indicators">
                  {group.public_contact?.email && <Mail size={13} />}
                  {group.public_contact?.phone && <Phone size={13} />}
                  {group.website && <Globe size={13} />}
                </div>
                <span className="detail-link">
                  Detail <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))}
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
          padding: 2rem;
        }

        .groups-modal {
          width: 1100px;
          max-width: 100%;
          height: 85vh;
          display: flex;
          flex-direction: column;
          padding: 2rem;
          background: rgba(33, 30, 27, 0.95);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.25rem;
        }

        .modal-badge {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--color-lantern-amber);
          font-weight: 600;
        }

        .modal-title {
          font-size: 1.85rem;
          color: var(--color-limestone);
        }

        .modal-subtitle {
          font-size: 0.85rem;
          color: var(--color-fog);
        }

        .close-btn {
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: var(--color-fog);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          color: var(--color-limestone);
        }

        .filter-bar {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(218, 211, 196, 0.15);
          padding: 0.65rem 1rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.5rem;
          max-width: 450px;
        }

        .filter-icon {
          color: var(--color-fog);
        }

        .filter-input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--color-limestone);
          font-size: 0.9rem;
          width: 100%;
        }

        .groups-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
          gap: 1.25rem;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .group-card-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(218, 211, 196, 0.1);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .group-card-item:hover {
          background: rgba(224, 145, 47, 0.1);
          border-color: rgba(224, 145, 47, 0.4);
          transform: translateY(-2px);
        }

        .group-card-top {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.85rem;
        }

        .group-avatar {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-md);
          background: var(--color-cave-water);
          color: var(--color-limestone);
          font-size: 0.95rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }

        .group-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: #FFFFFF;
          padding: 2px;
        }

        .group-title-block {
          display: flex;
          flex-direction: column;
        }

        .group-card-title {
          font-size: 1.05rem;
          color: var(--color-limestone);
          line-height: 1.25;
        }

        .group-id-tag {
          font-size: 0.7rem;
          color: var(--color-fog);
        }

        .group-card-desc {
          font-size: 0.82rem;
          color: var(--color-fog);
          line-height: 1.4;
          margin-bottom: 1.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .group-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(218, 211, 196, 0.08);
          padding-top: 0.75rem;
        }

        .contact-indicators {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: var(--color-lantern-amber);
        }

        .detail-link {
          font-size: 0.8rem;
          color: var(--color-fog);
          display: flex;
          align-items: center;
          gap: 0.2rem;
          font-weight: 500;
        }

        .group-card-item:hover .detail-link {
          color: var(--color-lantern-amber);
        }
      `}</style>
    </div>
  );
};
