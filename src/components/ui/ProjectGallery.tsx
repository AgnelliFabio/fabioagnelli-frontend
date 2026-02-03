'use client'

import { useState } from 'react'
import Image from 'next/image'
import { GalerieImage } from '@/types/wordpress'

interface ProjectGalleryProps {
  images: GalerieImage[]
  projectTitle: string
}

// Helper pour récupérer l'URL de l'image de manière sécurisée
function getImageUrl(image: GalerieImage, size: 'full' | 'large' | 'medium' | 'thumbnail' = 'large'): string | null {
  if (!image?.metadata) return null

  // Essayer la taille demandée, puis fallback vers full
  const sizeData = image.metadata[size] || image.metadata.full
  return sizeData?.file_url || null
}

// Helper pour récupérer les dimensions
function getImageDimensions(image: GalerieImage): { width: number; height: number } {
  if (!image?.metadata?.full) return { width: 600, height: 400 }
  return {
    width: image.metadata.full.width || 600,
    height: image.metadata.full.height || 400
  }
}

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Filtrer les images valides (qui ont au moins une URL)
  const validImages = images?.filter(img => getImageUrl(img, 'full')) || []

  if (validImages.length === 0) {
    return (
      <div className="glass-card p-3 rounded-2xl">
        <div className="bg-white/10 rounded-xl p-12 flex items-center justify-center min-h-[300px]">
          <span className="text-blue-300">Aperçu non disponible</span>
        </div>
      </div>
    )
  }

  const currentImage = validImages[currentIndex]
  const totalImages = validImages.length
  const mainImageUrl = getImageUrl(currentImage, 'large') || getImageUrl(currentImage, 'full')!
  const fullImageUrl = getImageUrl(currentImage, 'full')!
  const dimensions = getImageDimensions(currentImage)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1))
  }

  const openLightbox = () => {
    setIsLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    document.body.style.overflow = 'unset'
  }

  return (
    <>
      {/* Galerie principale */}
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-3xl blur-xl"></div>
        <div className="relative glass-card p-3 rounded-2xl">
          {/* Image principale */}
          <div
            className="relative cursor-pointer group"
            onClick={openLightbox}
          >
            <Image
              src={mainImageUrl}
              alt={currentImage.attachment?.post_title || projectTitle}
              width={600}
              height={400}
              className="rounded-xl object-cover w-full"
              priority
            />

            {/* Overlay au hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>

            {/* Compteur d'images */}
            {totalImages > 1 && (
              <div className="absolute bottom-4 right-4 glass-card px-3 py-1.5 rounded-full text-sm">
                {currentIndex + 1} / {totalImages}
              </div>
            )}
          </div>

          {/* Navigation */}
          {totalImages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={goToPrevious}
                className="glass-button-outline p-2 rounded-lg"
                aria-label="Image précédente"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Miniatures */}
              <div className="flex gap-2 px-2">
                {validImages.map((image, index) => {
                  const thumbUrl = getImageUrl(image, 'thumbnail') || getImageUrl(image, 'full')
                  if (!thumbUrl) return null
                  return (
                    <button
                      key={image.attachment?.ID || index}
                      onClick={() => setCurrentIndex(index)}
                      className={`relative flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                        index === currentIndex
                          ? 'ring-2 ring-blue-400 scale-105'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={thumbUrl}
                        alt={image.attachment?.post_title || `Image ${index + 1}`}
                        width={60}
                        height={60}
                        className="object-cover w-[60px] h-[60px]"
                      />
                    </button>
                  )
                })}
              </div>

              <button
                onClick={goToNext}
                className="glass-button-outline p-2 rounded-lg"
                aria-label="Image suivante"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Légende */}
          {currentImage.attachment?.post_excerpt && (
            <p className="text-sm text-blue-300 text-center mt-3">
              {currentImage.attachment.post_excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Bouton fermer */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
            aria-label="Fermer"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation précédent */}
          {totalImages > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 text-white/80 hover:text-white p-2"
              aria-label="Image précédente"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image en plein écran */}
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={fullImageUrl}
              alt={currentImage.attachment?.post_title || projectTitle}
              width={dimensions.width}
              height={dimensions.height}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />

            {/* Légende et compteur */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
              <div className="flex justify-between items-center text-white">
                <span className="text-sm">
                  {currentImage.attachment?.post_excerpt || currentImage.attachment?.post_title || projectTitle}
                </span>
                {totalImages > 1 && (
                  <span className="text-sm opacity-80">
                    {currentIndex + 1} / {totalImages}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Navigation suivant */}
          {totalImages > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 text-white/80 hover:text-white p-2"
              aria-label="Image suivante"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  )
}
