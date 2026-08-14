import React from 'react';
import { GroupData } from '../types';
import { X, Globe, Mail, ExternalLink, ShieldCheck, MapPin, Edit, MessageSquare, Lock, Compass, Mountain, Sparkles, Users, FileText, AlertTriangle } from 'lucide-react';

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
        {group.short_description || `${group.name} aktívne pôsobí v oblasti speleologického prieskumu, mapovania a ochrany krasových fenoménov na Slovensku.`}
      </p>

      {/* Operating Areas & Mountain Ranges */}
      {group.operating_areas && group.operating_areas.length > 0 && (
        <div className="card-section">
          <div className="section-title">
            <Mountain size={14} className="section-icon" /> Krasové územia a pohoria
          </div>
          <div className="area-tags-row">
            {group.operating_areas.map((area, idx) => (
              <span key={idx} className="area-tag">
                {area}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Priority Karst Areas & Systematic Exploration Sites */}
      {group.priority_oblasti && group.priority_oblasti.length > 0 && (
        <div className="card-section priority-areas-section">
          <div className="section-title">
            <Mountain size={14} className="section-icon" /> Prioritné krasové územia & lokality
          </div>
          <div className="priority-areas-list">
            {group.priority_oblasti.map((pArea, idx) => (
              <div key={idx} className="priority-area-item">
                <div className="priority-area-top">
                  <span className="celok-tag">{pArea.celok}</span>
                  <strong className="uzemie-name">{pArea.uzemie}</strong>
                </div>
                {pArea.lokality && pArea.lokality.length > 0 && (
                  <div className="lokality-tags-row">
                    {pArea.lokality.map((lok, lIdx) => (
                      <span key={lIdx} className="lokalita-chip">
                        🏔️ {lok}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Caves & Exploration Sites */}
      {group.key_caves && group.key_caves.length > 0 && (
        <div className="card-section">
          <div className="section-title">
            <Compass size={14} className="section-icon" /> Kľúčové jaskyne a lokality
          </div>
          <div className="caves-list">
            {group.key_caves.map((cave, idx) => (
              <span key={idx} className="cave-pill">
                {cave}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Speleological Activities & Focus */}
      {group.key_activities && group.key_activities.length > 0 && (
        <div className="card-section">
          <div className="section-title">
            <Sparkles size={14} className="section-icon" /> Činnosť a špecializácia
          </div>
          <div className="activities-row">
            {group.key_activities.map((act, idx) => (
              <span key={idx} className="chip">
                {act}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Highlights from Spravodaj SSS (2021-2025) & Annual Report PDF Link */}
      <div className="card-section highlights-section">
        <div className="section-title">
          <Sparkles size={14} className="section-icon" /> Z výročných správ Spravodaj SSS
        </div>
        {group.annual_highlights && group.annual_highlights.length > 0 && (
          <ul className="highlights-list">
            {group.annual_highlights.map((item, idx) => (
              <li key={idx} className="highlight-item">
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className="spravodaj-links-container">
          <a
            href="https://sss.sk/wp-content/uploads/2026/06/Spravodaj_1_2026_vnutro_NET_web.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="spravodaj-pdf-btn"
            title="Otvoriť najnovšiu výročnú správu v Spravodaji SSS 1/2026 (PDF)"
          >
            <FileText size={14} />
            <span>Čítať výročnú správu 2026 (Spravodaj SSS)</span>
            <ExternalLink size={12} />
          </a>
          <a
            href="https://sss.sk/spravodaj-sss/"
            target="_blank"
            rel="noopener noreferrer"
            className="spravodaj-archive-link"
            title="Zobraziť všetky čísla Spravodaja SSS"
          >
            Archív všetkých výročných správ SSS →
          </a>
        </div>
      </div>

      {/* Contact Motivation Box */}
      <div className="motivation-box">
        <div className="motivation-header">
          <Users size={14} className="motivation-icon" />
          <span>Máte záujem o jaskyniarstvo?</span>
        </div>
        <p className="motivation-text">
          {group.contact_motivation || `Chcete sa zapojiť do výskumu podzemia, absolvovať speleologický výcvik alebo pomôcť s ochranou jaskýň v regióne ${group.hq_city || 'Slovensko'}? Radi vás privítame.`}
        </p>
      </div>

      {/* Contact Details List */}
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

      {/* Compact Cave Conservation & Law Reference */}
      <div className="conservation-notice">
        <AlertTriangle size={14} className="notice-icon" />
        <div>
          <strong>Ochrana krasu a zákon:</strong> Vstup do nesprístupnených jaskýň je podľa <a href="https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2002/543/" target="_blank" rel="noopener noreferrer" className="law-link">zákona č. 543/2002 Z. z.</a> viazaný na úradné povolenia. Pre bezpečný vstup a účasť na výskume kontaktujte náš klub.
        </div>
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
          margin-bottom: 0.85rem;
        }

        .card-section {
          margin-bottom: 0.85rem;
          background: rgba(0, 0, 0, 0.18);
          border: 1px solid rgba(218, 211, 196, 0.08);
          border-radius: var(--radius-md);
          padding: 0.75rem 0.85rem;
        }

        .section-title {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-lantern-amber);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          margin-bottom: 0.45rem;
        }

        .section-icon {
          color: var(--color-lantern-amber);
        }

        .area-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .area-tag {
          background: rgba(13, 148, 136, 0.18);
          border: 1px solid rgba(13, 148, 136, 0.4);
          color: #A7F3D0;
          font-size: 0.74rem;
          font-weight: 600;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-sm);
        }

        .caves-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .cave-pill {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(218, 211, 196, 0.14);
          color: var(--color-limestone);
          font-size: 0.74rem;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-sm);
        }

        .activities-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .chip {
          background: rgba(224, 145, 47, 0.12);
          border: 1px solid rgba(224, 145, 47, 0.3);
          color: var(--color-lantern-amber);
          font-size: 0.73rem;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-sm);
        }

        .highlights-section {
          background: rgba(224, 145, 47, 0.06);
          border-color: rgba(224, 145, 47, 0.2);
        }

        .highlights-list {
          margin: 0;
          padding-left: 1.1rem;
          font-size: 0.78rem;
          line-height: 1.45;
          color: var(--color-limestone);
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .highlight-item {
          color: var(--color-fog);
        }

        .spravodaj-links-container {
          margin-top: 0.65rem;
          padding-top: 0.55rem;
          border-top: 1px dashed rgba(224, 145, 47, 0.25);
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .spravodaj-pdf-btn {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.45rem;
          background: rgba(224, 145, 47, 0.15);
          border: 1px solid rgba(224, 145, 47, 0.45);
          color: var(--color-lantern-amber);
          padding: 0.45rem 0.65rem;
          border-radius: var(--radius-sm);
          font-size: 0.77rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .spravodaj-pdf-btn:hover {
          background: var(--color-lantern-amber);
          color: #1A140E;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(224, 145, 47, 0.3);
        }

        .spravodaj-archive-link {
          font-size: 0.72rem;
          color: var(--color-fog);
          text-decoration: none;
          transition: color 0.2s;
          display: inline-block;
        }

        .spravodaj-archive-link:hover {
          color: var(--color-lantern-amber);
          text-decoration: underline;
        }

        .priority-areas-section {
          background: rgba(0, 0, 0, 0.18);
          border: 1px solid rgba(224, 145, 47, 0.25);
          border-radius: var(--radius-md);
          padding: 0.75rem;
        }

        .priority-areas-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .priority-area-item {
          background: rgba(255, 255, 255, 0.04);
          border-radius: 6px;
          padding: 0.5rem 0.65rem;
          border-left: 3px solid var(--color-lantern-amber);
        }

        .priority-area-top {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          margin-bottom: 0.35rem;
          flex-wrap: wrap;
        }

        .celok-tag {
          font-size: 0.68rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: rgba(224, 145, 47, 0.25);
          color: var(--color-lantern-amber);
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
        }

        .uzemie-name {
          font-size: 0.82rem;
          color: #FFFFFF;
        }

        .lokality-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .lokalita-chip {
          font-size: 0.72rem;
          background: rgba(13, 148, 136, 0.2);
          border: 1px solid rgba(13, 148, 136, 0.35);
          color: #5EEAD4;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          font-weight: 500;
        }

        .motivation-box {
          background: linear-gradient(135deg, rgba(224, 145, 47, 0.18), rgba(13, 148, 136, 0.14));
          border: 1px solid rgba(224, 145, 47, 0.35);
          border-radius: var(--radius-md);
          padding: 0.75rem 0.85rem;
          margin-bottom: 0.85rem;
        }

        .motivation-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-lantern-amber);
          margin-bottom: 0.25rem;
        }

        .motivation-icon {
          color: var(--color-lantern-amber);
        }

        .motivation-text {
          font-size: 0.78rem;
          line-height: 1.4;
          color: var(--color-limestone);
          margin: 0;
        }

        .contacts-block {
          background: rgba(0, 0, 0, 0.25);
          border-radius: var(--radius-md);
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 0.85rem;
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
          margin-bottom: 0.75rem;
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

        .conservation-notice {
          font-size: 0.74rem;
          color: #FFFFFF;
          background: linear-gradient(145deg, rgba(220, 38, 38, 0.2), rgba(217, 119, 6, 0.2));
          border-left: 3px solid #EF4444;
          border: 1px solid rgba(239, 68, 68, 0.4);
          padding: 0.6rem 0.75rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: flex-start;
          gap: 0.45rem;
          line-height: 1.4;
          margin-top: 0.5rem;
        }

        .conservation-notice strong {
          color: #FCA5A5;
        }

        .conservation-notice .notice-icon {
          color: #EF4444;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .conservation-notice .law-link {
          color: #FDE047;
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .conservation-notice .law-link:hover {
          color: #FEF08A;
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
