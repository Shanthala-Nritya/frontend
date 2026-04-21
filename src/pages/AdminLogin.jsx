import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { apiFetch, getAuthToken, setAuthToken } from '../lib/api'
import '../css/pages/Admin.css'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [status, setStatus] = useState({ loading: false, error: '' })
  const [showPass, setShowPass] = useState(false)

  if (getAuthToken()) {
    return <Navigate to="/admin" replace />
  }

  const handleChange = ({ target }) => {
    setCredentials((c) => ({ ...c, [target.name]: target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, error: '' })
    const trimmed = {
      username: credentials.username.trim(),
      password: credentials.password.trim(),
    }
    setCredentials(trimmed)
    try {
      const response = await apiFetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trimmed),
      })
      setAuthToken(response.token)
      navigate('/admin', { replace: true })
    } catch (error) {
      setStatus({ loading: false, error: error.message || 'Login failed. Please check your credentials.' })
    }
  }

  return (
    <div
      className="admin-shell admin-shell--login"
      style={{
        display: 'grid',
        placeItems: 'center',
        minHeight: '100vh',
      }}
    >
      <div className="admin-login-card" style={{ width: '100%', maxWidth: '460px' }}>
          <p className="admin-eyebrow">Shanthala Admin</p>
          <h2>Sign in</h2>
          <p className="admin-subtext">Enter your credentials to access the dashboard.</p>

          <form onSubmit={handleSubmit} className="admin-form">
            <label className="admin-field">
              <span>Username</span>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                onBlur={(e) => setCredentials((c) => ({ ...c, username: e.target.value.trim() }))}
                placeholder="Enter username"
                autoComplete="username"
                required
              />
            </label>

            <label className="admin-field">
              <span>Password</span>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  onBlur={(e) => setCredentials((c) => ({ ...c, password: e.target.value.trim() }))}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                  style={{ ...inputStyle, paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  style={toggleButtonStyle}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </label>

            {status.error && <p className="admin-message admin-message--error">{status.error}</p>}

            <button type="submit" disabled={status.loading} className="admin-button" style={submitButtonStyle}>
              {status.loading && <span style={spinnerStyle} />}
              {status.loading ? 'Signing in...' : 'Enter dashboard'}
            </button>
          </form>

          <p className="admin-subtext" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <a href="/" style={{ color: 'var(--crimson)', borderBottom: '1px solid rgba(139, 26, 43, 0.2)' }}>
              Back to public site
            </a>
          </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '0.85rem 1rem',
  fontSize: 'inherit',
  background: '#fff',
  border: '1px solid rgba(201, 151, 58, 0.4)',
  borderRadius: '12px',
  color: 'var(--text-dark)',
  outline: 'none',
}

const toggleButtonStyle = {
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'var(--text-light)',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
}

const submitButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
}

const spinnerStyle = {
  width: '13px',
  height: '13px',
  border: '2px solid rgba(255,255,255,0.3)',
  borderTopColor: '#fff',
  borderRadius: '50%',
  animation: 'spin 0.7s linear infinite',
  display: 'inline-block',
}

