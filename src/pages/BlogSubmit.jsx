import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiFetch } from '../lib/api'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { siteAssets } from '../siteAssets'
import './Blog.css'

const initialForm = {
  title: '',
  authorName: '',
  authorEmail: '',
  excerpt: '',
  content: '',
  thumbnail: null,
}

export default function BlogSubmit() {
  useScrollReveal()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialForm)
  const [submitState, setSubmitState] = useState({ loading: false, error: '', success: '' })
  const previewUrl = useMemo(() => {
    if (!formData.thumbnail) return ''
    return URL.createObjectURL(formData.thumbnail)
  }, [formData.thumbnail])

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
  }, [previewUrl])

  const handleChange = ({ target }) => {
    const { name, value, files } = target
    setFormData((current) => ({
      ...current,
      [name]: files ? files[0] || null : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitState({ loading: true, error: '', success: '' })

    if (!formData.thumbnail) {
      setSubmitState({ loading: false, error: 'Please choose a thumbnail image for the blog.', success: '' })
      return
    }

    try {
      const payload = new FormData()
      payload.append('title', formData.title)
      payload.append('authorName', formData.authorName)
      payload.append('authorEmail', formData.authorEmail)
      payload.append('excerpt', formData.excerpt)
      payload.append('content', formData.content)
      payload.append('thumbnail', formData.thumbnail)

      await apiFetch('/api/blogs', {
        method: 'POST',
        body: payload,
      })

      setFormData(initialForm)
      setSubmitState({
        loading: false,
        error: '',
        success: 'Your blog has been submitted successfully and is now live on the blog page.',
      })

      setTimeout(() => {
        navigate('/blog')
      }, 1200)
    } catch (error) {
      setSubmitState({
        loading: false,
        error: error.message || 'Unable to submit your blog right now.',
        success: '',
      })
    }
  }

  return (
    <div className="page-enter">
      <section className="blog-submit-page">
        <img className="page-bg-design page-bg-design--blog-submit-left" src={siteAssets.backgroundDesign} alt="" aria-hidden="true" />
        <img className="page-bg-design page-bg-design--blog-submit-right" src={siteAssets.backgroundDesign} alt="" aria-hidden="true" />
        <div className="container">
          <div className="blog-submit-layout reveal">
            <div className="blog-submit-intro">
              <span className="section-tag">Write For Shanthala</span>
              <h1 className="cp-heading blog-submit-heading">Share a meaningful story from your dance journey.</h1>
              <p>
                You can submit performance notes, student experiences, reflections on practice, or community updates.
                Add a beautiful thumbnail image so your article feels complete when it appears on the blog page.
              </p>
              <div className="blog-submit-notes">
                <div>
                  <strong>Best results</strong>
                  <p>Use a short title, a warm excerpt, and clear paragraphs in the main blog content.</p>
                </div>
                <div>
                  <strong>Thumbnail</strong>
                  <p>Upload a landscape image for the card preview, just like the gallery upload flow.</p>
                </div>
              </div>
              <Link to="/blog" className="btn-outline blog-submit-back">Back to Blog Page</Link>
            </div>

            <form className="blog-submit-card" onSubmit={handleSubmit}>
              <div className="blog-form-grid">
                <label className="blog-form-field">
                  <span>Blog Title</span>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter your blog title" required />
                </label>
                <label className="blog-form-field">
                  <span>Your Name</span>
                  <input type="text" name="authorName" value={formData.authorName} onChange={handleChange} placeholder="Enter your name" required />
                </label>
                <label className="blog-form-field">
                  <span>Email Address</span>
                  <input type="email" name="authorEmail" value={formData.authorEmail} onChange={handleChange} placeholder="Enter your email" required />
                </label>
                <label className="blog-form-field">
                  <span>Thumbnail Image</span>
                  <input type="file" name="thumbnail" accept="image/*" onChange={handleChange} required />
                </label>
              </div>

              <label className="blog-form-field">
                <span>Short Excerpt</span>
                <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} placeholder="Write a short summary that invites readers in" required />
              </label>

              <label className="blog-form-field">
                <span>Blog Content</span>
                <textarea
                  className="blog-form-textarea-lg"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write your full blog here..."
                  required
                />
              </label>

              {previewUrl ? (
                <div className="blog-thumbnail-preview">
                  <p>Thumbnail Preview</p>
                  <img src={previewUrl} alt="Selected blog thumbnail preview" />
                </div>
              ) : null}

              {submitState.error ? <p className="form-feedback form-feedback--error">{submitState.error}</p> : null}
              {submitState.success ? <p className="form-feedback form-feedback--success">{submitState.success}</p> : null}

              <button className="btn-primary blog-submit-button" type="submit" disabled={submitState.loading}>
                {submitState.loading ? 'Submitting...' : 'Submit Blog'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
