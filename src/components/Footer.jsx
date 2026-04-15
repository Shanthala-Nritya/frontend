import { Link } from 'react-router-dom'
import { siteAssets } from '../siteAssets'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-header">
              <div className="footer-logo-wrap">
                <img className="footer-logo" src={siteAssets.logo} alt="Shanthala Nritya Angala" />
              </div>
              <h3>Shanthala Nritya<br />Angala</h3>
            </div>
            <p>Rooted in the rich heritage of Bharatanatyam, our dance school aims to impart strong fundamentals while guiding students in both artistic and personal development.</p>
            <div className="footer-socials">
              <a className="social-icon" href="https://www.instagram.com/shanthaladance/" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
                </svg>
              </a>
              <a className="social-icon" href="https://www.facebook.com/shanthalanrityaangala/" aria-label="Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M13.7 20v-6.3h2.2l.4-2.7h-2.6V9.3c0-.8.2-1.3 1.3-1.3h1.4V5.6c-.2 0-1.1-.1-2.1-.1-2.1 0-3.5 1.2-3.5 3.6V11H8.7v2.7h2.1V20h2.9Z" fill="currentColor" />
                </svg>
              </a>
              <a className="social-icon" href="https://youtube.com/@biancaradhakrishna?si=3tQhN5KC7nstf60d" aria-label="YouTube">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3.5" y="6" width="17" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/guru', label: 'About Guru' },
                { to: '/classes', label: 'Classes Offered' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/contact', label: 'Contact Us' },
              ].map(({ to, label }) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact Info</h4>
            <p className="footer-contact-item">info@shanthaladance.in</p>
            <p className="footer-contact-item phone-number-text">+91 99867 30111</p>
            <p className="footer-contact-item">25, 8th Main Rd, 10th Cross,<br />2nd Block, Jayanagar,<br />Bengaluru, Karnataka 560011</p>
            <p className="footer-contact-item">Mon-Fri: 9AM - 8PM</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copyright">
            <span className="footer-copyright-mark">C</span>
            2026 Shanthala Nritya Angala. All rights reserved.
          </span>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
