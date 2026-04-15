import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiFetch } from '../lib/api'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { siteAssets } from '../siteAssets'
import './Blog.css'

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M8 3.5v3" />
      <path d="M16 3.5v3" />
      <path d="M3.5 9.5h17" />
    </svg>
  )
}

function ReadTimeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5l3 2" />
    </svg>
  )
}

function AuthorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
    </svg>
  )
}

function formatDate(value) {
  if (!value) return ''
  try {
    return new Date(value).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

function getReadTime(content) {
  const words = String(content || '').trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 180))} min read`
}

export default function BlogDetail() {
  useScrollReveal()
  const { blogId } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadBlog() {
      try {
        const data = await apiFetch(`/api/blogs/${blogId}`)
        if (ignore) return
        setBlog(data)
        setError('')
      } catch (fetchError) {
        if (ignore) return
        setBlog(null)
        setError(fetchError.message || 'Unable to load this blog right now.')
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadBlog()

    return () => {
      ignore = true
    }
  }, [blogId])

  return (
    <div className="page-enter">
      <section className="blog-page blog-detail-page">
        <img className="page-bg-design page-bg-design--blog-left" src={siteAssets.backgroundDesign} alt="" aria-hidden="true" />
        <img className="page-bg-design page-bg-design--blog-right" src={siteAssets.backgroundDesign} alt="" aria-hidden="true" />
        <div className="container">
          <div className="blog-detail-shell reveal">
            <Link className="btn-outline blog-detail-back" to="/blog">Back to Blog</Link>

            {loading ? <p className="blog-status">Loading blog...</p> : null}
            {error ? <p className="blog-status blog-status--error">{error}</p> : null}

            {!loading && !error && blog ? (
              <article className="blog-detail-card">
                <div className="blog-detail-media">
                  <img src={blog.thumbnailUrl} alt={blog.thumbnailAlt || blog.title} />
                </div>

                <div className="blog-detail-content">
                  <div className="blog-meta">
                    <span>
                      <span className="blog-meta-icon"><CalendarIcon /></span>
                      {formatDate(blog.createdAt)}
                    </span>
                    <span>
                      <span className="blog-meta-icon"><ReadTimeIcon /></span>
                      {getReadTime(blog.content)}
                    </span>
                  </div>
                  <h1 className="blog-detail-title">{blog.title}</h1>
                  <p className="blog-detail-author">
                    <span className="blog-detail-author-icon"><AuthorIcon /></span>
                    <span>{blog.authorName}</span>
                  </p>
                  <p className="blog-detail-excerpt">{blog.excerpt}</p>

                  <div className="blog-rich-text blog-detail-body">
                    {String(blog.content || '').split(/\n+/).filter(Boolean).map((paragraph, index) => (
                      <p key={`${blog._id || blog.title}-detail-${index}`}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </article>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}
