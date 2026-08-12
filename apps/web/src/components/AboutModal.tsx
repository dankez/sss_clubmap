import React from 'react';
import { X, ShieldAlert, Compass, Users, MapPin } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="about-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Zatvoriť">
          <X size={20} />
        </button>

        <div className="about-hero">
          <span className="about-subtitle">SLOVENSKO POD POVRCHOM</span>
          <h1 className="about-title font-display">Slovenská Speleologická Spoločnosť</h1>
          <p className="about-lead font-ui">
            Slovensko patrí medzi krajiny s najbohatším a najrozmanitejším krasovým podzemím v Európe.
            Naša mapa spája verejnosť s výskumníkmi, dokumentátormi a ochrancami podzemného sveta.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <div className="card-icon"><Compass size={22} /></div>
            <h3 className="card-title font-display">Čo je SSS Map?</h3>
            <p className="card-text">
              SSS Map je digitálny vizuálny atlas slovenskej speleológie. Pomáha verejnosti pochopiť,
              v ktorých oblastiach pôsobia jednotlivé jaskyniarske kluby a spája záujemcov s oficiálnymi kontaktmi.
            </p>
          </div>

          <div className="about-card">
            <div className="card-icon"><Users size={22} /></div>
            <h3 className="card-title font-display">Kto sú speleológovia?</h3>
            <p className="card-text">
              Dobrovoľní aj profesionálni výskumníci, ktorí vo voľnom čase objavujú, mapujú a chránia
              jaskyne. Pôsobia v viac ako 50 jaskyniarskych skupinách po celom Slovensku.
            </p>
          </div>

          <div className="about-card highlight-card">
            <div className="card-icon"><ShieldAlert size={22} /></div>
            <h3 className="card-title font-display">Ochrana jaskýň a bezpečnosť</h3>
            <p className="card-text">
              Jaskyne sú citlivé prírodné ekosystémy a nebezpečné prostredie. Na mape zámernie zobrazené
              iba orientačné polygóny oblastí – presné GPS súradnice vchodov z dôvodu bezpečnosti a ochrany nezverejňujeme.
            </p>
          </div>
        </div>

        <div className="about-footer">
          <MapPin size={16} />
          <span>V prípade záujmu o speleológiu vyhľadajte najbližšiu skupinu na mape a kontaktujte jej vedenie.</span>
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

        .about-modal {
          width: 900px;
          max-width: 100%;
          max-height: 88vh;
          overflow-y: auto;
          padding: 2.5rem;
          background: rgba(33, 30, 27, 0.96);
          position: relative;
        }

        .close-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: var(--color-fog);
          width: 38px;
          height: 38px;
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

        .about-hero {
          margin-bottom: 2rem;
          max-width: 720px;
        }

        .about-subtitle {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-lantern-amber);
          font-weight: 600;
        }

        .about-title {
          font-size: 2.3rem;
          color: var(--color-limestone);
          margin: 0.25rem 0 0.75rem 0;
        }

        .about-lead {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--color-fog);
        }

        .about-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .about-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(218, 211, 196, 0.1);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
        }

        .highlight-card {
          background: rgba(224, 145, 47, 0.08);
          border-color: rgba(224, 145, 47, 0.3);
        }

        .card-icon {
          color: var(--color-lantern-amber);
          margin-bottom: 0.75rem;
        }

        .card-title {
          font-size: 1.2rem;
          color: var(--color-limestone);
          margin-bottom: 0.5rem;
        }

        .card-text {
          font-size: 0.88rem;
          line-height: 1.55;
          color: var(--color-fog);
        }

        .about-footer {
          background: rgba(0, 0, 0, 0.3);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--color-lantern-amber);
          font-size: 0.88rem;
        }
      `}</style>
    </div>
  );
};
