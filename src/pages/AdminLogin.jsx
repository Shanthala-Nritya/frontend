import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { apiFetch, getAuthToken, setAuthToken } from '../lib/api'
import { siteAssets } from '../siteAssets'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cinzel:wght@400;500&display=swap');

  .al-shell {
    min-height: 100vh;
    display: flex;
    align-items: stretch;
    background: #0e0608;
    font-family: 'Cormorant Garamond', serif;
    overflow: hidden;
  }

  /* ── LEFT VISUAL PANEL ── */
  .al-visual {
    position: relative;
    flex: 1.1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    min-width: 0;
  }

  .al-visual-bg {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg,
        rgba(10,3,5,0.18) 0%,
        rgba(10,3,5,0.22) 38%,
        rgba(90,12,28,0.55) 68%,
        rgba(10,3,5,0.92) 100%
      );
    z-index: 1;
  }

  .al-hero-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    filter: saturate(0.82) brightness(0.88);
    transition: transform 8s ease;
  }
  .al-shell:hover .al-hero-img {
    transform: scale(1.04);
  }

  .al-visual-content {
    position: relative;
    z-index: 2;
    padding: 3rem 3.2rem 3.6rem;
    animation: alFadeUp 0.9s ease 0.1s both;
  }

  .al-logo-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2.8rem;
  }
  .al-logo {
    width: 54px;
    height: 54px;
    object-fit: contain;
    filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4));
  }
  .al-logo-text {
    font-family: 'Cinzel', serif;
    font-size: 0.72rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.75);
    line-height: 1.6;
  }
  .al-logo-text strong {
    display: block;
    color: #e8b84b;
    font-weight: 500;
    font-size: 0.65rem;
    letter-spacing: 0.28em;
  }

  .al-eyebrow {
    font-family: 'Cinzel', serif;
    font-size: 0.6rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: #c9973a;
    margin-bottom: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
  .al-eyebrow::before {
    content: '';
    display: inline-block;
    width: 28px;
    height: 1.5px;
    background: #c9973a;
  }

  .al-visual-heading {
    font-size: clamp(1.8rem, 2.8vw, 2.9rem);
    font-weight: 300;
    color: #fff;
    line-height: 1.22;
    max-width: 420px;
    margin-bottom: 1.2rem;
    font-style: italic;
  }
  .al-visual-heading em {
    font-style: normal;
    color: #e8b84b;
  }

  .al-visual-sub {
    font-size: 0.88rem;
    color: rgba(255,255,255,0.62);
    line-height: 1.8;
    max-width: 380px;
    margin-bottom: 2.4rem;
  }

  /* Thumb strip */
  .al-thumb-strip {
    display: flex;
    gap: 0.75rem;
  }
  .al-thumb-strip img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    object-position: top;
    border-radius: 3px;
    border: 1.5px solid rgba(201,151,58,0.35);
    filter: saturate(0.7) brightness(0.85);
    transition: filter 0.3s ease, transform 0.3s ease;
  }
  .al-thumb-strip img:hover {
    filter: saturate(1) brightness(1);
    transform: translateY(-3px);
  }

  /* Vertical ornament line */
  .al-visual-line {
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba(201,151,58,0.25) 30%, rgba(201,151,58,0.25) 70%, transparent);
    z-index: 3;
  }

  /* ── RIGHT LOGIN PANEL ── */
  .al-card {
    flex: 0 0 460px;
    background: #fdf6ee;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem 3.6rem;
    position: relative;
    overflow: hidden;
    animation: alSlideIn 0.7s cubic-bezier(0.25,0.46,0.45,0.94) 0.2s both;
  }

  /* Subtle pattern overlay */
  .al-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 92% 8%, rgba(201,151,58,0.08) 0%, transparent 50%),
      radial-gradient(circle at 8% 92%, rgba(139,26,43,0.06) 0%, transparent 50%);
    pointer-events: none;
  }

  /* Diamond corner ornaments */
  .al-card::after {
    content: '';
    position: absolute;
    top: 28px;
    right: 28px;
    width: 10px;
    height: 10px;
    background: #c9973a;
    transform: rotate(45deg);
    opacity: 0.5;
  }

  .al-card-inner {
    position: relative;
    z-index: 1;
    max-width: 340px;
    margin: 0 auto;
    width: 100%;
  }

  .al-card-eyebrow {
    font-family: 'Cinzel', serif;
    font-size: 0.58rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #c9973a;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    margin-bottom: 0.6rem;
  }
  .al-card-eyebrow::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(201,151,58,0.4);
  }

  .al-card-heading {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.9rem, 2.8vw, 2.5rem);
    font-weight: 400;
    color: #6b1020;
    line-height: 1.1;
    margin-bottom: 0.6rem;
    letter-spacing: 0.04em;
  }

  .al-card-sub {
    font-size: 0.88rem;
    color: #7a5547;
    line-height: 1.75;
    margin-bottom: 2.4rem;
  }

  /* Divider */
  .al-divider {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 2rem;
  }
  .al-divider::before,
  .al-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(201,151,58,0.35);
  }
  .al-divider-diamond {
    width: 8px;
    height: 8px;
    background: #8b1a2b;
    transform: rotate(45deg);
    flex-shrink: 0;
    opacity: 0.6;
  }

  /* Form fields */
  .al-form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .al-field {
    display: flex;
    flex-direction: column;
    gap: 0.42rem;
  }

  .al-field-label {
    font-family: 'Cinzel', serif;
    font-size: 0.58rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #8b1a2b;
    font-weight: 500;
  }

  .al-field-wrap {
    position: relative;
  }

  .al-field-icon {
    position: absolute;
    left: 0.9rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(139,26,43,0.4);
    pointer-events: none;
    width: 16px;
    height: 16px;
  }

  .al-input {
    width: 100%;
    padding: 0.72rem 1rem 0.72rem 2.5rem;
    border: 1.5px solid rgba(201,151,58,0.3);
    background: #fff;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem;
    color: #2c1810;
    outline: none;
    border-radius: 3px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
    letter-spacing: 0.02em;
  }
  .al-input:focus {
    border-color: #c9973a;
    box-shadow: 0 0 0 3px rgba(201,151,58,0.12), 0 2px 8px rgba(139,26,43,0.08);
    background: #fffdf9;
  }
  .al-input::placeholder {
    color: #b38c59;
    font-style: italic;
    font-size: 0.92rem;
  }

  /* Error message */
  .al-error {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 0.9rem;
    background: rgba(139,26,43,0.06);
    border: 1px solid rgba(139,26,43,0.18);
    border-radius: 3px;
    font-size: 0.82rem;
    color: #8b1a2b;
    line-height: 1.5;
    margin-top: 0.3rem;
  }
  .al-error::before {
    content: '⚠';
    font-size: 0.75rem;
    flex-shrink: 0;
  }

  /* Submit button */
  .al-submit {
    margin-top: 0.6rem;
    padding: 0.88rem 2rem;
    background: #8b1a2b;
    color: #fff;
    font-family: 'Cinzel', serif;
    font-size: 0.72rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .al-submit::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%);
    pointer-events: none;
  }
  .al-submit:hover:not(:disabled) {
    background: #a8213a;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139,26,43,0.3);
  }
  .al-submit:active:not(:disabled) {
    transform: translateY(0);
  }
  .al-submit:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  /* Loading spinner inside button */
  .al-submit-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
  }
  .al-spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: alSpin 0.7s linear infinite;
  }

  /* Bottom link */
  .al-back-link {
    text-align: center;
    margin-top: 1.8rem;
    font-size: 0.8rem;
    color: #9c7b6e;
  }
  .al-back-link a {
    color: #8b1a2b;
    text-decoration: none;
    border-bottom: 1px solid rgba(139,26,43,0.3);
    transition: border-color 0.2s ease, color 0.2s ease;
  }
  .al-back-link a:hover {
    color: #c9973a;
    border-color: #c9973a;
  }

  /* Animations */
  @keyframes alFadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes alSlideIn {
    from { opacity: 0; transform: translateX(32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes alSpin {
    to { transform: rotate(360deg); }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .al-shell { flex-direction: column; }
    .al-visual {
      flex: 0 0 42vh;
      min-height: 42vh;
    }
    .al-visual-line { display: none; }
    .al-visual-content { padding: 2rem 2rem 2.4rem; }
    .al-visual-heading { font-size: 1.65rem; }
    .al-thumb-strip { display: none; }
    .al-card {
      flex: unset;
      padding: 2.8rem 2rem;
    }
  }

  @media (max-width: 480px) {
    .al-visual { flex: 0 0 36vh; min-height: 36vh; }
    .al-visual-content { padding: 1.4rem 1.4rem 2rem; }
    .al-card { padding: 2rem 1.4rem 2.4rem; }
    .al-card-heading { font-size: 2rem; }
  }
`

export default function AdminLogin() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [status, setStatus] = useState({ loading: false, error: '' })
  const [showPass, setShowPass] = useState(false)

  if (getAuthToken()) {
    return <Navigate to="/admin" replace />
  }

  const handleChange = ({ target }) => {
    const { name, value } = target
    setCredentials((c) => ({ ...c, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ loading: true, error: '' })
    try {
      const response = await apiFetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })
      setAuthToken(response.token)
      navigate('/admin', { replace: true })
    } catch (error) {
      setStatus({ loading: false, error: error.message || 'Login failed. Please check your credentials.' })
    }
  }

  return (
    <>
      <style>{styles}</style>
      <section className="al-shell">

        {/* ── LEFT VISUAL ── */}
        <div className="al-visual">
          <img src={siteAssets.hero} alt="Shanthala performance" className="al-hero-img" />
          <div className="al-visual-bg" />
          <div className="al-visual-line" />

          <div className="al-visual-content">
            <div className="al-logo-row">
              <img src={siteAssets.logo} alt="Logo" className="al-logo" />
              <div className="al-logo-text">
                Shanthala Nritya Angala
                <strong>Bharatanatyam</strong>
              </div>
            </div>

            <p className="al-eyebrow">Admin Access</p>
            <h1 className="al-visual-heading">
              Steward the school with the same grace as <em>the stage.</em>
            </h1>
            <p className="al-visual-sub">
              Review website enquiries, curate the gallery, and keep the public
              presence of Shanthala Nritya Angala beautifully up to date.
            </p>

            <div className="al-thumb-strip">
              <img src={siteAssets.guruPortrait} alt="Guru portrait" />
              <img src={siteAssets.groupStage} alt="Group stage performance" />
            </div>
          </div>
        </div>

        {/* ── RIGHT CARD ── */}
        <div className="al-card">
          <div className="al-card-inner">
            <p className="al-card-eyebrow">Shanthala Admin</p>
            <h2 className="al-card-heading">Sign In</h2>
            <p className="al-card-sub">
              Use your admin credentials to review enquiries and manage the gallery.
            </p>

            <div className="al-divider"><div className="al-divider-diamond" /></div>

            <form className="al-form" onSubmit={handleSubmit}>
              {/* Username */}
              <div className="al-field">
                <span className="al-field-label">Username</span>
                <div className="al-field-wrap">
                  <svg className="al-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                  <input
                    className="al-input"
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="al-field">
                <span className="al-field-label">Password</span>
                <div className="al-field-wrap" style={{ position: 'relative' }}>
                  <svg className="al-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    className="al-input"
                    type={showPass ? 'text' : 'password'}
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    required
                    style={{ paddingRight: '2.8rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    style={{
                      position: 'absolute', right: '0.85rem', top: '50%',
                      transform: 'translateY(-50%)', background: 'none', border: 'none',
                      cursor: 'pointer', color: 'rgba(139,26,43,0.4)', padding: 0,
                      display: 'flex', alignItems: 'center',
                    }}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                  >
                    {showPass ? (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {status.error && <p className="al-error">{status.error}</p>}

              <button className="al-submit" type="submit" disabled={status.loading}>
                <span className="al-submit-inner">
                  {status.loading && <span className="al-spinner" />}
                  {status.loading ? 'Signing in…' : 'Enter Dashboard'}
                </span>
              </button>
            </form>

            <p className="al-back-link">
              ← <a href="/">Return to public site</a>
            </p>
          </div>
        </div>

      </section>
    </>
  )
}