import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { apiFetch } from '../lib/api'
import { siteAssets } from '../siteAssets'

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
        </div>
      </section>
    </div>
  )
}
