'use client'

import { useState, useEffect } from 'react'

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Vérifier si c'est la première visite
    const hasVisited = localStorage.getItem('portfolio_visited')

    if (!hasVisited) {
      // Petit délai pour que la popup apparaisse après le chargement
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('portfolio_visited', 'true')
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="glass-section p-8 md:p-10 rounded-3xl max-w-lg w-full animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icône construction */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center">
            <svg
              className="w-8 h-8 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>
        </div>

        {/* Titre */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 tracking-wide">
          Portfolio en construction
        </h2>

        {/* Message */}
        <p className="text-blue-200 text-center leading-relaxed mb-6">
          Bienvenue sur mon portfolio ! Ce site est actuellement en cours de
          développement. De nouvelles fonctionnalités ainsi que d&apos;autres
          projets seront ajoutés prochainement.
        </p>

        {/* Liste des features à venir */}
        <div className="glass-card p-4 rounded-xl mb-6">
          <p className="text-sm text-blue-300 mb-3 font-medium">
            Prochainement :
          </p>
          <ul className="text-sm text-blue-200 space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              Plus de projets détaillés
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              Page de contact fonctionnelle
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              Section compétences techniques
            </li>
          </ul>
        </div>

        {/* Bouton */}
        <button
          onClick={handleClose}
          className="glass-button w-full py-3 rounded-xl text-lg font-medium"
        >
          Compris, continuer
        </button>
      </div>
    </div>
  )
}
