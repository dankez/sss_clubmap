import React, { useState, useEffect } from 'react';
import { GroupData } from '../types';
import { X, Save, Image, MapPin, Globe, Mail, FileText, Building, Upload } from 'lucide-react';

interface AdminGroupEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: GroupData | null;
  onSaveGroup: (updatedGroup: GroupData) => void;
}

export const AdminGroupEditModal: React.FC<AdminGroupEditModalProps> = ({
  isOpen,
  onClose,
  group,
  onSaveGroup,
}) => {
  const [name, setName] = useState('');
  const [hqCity, setHqCity] = useState('');
  const [website, setWebsite] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (group) {
      setName(group.name || '');
      setHqCity(group.hq_city || '');
      setWebsite(group.website || '');
      setShortDesc(group.short_description || '');
      setLogoUrl(group.logo_url || '');
      setEmail(group.public_contact?.email || '');
    }
  }, [group]);

  if (!isOpen || !group) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: GroupData = {
      ...group,
      name,
      hq_city: hqCity,
      website: website,
      short_description: shortDesc,
      logo_url: logoUrl,
      public_contact: {
        ...group.public_contact,
        email: email
      }
    };

    onSaveGroup(updated);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="edit-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="admin-badge">Admin úprava karty</span>
            <h2 className="modal-title font-display">Úprava údajov: {group.name}</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-grid">
            <div className="form-group">
              <label><Building size={14} /> Názov skupiny</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label><MapPin size={14} /> Sídlo / Mesto</label>
              <input
                type="text"
                value={hqCity}
                onChange={(e) => setHqCity(e.target.value)}
              />
            </div>
          </div>

          {/* Logo Upload & URL Box */}
          <div className="form-group">
            <label><Image size={14} /> Logo klubu (Nahrať súbor alebo vložiť URL)</label>
            
            <div className="logo-inputs-row">
              <input
                type="text"
                placeholder="/logos/logo_p4_1.png alebo https://..."
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="logo-url-input"
              />

              <label className="file-upload-btn font-ui">
                <Upload size={14} /> Vybrať obrázok...
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            {logoUrl && (
              <div className="logo-preview-row">
                <span>Náhľad nového loga:</span>
                <img src={logoUrl} alt="Náhľad" className="preview-logo-img" />
              </div>
            )}
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label><Globe size={14} /> Webstránka</label>
              <input
                type="url"
                placeholder="https://..."
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label><Mail size={14} /> Kontaktný e-mail (Chránený)</label>
              <input
                type="email"
                placeholder="klub@speleo.sk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label><FileText size={14} /> Krátky popis činnosti</label>
            <textarea
              rows={3}
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary full-width">
              <Save size={16} /> Uložiť zmeny v karte klubu
            </button>
          </div>
        </form>
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

        .edit-modal {
          width: 640px;
          max-width: 95%;
          padding: 2rem;
          background: rgba(30, 37, 34, 0.96);
          position: relative;
          border-radius: var(--radius-lg);
        }

        .admin-badge {
          font-size: 0.75rem;
          color: var(--color-lantern-amber);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 600;
        }

        .modal-title {
          font-size: 1.4rem;
          color: var(--color-limestone);
        }

        .edit-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.25rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
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
        }

        .logo-inputs-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-url-input {
          flex: 1;
        }

        .file-upload-btn {
          background: rgba(224, 145, 47, 0.2);
          border: 1px solid var(--color-lantern-amber);
          color: var(--color-lantern-amber);
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          white-space: nowrap;
          transition: all 0.2s;
        }

        .file-upload-btn:hover {
          background: var(--color-lantern-amber);
          color: #1A140E;
        }

        .logo-preview-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.35rem;
          font-size: 0.8rem;
          color: var(--color-fog);
        }

        .preview-logo-img {
          width: 44px;
          height: 44px;
          object-fit: contain;
          background: #FFF;
          border-radius: 6px;
          padding: 3px;
        }

        .full-width {
          width: 100%;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};
