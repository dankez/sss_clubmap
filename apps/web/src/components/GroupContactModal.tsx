import React, { useState } from 'react';
import { GroupData } from '../types';
import { X, Send, CheckCircle, ShieldCheck, Mail, User, MessageSquare } from 'lucide-react';

interface GroupContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: GroupData;
}

export const GroupContactModal: React.FC<GroupContactModalProps> = ({
  isOpen,
  onClose,
  group,
}) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSenderName('');
      setSenderEmail('');
      setMessage('');
      onClose();
    }, 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="contact-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-block">
            <span className="contact-badge"><ShieldCheck size={14} /> Chránený kontaktný formulár</span>
            <h2 className="modal-title font-display">Kontaktovať {group.name}</h2>
            <p className="modal-subtitle">Vaša správa bude doručená priamo správcom speleologického klubu</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="success-state">
            <CheckCircle size={48} className="success-icon" />
            <h3 className="font-display">Správa bola odoslaná!</h3>
            <p>Ďakujeme! Vaša správa bola bezpečne doručená vedeniu klubu <strong>{group.name}</strong>.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label><User size={14} /> Vaše meno a priezvisko</label>
              <input
                type="text"
                placeholder="napr. Ján Novák"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label><Mail size={14} /> Váš kontakt / E-mail</label>
              <input
                type="email"
                placeholder="jan.novak@example.com"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label><MessageSquare size={14} /> Správa pre klub</label>
              <textarea
                rows={4}
                placeholder="Dobrý deň, mal by som záujem o členstvo / prieskum..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <div className="privacy-notice">
              🔒 E-mail a telefónne číslo klubu sú chránené proti zberu spamu. Správa prebieha bezpečne.
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary full-width">
                <Send size={16} /> Odoslať správu klubu
              </button>
            </div>
          </form>
        )}
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
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .contact-modal {
          width: 520px;
          max-width: 95%;
          padding: 2rem;
          background: rgba(30, 37, 34, 0.96);
          position: relative;
          border-radius: var(--radius-lg);
        }

        .contact-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: var(--color-moss-green);
          background: rgba(91, 124, 78, 0.2);
          padding: 2px 8px;
          border-radius: 99px;
          font-weight: 600;
          margin-bottom: 0.4rem;
        }

        .modal-title {
          font-size: 1.4rem;
          color: var(--color-limestone);
        }

        .modal-subtitle {
          font-size: 0.82rem;
          color: var(--color-fog);
          margin-top: 2px;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .form-group label {
          font-size: 0.8rem;
          color: var(--color-fog);
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .form-group input, .form-group textarea {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(213, 206, 194, 0.2);
          border-radius: var(--radius-md);
          padding: 0.65rem 0.85rem;
          color: var(--color-limestone);
          font-size: 0.9rem;
          outline: none;
          font-family: var(--font-ui);
        }

        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--color-lantern-amber);
        }

        .privacy-notice {
          font-size: 0.75rem;
          color: var(--color-rock-grey-light);
          background: rgba(255, 255, 255, 0.04);
          padding: 0.6rem 0.75rem;
          border-radius: var(--radius-sm);
        }

        .success-state {
          text-align: center;
          padding: 2.5rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .success-icon {
          color: #8FD8A0;
        }

        .full-width {
          width: 100%;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};
