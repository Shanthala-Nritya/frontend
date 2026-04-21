import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { apiFetch } from '../lib/api'
import { siteAssets } from '../siteAssets'
import '../css/pages/Contact.css'

export default function Contact() {
  useScrollReveal()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitState, setSubmitState] = useState({
    loading: false,
    error: '',
    success: '',
  })

  const handleChange = ({ target }) => {
    const { name, value } = target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitState({ loading: true, error: '', success: '' })

    try {
      await apiFetch('/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      })
      setSubmitState({
        loading: false,
        error: '',
        success: 'Your enquiry has been sent successfully.',
      })
    } catch (error) {
      setSubmitState({
        loading: false,
        error: error.message || 'Unable to submit your enquiry right now.',
        success: '',
      })
    }
  }

  return (
    <div className="page-enter">
      <section className="contact-section contact-page-section">
        <img className="page-bg-design page-bg-design--contact-left" src={siteAssets.backgroundDesign} alt="" aria-hidden="true" />
        <img className="page-bg-design page-bg-design--contact-center" src={siteAssets.backgroundDesign} alt="" aria-hidden="true" />
        <img className="page-bg-design page-bg-design--contact-right" src={siteAssets.backgroundDesign} alt="" aria-hidden="true" />
        <div className="container">
          <form className="contact-card reveal" onSubmit={handleSubmit}>
            <h2>Contact Us</h2>
            <div className="form-row">
              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-stack">
              <input
                className="form-input form-input-phone"
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
              <textarea
                className="form-input form-input-message"
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            {submitState.error ? <p className="form-feedback form-feedback--error">{submitState.error}</p> : null}
            {submitState.success ? <p className="form-feedback form-feedback--success">{submitState.success}</p> : null}
            <div className="form-submit">
              <button className="btn-primary" type="submit" disabled={submitState.loading}>
                {submitState.loading ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </form>

          <div className="contact-info-grid">
            {[
              { icon: 'EM', label: 'Email', value: 'info@shanthaladance.in' },
              { icon: 'PH', label: 'Phone', value: '+91 99867 30111', valueClassName: 'phone-number-text' },
              { icon: 'AD', label: 'Address', value: '25, 8th Main Rd, 10th Cross, 2nd Block, Jayanagar, Bengaluru 560011' },
            ].map((item, i) => (
              <div key={i} className="contact-info-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="contact-info-icon">{item.icon}</div>
                <h4>{item.label}</h4>
                <p className={item.valueClassName}>{item.value}</p>
              </div>
            ))}
          </div>

          <div className="contact-map-card reveal">
            <div className="contact-map-copy">
              <span className="section-tag">Find Us</span>
              <h3>Visit Shanthala Nritya Angala</h3>
              <p>25, 8th Main Rd, 10th Cross, 2nd Block, Jayanagar, Bengaluru 560011</p>
              <a
                className="contact-map-link"
                href="https://www.google.com/maps/search/?api=1&query=25%2C%208th%20Main%20Rd%2C%2010th%20Cross%2C%202nd%20Block%2C%20Jayanagar%2C%20Bengaluru%20560011"
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps
              </a>
            </div>
            <div className="contact-map-frame">
              <iframe
                title="Shanthala Nritya Angala location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9590.076787107899!2d77.58397805607662!3d12.93913397734989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15b0eeb9a029%3A0xa71e13c5e42b7f84!2sShanthala%20Nritya%20Angala!5e1!3m2!1sen!2sin!4v1776758734189!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
