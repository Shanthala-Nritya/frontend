import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12 }
    )

    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    els.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  })
}
