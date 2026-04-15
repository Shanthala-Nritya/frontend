import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { siteAssets } from '../siteAssets'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/guru', label: 'About Guru' },
  { to: '/classes', label: 'Classes' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on navigation
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return
    const handleClickOutside = (e) => {
      const menuToggle = document.querySelector('.menu-toggle')
      const navLinks = document.querySelector('.nav-links')
      if (!menuToggle?.contains(e.target) && !navLinks?.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [menuOpen])

  const navClass = `navbar ${scrolled ? 'scrolled' : isHome ? 'hero-nav' : 'scrolled'}`

  return (
    <>
      <nav className={navClass}>
        <NavLink to="/" className="nav-brand">
          <div className="nav-logo">
            <img src={siteAssets.logo} alt="Shanthala Nritya Angala" />
          </div>
          <div className="nav-brand-text">
            <h1>Shanthala Nritya Angala</h1>
            <span>Bharatanatyam</span>
          </div>
        </NavLink>

        {/* Desktop nav */}
        <ul className="nav-links nav-links--desktop">
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile drawer backdrop */}
      <div
        className={`nav-backdrop ${menuOpen ? 'visible' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile / Tablet drawer */}
      <div className={`nav-drawer ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        {/* Drawer header */}
        <div className="nav-drawer-header">
          <NavLink to="/" className="nav-brand nav-drawer-brand" onClick={() => setMenuOpen(false)}>
            <div className="nav-logo">
              <img src={siteAssets.logo} alt="Shanthala Nritya Angala" />
            </div>
            <div className="nav-brand-text">
              <h1>Shanthala Nritya Angala</h1>
              <span>Bharatanatyam</span>
            </div>
          </NavLink>
          <button
            className="nav-drawer-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Gold divider */}
        <div className="nav-drawer-divider" />

        {/* Nav items */}
        <ul className="nav-drawer-links">
          {navItems.map(({ to, label }, i) => (
            <li key={to} style={{ '--i': i }}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => setMenuOpen(false)}
              >
                <span className="nav-drawer-link-num">0{i + 1}</span>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Drawer footer */}
        <div className="nav-drawer-footer">
          <div className="nav-drawer-divider" />
          <p className="nav-drawer-tagline">The Art of Expression Through Dance</p>
        </div>
      </div>
    </>
  )
}
