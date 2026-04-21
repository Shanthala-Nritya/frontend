import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../lib/api'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { siteAssets } from '../siteAssets'
import '../css/pages/Blog.css'

function BlogCardIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 4.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6A1.5 1.5 0 0 1 7.5 4.5Z" />
      <path d="M14 4.5V9h4M9 12h6M9 15h6" />
    </svg>
  )
}

function PencilIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 20h9" />
      <path d="m16.5 3.5 4 4L7 21l-4 1 1-4 12.5-14.5Z" />
    </svg>
  )
}

export default function Blog() {
  useScrollReveal()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [visibleCount, setVisibleCount] = useState(6)

  useEffect(() => {
    let ignore = false
    async function loadBlogs() {
      try {
        const data = await apiFetch('/api/blogs')
        if (!ignore) { setBlogs(Array.isArray(data) ? data : []); setError('') }
      } catch (err) {
        if (!ignore) { setBlogs([]); setError(err.message || 'Unable to load blogs right now.') }
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    loadBlogs()
    return () => { ignore = true }
  }, [])

  const visibleBlogs = blogs.slice(0, visibleCount)

  return (
    <div className="page-enter">
      <section className="blog-page">
        <img className="page-bg-design page-bg-design--blog-left" src={siteAssets.backgroundDesign} alt="" aria-hidden="true" />
        <img className="page-bg-design page-bg-design--blog-center" src={siteAssets.backgroundDesign} alt="" aria-hidden="true" />
        <img className="page-bg-design page-bg-design--blog-right" src={siteAssets.backgroundDesign} alt="" aria-hidden="true" />
        <div className="container">

          <header className="blog-catalog-header reveal">
            {/* <span className="blog-catalog-label">Community Blog</span> */}
            <h1 className="blog-catalog-title">
              Discover inspiring <span>Stories</span>
            </h1>
            <p className="blog-catalog-subtitle">
              Read reflections, milestones, student experiences, and dance memories shared by our community.
            </p>
          </header>

          {/* <div className="section-ornament blog-section-ornament reveal" aria-hidden="true">
            <span></span>
            <img src={siteAssets.design} alt="" />
            <span></span>
          </div> */}

          {loading && <p className="blog-status">Loading blogs...</p>}
          {error && <p className="blog-status blog-status--error">{error}</p>}

          {!loading && !error && blogs.length === 0 && (
            <div className="blog-empty reveal">
              <h2>No blogs published yet</h2>
              <p>The first story can begin here. Share an article with the community and it will appear on this page.</p>
              <Link className="blog-btn-primary" to="/blog/submit">Submit a blog</Link>
            </div>
          )}

          {!loading && !error && blogs.length > 0 && (
            <>
              <div className="blog-catalog-grid">
                {visibleBlogs.map((blog, index) => (
                  <Link
                    className="blog-catalog-link reveal"
                    key={blog._id || blog.title || index}
                    style={{ transitionDelay: `${index * 0.07}s` }}
                    to={`/blog/${blog._id}`}
                  >
                    <article className="blog-catalog-card">
                      <div className="blog-catalog-media">
                        <img className="blog-catalog-thumb" src={blog.thumbnailUrl} alt={blog.thumbnailAlt || blog.title} />
                        {/* <span className="blog-catalog-badge">Featured</span> */}
                      </div>
                      <div className="blog-catalog-body">
                        <div className="blog-catalog-meta">
                          <span className="blog-catalog-chip">
                            <span className="blog-catalog-chip-icon"><BlogCardIcon /></span>
                            Blog
                          </span>
                          <span className="blog-catalog-author">{blog.author || 'Shanthala Community'}</span>
                        </div>
                        <h3 className="blog-catalog-card-title">{blog.title}</h3>
                        {/* <p className="blog-catalog-excerpt">{blog.excerpt}</p> */}
                        <div className="blog-catalog-footer">
                          <span className="blog-catalog-readmore">Read More</span>
                          <span className="blog-catalog-arrow">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {visibleCount < blogs.length && (
                <div className="blog-view-more">
                  <button className="blog-view-more-btn" onClick={() => setVisibleCount((n) => n + 6)}>
                    View more
                  </button>
                </div>
              )}
            </>
          )}
          <div className="section-ornament blog-section-ornament reveal" aria-hidden="true">
            <span></span>
            <img src={siteAssets.design} alt="" />
            <span></span>
          </div>
          {/* Bottom CTA */}
          <section className="blog-cta-box reveal">
            {/* <div className="blog-cta-contact">
              <h2>Can't find what you're looking for?</h2>
              <p>Contact us for personalised recommendations or to learn more about Shanthala Nritya Angala's programs and events.</p>
              <Link className="blog-btn-primary" to="/contact">Contact us</Link>
            </div>

            <div className="blog-cta-divider" /> */}

            <div className="blog-cta-write">
              <div className="blog-cta-write-icon"><PencilIcon /></div>
              <p className="blog-cta-write-label">Write a blog</p>
              <p className="blog-cta-write-text">
                Share your experience, event memory, student journey, or reflection with the Shanthala community.
              </p>
              <div className="blog-cta-write-buttons">
                <Link className="blog-btn-primary" to="/blog/submit">Submit a blog</Link>
                {/* <Link className="blog-btn-outline" to="/blog/guidelines">See guidelines</Link> */}
              </div>
            </div>
          </section>

          

        </div>
      </section>
    </div>
  )
}
