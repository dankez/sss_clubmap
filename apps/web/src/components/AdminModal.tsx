import React, { useState } from 'react';
import { Shield, X, Key, Mail, User, Check, AlertCircle, RefreshCw, Lock } from 'lucide-react';
import { AdminCredentials } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  adminCreds: AdminCredentials;
  onLogin: (user: string, pass: string) => boolean;
  onLogout: () => void;
  onChangePassword: (newPass: string) => void;
  onResetPasswordRequest: (email: string, newPass: string) => boolean;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  isLoggedIn,
  adminCreds,
  onLogin,
  onLogout,
  onChangePassword,
  onResetPasswordRequest,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'change_pass' | 'reset_pass'>('login');
  
  // Login form state
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Change password state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [changeSuccess, setChangeSuccess] = useState('');
  const [changeError, setChangeError] = useState('');

  // Reset password state
  const [resetEmail, setResetEmail] = useState('');
  const [resetNewPass, setResetNewPass] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [resetError, setResetError] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = onLogin(loginUser.trim(), loginPass);
    if (success) {
      setLoginUser('');
      setLoginPass('');
      onClose();
    } else {
      setLoginError('Nespávne používateľské meno alebo heslo!');
    }
  };

  const handleChangePassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setChangeError('');
    setChangeSuccess('');

    if (currentPass !== (adminCreds.passwordRaw || 'blesk11*')) {
      setChangeError('Aktuálne heslo nie je správne.');
      return;
    }
    if (newPass.length < 4) {
      setChangeError('Nové heslo musí mať aspoň 4 znaky.');
      return;
    }
    if (newPass !== confirmPass) {
      setChangeError('Nové heslá sa nezhodujú.');
      return;
    }

    onChangePassword(newPass);
    setChangeSuccess('Heslo bolo úspešne zmenené!');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  const handleResetPassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');

    if (resetEmail.trim().toLowerCase() !== adminCreds.email.toLowerCase()) {
      setResetError(`E-mail nesúhlasí s registrovaným e-mailom správcu (${adminCreds.email}).`);
      return;
    }
    if (resetNewPass.length < 4) {
      setResetError('Nové heslo musí mať aspoň 4 znaky.');
      return;
    }

    const ok = onResetPasswordRequest(resetEmail.trim(), resetNewPass);
    if (ok) {
      setResetSuccess(`Heslo pre správcu (${adminCreds.email}) bolo úspešne obnovené! Teraz sa môžete prihlásiť s novým heslom.`);
      setResetEmail('');
      setResetNewPass('');
      setTimeout(() => {
        setActiveTab('login');
      }, 2000);
    } else {
      setResetError('Obnovenie hesla zlyhalo.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content admin-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-with-icon">
            <Shield className="icon-amber" size={24} />
            <div>
              <h2 className="font-display">Správa & Administrácia SSS</h2>
              <p className="subtitle">Prihlásenie pre úpravu polygonov a vlastností skupín</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Status indicator */}
        <div className="admin-status-banner">
          {isLoggedIn ? (
            <div className="logged-in-badge">
              <Check size={16} />
              <span>Prihlásený ako Admin <strong>({adminCreds.email})</strong></span>
              <button className="btn-logout" onClick={onLogout}>Odhlásiť sa</button>
            </div>
          ) : (
            <div className="logged-out-badge">
              <Lock size={16} />
              <span>Prístup pre autorizovaného správcu mapy</span>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="modal-tabs">
          {!isLoggedIn ? (
            <>
              <button
                className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                <User size={16} /> Prihlásenie
              </button>
              <button
                className={`tab-btn ${activeTab === 'reset_pass' ? 'active' : ''}`}
                onClick={() => setActiveTab('reset_pass')}
              >
                <RefreshCw size={16} /> Obnova hesla
              </button>
            </>
          ) : (
            <>
              <button
                className={`tab-btn ${activeTab === 'change_pass' ? 'active' : ''}`}
                onClick={() => setActiveTab('change_pass')}
              >
                <Key size={16} /> Zmeniť heslo
              </button>
            </>
          )}
        </div>

        <div className="modal-body">
          {/* TAB 1: LOGIN */}
          {!isLoggedIn && activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="admin-form">
              {loginError && (
                <div className="form-alert error">
                  <AlertCircle size={16} />
                  <span>{loginError}</span>
                </div>
              )}
              <div className="form-group">
                <label><User size={14} /> Používateľské meno / Email</label>
                <input
                  type="text"
                  placeholder="dankez"
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label><Key size={14} /> Heslo</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary full-width">
                  Prihlásiť sa do adminu
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: CHANGE PASSWORD (WHEN LOGGED IN) */}
          {isLoggedIn && activeTab === 'change_pass' && (
            <form onSubmit={handleChangePassSubmit} className="admin-form">
              {changeError && (
                <div className="form-alert error">
                  <AlertCircle size={16} />
                  <span>{changeError}</span>
                </div>
              )}
              {changeSuccess && (
                <div className="form-alert success">
                  <Check size={16} />
                  <span>{changeSuccess}</span>
                </div>
              )}
              <div className="form-group">
                <label>Aktuálne heslo</label>
                <input
                  type="password"
                  placeholder="Vložte staré heslo"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nové heslo</label>
                <input
                  type="password"
                  placeholder="Nové heslo"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Potvrdiť nové heslo</label>
                <input
                  type="password"
                  placeholder="Zopakujte nové heslo"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary full-width">
                  Uložiť nové heslo
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: RESET PASSWORD (WHEN LOGGED OUT) */}
          {!isLoggedIn && activeTab === 'reset_pass' && (
            <form onSubmit={handleResetPassSubmit} className="admin-form">
              {resetError && (
                <div className="form-alert error">
                  <AlertCircle size={16} />
                  <span>{resetError}</span>
                </div>
              )}
              {resetSuccess && (
                <div className="form-alert success">
                  <Check size={16} />
                  <span>{resetSuccess}</span>
                </div>
              )}
              <p className="form-help-text">
                Zadajte e-mail správcu <code>{adminCreds.email}</code> a nastavte si nové heslo.
              </p>
              <div className="form-group">
                <label><Mail size={14} /> E-mail správcu</label>
                <input
                  type="email"
                  placeholder={adminCreds.email}
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label><Key size={14} /> Nové heslo</label>
                <input
                  type="password"
                  placeholder="Nové heslo"
                  value={resetNewPass}
                  onChange={(e) => setResetNewPass(e.target.value)}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary full-width">
                  Obnoviť a uplatniť nové heslo
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 0.5rem;
        }

        .close-btn {
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

        .admin-modal {
          max-width: 480px;
          width: 90%;
          padding: 1.75rem;
          background: rgba(30, 37, 34, 0.95);
          backdrop-filter: blur(20px);
          position: relative;
        }

        .title-with-icon {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .admin-modal h2 {
          font-size: 1.35rem;
          margin: 0;
          color: var(--color-limestone);
        }

        .admin-modal .subtitle {
          font-size: 0.8rem;
          color: var(--color-fog);
          margin: 2px 0 0 0;
        }

        .admin-status-banner {
          margin: 1.25rem 0 1rem 0;
        }

        .logged-in-badge {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(91, 124, 78, 0.2);
          border: 1px solid rgba(91, 124, 78, 0.4);
          color: #8FD8A0;
          padding: 0.6rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
        }

        .btn-logout {
          margin-left: auto;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFF;
          padding: 3px 8px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.75rem;
        }

        .logged-out-badge {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(224, 145, 47, 0.12);
          border: 1px solid rgba(224, 145, 47, 0.3);
          color: var(--color-lantern-amber);
          padding: 0.6rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
        }

        .modal-tabs {
          display: flex;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
          background: rgba(0, 0, 0, 0.3);
          padding: 4px;
          border-radius: var(--radius-md);
        }

        .tab-btn {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--color-fog);
          padding: 0.45rem 0.6rem;
          border-radius: 8px;
          font-size: 0.82rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .tab-btn.active {
          background: var(--color-limestone);
          color: var(--color-cave-stone);
          font-weight: 600;
        }

        .admin-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-group label {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--color-fog);
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .form-group input {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(213, 206, 194, 0.2);
          border-radius: var(--radius-md);
          padding: 0.65rem 0.85rem;
          color: var(--color-limestone);
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-group input:focus {
          border-color: var(--color-lantern-amber);
          background: rgba(224, 145, 47, 0.05);
        }

        .form-info-box {
          background: rgba(255, 255, 255, 0.04);
          border-left: 3px solid var(--color-lantern-amber);
          padding: 0.65rem 0.85rem;
          border-radius: 4px;
          font-size: 0.78rem;
          color: var(--color-fog);
        }

        .form-help-text {
          font-size: 0.82rem;
          color: var(--color-fog);
          margin-bottom: 0.5rem;
        }

        .form-alert {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.82rem;
        }

        .form-alert.error {
          background: rgba(181, 80, 46, 0.2);
          border: 1px solid rgba(181, 80, 46, 0.4);
          color: #FF9B82;
        }

        .form-alert.success {
          background: rgba(91, 124, 78, 0.2);
          border: 1px solid rgba(91, 124, 78, 0.4);
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
