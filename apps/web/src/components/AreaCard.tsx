import React from 'react';
import { AreaData, GroupData } from '../types';
import { X, Layers, Users, ChevronRight, AlertTriangle, ShieldAlert, LifeBuoy } from 'lucide-react';

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

      {/* Prominent Cave Safety, Contact Prompt & Law/Risk Warning */}
      <div className="area-cave-safety-card">
        {/* 1. Welcoming Safe Contact Prompt at Top */}
        <div className="alert-callout-top">
          <div className="callout-header-row">
            <LifeBuoy size={16} className="callout-icon" />
            <h4 className="callout-main-title">Chcete spoznať jaskyne bezpečne a legálne?</h4>
          </div>
          <p className="callout-text">
            <strong>Nikdy nevstupujte sami.</strong> Kontaktujte oficiálny jaskyniarsky klub SSS – jaskyniari disponujú potrebným výcvikom, certifikovanou jednolanovou technikou (SRT) a povoleniami. Radi vás vezmeme do podzemia bezpečne.
          </p>
        </div>

        {/* 2. Rationale: Legal & Severe Hazards Warning */}
        <div className="alert-rationale-section">
          <div className="alert-badge-header">
            <AlertTriangle size={14} className="alert-badge-icon" />
            <span className="alert-badge-title">Prečo nevstupovať bez klubu a povolenia?</span>
          </div>

          <p className="alert-law-text">
            Podľa <a href="https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2002/543/" target="_blank" rel="noopener noreferrer" className="law-link">zákona č. 543/2002 Z. z. o ochrane prírody a krajiny</a> sú všetky jaskyne na Slovensku chránené prírodné pamiatky. Voľný vstup bez oficiálneho povolenia je <strong>prísne zakázaný a pokutovaný</strong>.
          </p>

          <div className="risk-warning-subbox">
            <div className="risk-header">
              <ShieldAlert size={14} className="risk-icon" />
              <span>Jaskyne sú extrémne nebezpečné prostredie:</span>
            </div>
            <ul className="risk-points-list">
              <li>Riziko fatálnych pádov do hlbokých vertikál a priepastí</li>
              <li>Závaly, nestabilné bloky a padajúce kamene</li>
              <li>Absolútna tma, strata orientácie a rýchle podchladenie (hypotermia)</li>
              <li>Náhle záplavy vodou a výskyt nedýchateľných plynov</li>
              <li>Záchranné akcie v podzemí trvajú desiatky hodín</li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .area-card-overlay {
          position: absolute;
          bottom: 28px;
          left: 28px;
          width: 400px;
          max-width: calc(100vw - 56px);
          max-height: calc(100vh - 75px);
          overflow-y: auto;
          padding: 1.25rem;
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
          top: 0.85rem;
          right: 0.85rem;
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: var(--color-fog);
          width: 30px;
          height: 30px;
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
          gap: 0.3rem;
          margin-bottom: 0.65rem;
        }

        .area-badge {
          font-size: 0.72rem;
          color: var(--color-lantern-amber);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 600;
        }

        .area-title {
          font-size: 1.45rem;
          color: var(--color-limestone);
          line-height: 1.2;
        }

        .cave-count-tag {
          display: inline-flex;
          align-items: baseline;
          gap: 0.35rem;
          background: rgba(224, 145, 47, 0.15);
          border: 1px solid rgba(224, 145, 47, 0.3);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
          width: fit-content;
          margin-top: 0.15rem;
        }

        .cave-num {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--color-lantern-amber);
        }

        .cave-text {
          font-size: 0.75rem;
          color: var(--color-fog);
        }

        .area-desc {
          font-size: 0.82rem;
          line-height: 1.4;
          color: var(--color-fog);
          margin-bottom: 0.75rem;
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

        /* High-Contrast Cave Safety, Law & Danger Alert Card */
        .area-cave-safety-card {
          background: linear-gradient(145deg, #180808 0%, #220E04 100%);
          border: 2px solid #EF4444;
          border-radius: var(--radius-md);
          padding: 0.95rem;
          margin-top: 1rem;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6), 0 0 16px rgba(239, 68, 68, 0.25);
        }

        /* 1. Welcoming Contact Box at Top */
        .alert-callout-top {
          background: rgba(13, 148, 136, 0.28);
          border: 1.5px solid #14B8A6;
          border-radius: var(--radius-sm);
          padding: 0.75rem 0.85rem;
          margin-bottom: 0.85rem;
          box-shadow: 0 4px 12px rgba(13, 148, 136, 0.2);
        }

        .callout-header-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          margin-bottom: 0.35rem;
        }

        .callout-icon {
          color: #34D399;
          flex-shrink: 0;
        }

        .callout-main-title {
          font-size: 0.88rem;
          font-weight: 800;
          line-height: 1.3;
          color: #F0FDF4;
          margin: 0;
        }

        .callout-text {
          font-size: 0.77rem;
          line-height: 1.45;
          color: #FFFFFF;
          margin: 0;
        }

        .callout-text strong {
          color: #A7F3D0;
        }

        /* 2. Rationale & Hazard Warning */
        .alert-rationale-section {
          border-top: 1px dashed rgba(239, 68, 68, 0.35);
          padding-top: 0.75rem;
        }

        .alert-badge-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.35rem;
        }

        .alert-badge-icon {
          color: #EF4444;
          filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.8));
        }

        .alert-badge-title {
          font-size: 0.74rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #FCA5A5;
        }

        .alert-law-text {
          font-size: 0.76rem;
          line-height: 1.45;
          color: #FFFFFF;
          margin-bottom: 0.6rem;
        }

        .law-link {
          color: #FDE047;
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s;
        }

        .law-link:hover {
          color: #FEF08A;
        }

        .risk-warning-subbox {
          background: #110505;
          border: 1.5px solid rgba(239, 68, 68, 0.45);
          border-radius: var(--radius-sm);
          padding: 0.65rem 0.75rem;
        }

        .risk-header {
          font-size: 0.77rem;
          font-weight: 800;
          color: #FCA5A5;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          margin-bottom: 0.35rem;
        }

        .risk-icon {
          color: #EF4444;
          flex-shrink: 0;
        }

        .risk-points-list {
          margin: 0;
          padding-left: 1.1rem;
          font-size: 0.75rem;
          line-height: 1.4;
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .risk-points-list li {
          color: #FFFFFF;
        }

        .risk-points-list li::marker {
          color: #EF4444;
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
