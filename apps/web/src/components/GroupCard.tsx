import React from 'react';
import { GroupData } from '../types';
import { X, Globe, Mail, ExternalLink, ShieldCheck, MapPin, Edit, MessageSquare, Lock } from 'lucide-react';

interface GroupCardProps {
  group: GroupData;
  onClose: () => void;
  onOpenContactForm: (group: GroupData) => void;
  isLoggedIn?: boolean;
  onOpenAdminEdit?: (group: GroupData) => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  group,
  onClose,
  onOpenContactForm,
  isLoggedIn = false,
  onOpenAdminEdit,
}) => {
  return (
    <div className="group-card-overlay glass-panel">
      <button className="close-btn" onClick={onClose} aria-label="Zatvoriť">
        <X size={18} />
      </button>

      <div className="group-card-header">
        <div className="group-badge-row">
          <span className="type-badge">Speleologický klub SSS</span>
          {group.verified_at && (
            <span className="verified-badge">
              <ShieldCheck size={12} /> Overené
            </span>
          )}
          {isLoggedIn && onOpenAdminEdit && (
            <button
              className="admin-edit-badge"
              onClick={() => onOpenAdminEdit(group)}
              title="Upraviť údaje karty (Admin)"
            >
              <Edit size={12} /> Upraviť kartu
            </button>
          )}
        </div>

        <div className="group-main-identity">
          <div className="group-logo-avatar font-display">
            {group.logo_url ? (
              <img src={group.logo_url} alt={group.name} className="group-logo-img" />
            ) : (
              group.name.substring(0, 2).toUpperCase()
            )}
          </div>
          <div>
            <h2 className="group-name font-display">{group.name}</h2>
            <div className="group-location-line">
              <MapPin size={13} className="pin-icon" />
              <span className="group-hq-city">{group.hq_city || 'Slovensko'}</span>
              <span className="dot-sep">•</span>
              <span className="group-id-code">ID: {group.id}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="group-desc">
        {group.short_description || `${group.name} pôsobí v oblasti speleológia, prieskumu a mapovania krasu na Slovensku.`}
      </p>

      {/* Activity Chips */}
      <div className="activities-row">
        <span className="chip">Prieskum</span>
        <span className="chip">Mapovanie</span>
        <span className="chip">Dokumentácia</span>
        <span className="chip">Ochrana prírody</span>
      </div>

      {/* Contact Details List (Private items masked) */}
      <div className="contacts-block">
        <div className="contact-line clickable" onClick={() => onOpenContactForm(group)}>
          <Mail size={15} className="contact-icon" />
          <span className="contact-masked font-ui">
            Chránený e-mail SSS <span className="masked-hint">(Odoslať cez formulár)</span>
          </span>
        </div>

        <div className="contact-line muted">
          <Lock size={14} className="contact-icon-muted" />
          <span className="contact-muted-text font-ui">
            Telefón: Nezverejnené (Ochrana súkromia)
          </span>
        </div>

        {group.website && (
          <div className="contact-line">
            <Globe size={15} className="contact-icon" />
            <a href={group.website} target="_blank" rel="noopener noreferrer" className="contact-link">
              {group.website.replace(/^https?:\/\//, '')}
              <ExternalLink size={12} />
            </a>
          </div>
        )}
      </div>

      {/* Primary Actions: Contact Form & Admin Edit */}
      <div className="cta-container">
        <button className="btn-primary cta-btn" onClick={() => onOpenContactForm(group)}>
          <MessageSquare size={17} /> Otvoriť kontaktný formulár
        </button>

        {isLoggedIn && onOpenAdminEdit && (
          <button className="btn-admin-edit" onClick={() => onOpenAdminEdit(group)}>
            <Edit size={16} /> Upraviť polia & logo (Admin)
          </button>
        )}
      </div>

      <div className="safety-note">
        <MapPin size={12} /> Súkromné kontakty a presné súradnice sú chránené proti zberu spamu.
      </div>

      <style>{`
        .group-card-overlay {
          position: absolute;
          bottom: 28px;
          right: 28px;
          width: 410px;
          max-width: calc(100vw - 56px);
          max-height: calc(100vh - 120px);
          overflow-y: auto;
          padding: 1.5rem;
          z-index: 12;
          color: var(--color-limestone);
          animation: slideUpRight 0.3s ease-out forwards;
        }

        @keyframes slideUpRight {
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
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          color: var(--color-limestone);
        }

        .group-badge-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }

        .type-badge {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--color-lantern-amber);
          font-weight: 600;
        }

        .verified-badge {
          font-size: 0.7rem;
          background: rgba(91, 124, 78, 0.2);
          color: var(--color-moss-green);
          padding: 2px 8px;
          border-radius: 99px;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .admin-edit-badge {
          font-size: 0.7rem;
          background: rgba(224, 145, 47, 0.2);
          color: var(--color-lantern-amber);
          border: 1px solid rgba(224, 145, 47, 0.4);
          padding: 2px 8px;
          border-radius: 99px;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          cursor: pointer;
          font-weight: 600;
        }

        .group-main-identity {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1rem;
        }

        .group-logo-avatar {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          background: var(--color-lantern-amber);
          color: var(--color-cave-stone);
          font-size: 1.1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }

        .group-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: #FFFFFF;
          padding: 3px;
        }

        .group-name {
          font-size: 1.35rem;
          line-height: 1.25;
          color: var(--color-limestone);
        }

        .group-location-line {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          margin-top: 0.2rem;
        }

        .pin-icon {
          color: var(--color-lantern-amber);
        }

        .group-hq-city {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-lantern-amber);
        }

        .dot-sep {
          color: var(--color-fog);
          font-size: 0.75rem;
        }

        .group-id-code {
          font-size: 0.75rem;
          color: var(--color-fog);
        }

        .group-desc {
          font-size: 0.88rem;
          line-height: 1.5;
          color: var(--color-fog);
          margin-bottom: 1rem;
        }

        .activities-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.2rem;
        }

        .chip {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(218, 211, 196, 0.12);
          color: var(--color-limestone);
          font-size: 0.75rem;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
        }

        .contacts-block {
          background: rgba(0, 0, 0, 0.25);
          border-radius: var(--radius-md);
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 1.25rem;
        }

        .contact-line {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
        }

        .contact-line.clickable {
          cursor: pointer;
        }

        .contact-line.clickable:hover .contact-masked {
          color: var(--color-lantern-amber);
        }

        .contact-icon {
          color: var(--color-lantern-amber);
          flex-shrink: 0;
        }

        .contact-icon-muted {
          color: var(--color-rock-grey-light);
          flex-shrink: 0;
        }

        .contact-masked {
          color: var(--color-limestone);
          font-size: 0.85rem;
          font-weight: 500;
        }

        .masked-hint {
          font-size: 0.75rem;
          color: var(--color-lantern-amber);
          margin-left: 4px;
        }

        .contact-muted-text {
          font-size: 0.8rem;
          color: var(--color-rock-grey-light);
        }

        .contact-link {
          color: var(--color-limestone);
          text-decoration: none;
          word-break: break-all;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          transition: color var(--transition-fast);
        }

        .contact-link:hover {
          color: var(--color-lantern-amber);
        }

        .cta-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 0.85rem;
        }

        .cta-btn {
          width: 100%;
          justify-content: center;
          font-size: 0.92rem;
          padding: 0.75rem 1rem;
        }

        .btn-admin-edit {
          background: rgba(224, 145, 47, 0.15);
          border: 1px solid var(--color-lantern-amber);
          color: var(--color-lantern-amber);
          padding: 0.6rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          transition: all 0.2s;
        }

        .btn-admin-edit:hover {
          background: var(--color-lantern-amber);
          color: #1A140E;
        }

        .safety-note {
          font-size: 0.72rem;
          color: var(--color-rock-grey-light);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          line-height: 1.3;
        }

        @media (max-width: 640px) {
          .group-card-overlay {
            right: 16px;
            left: 16px;
            bottom: 16px;
            width: auto;
          }
        }
      `}</style>
    </div>
  );
};
