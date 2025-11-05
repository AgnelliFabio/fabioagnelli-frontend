'use client'

import { useEffect, useState } from 'react'

export function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null
  )

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY <= 50) {
        setIsVisible(true)
        if (scrollTimeout) {
          clearTimeout(scrollTimeout)
          setScrollTimeout(null)
        }
      } else {
        setIsVisible(true)

        if (scrollTimeout) {
          clearTimeout(scrollTimeout)
        }

        const timeout = setTimeout(() => {
          setIsVisible(false)
        }, 1000)

        setScrollTimeout(timeout)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [scrollTimeout])

  return (
    <nav
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'
      }`}
    >
      <div className="glass-nav px-4 py-1 rounded-2xl">
        <div className="flex space-x-6 items-center">
          <a href="#about" className="nav-link">
            À propos
          </a>
          <a href="#parcours" className="nav-link">
            Parcours
          </a>
          <a href="#projets" className="nav-link">
            Projets
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}
