import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Projet, GalerieImage } from '@/types/wordpress'

interface ProjectCardProps {
  projet: Projet
}

// Mapping des types de projet vers les labels affichés
const typeProjetLabels: Record<string, string> = {
  vitrine: 'Site Vitrine',
  ecommerce: 'Site E-commerce',
  application: 'Application Web',
  portfolio: 'Portfolio',
}

// Helper pour récupérer l'URL de l'image de manière sécurisée
function getImageUrl(image: GalerieImage | undefined, size: 'full' | 'large' | 'medium' | 'thumbnail' = 'large'): string | null {
  if (!image?.metadata) return null
  const sizeData = image.metadata[size] || image.metadata.full
  return sizeData?.file_url || null
}

export function ProjectCard({ projet }: ProjectCardProps) {
  const { acf, title } = projet

  // Récupérer les noms des ressources principales
  const ressourcesPrincipales = acf.ressources_principales?.map(r => r.post_title) || []
  const ressourcesSecondaires = acf.ressources_secondaires?.map(r => r.post_title) || []
  const allRessources = [...ressourcesPrincipales, ...ressourcesSecondaires]

  // Récupérer la première image valide
  const firstImage = acf.galerie_images?.[0]
  const imageUrl = getImageUrl(firstImage, 'large') || getImageUrl(firstImage, 'full')

  return (
    <div className="glass-project-card p-8 rounded-3xl group">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="space-y-4">
            <Badge className="bg-blue-500/20 text-blue-300 border border-blue-400/30">
              {typeProjetLabels[acf.type_projet] || acf.type_projet}
            </Badge>
            <h3 className="text-3xl font-bold" dangerouslySetInnerHTML={{ __html: title.rendered }} />
          </div>

          <p className="text-blue-200 leading-relaxed text-lg">
            {acf.description_courte}
          </p>

          {/* Ressources techniques utilisées */}
          {allRessources.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {allRessources.map((ressource, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-white/10 text-white border border-white/20"
                >
                  {ressource}
                </Badge>
              ))}
            </div>
          )}

          {/* Liens */}
          <div className="flex gap-4">
            <Link
              href={`/projets/${projet.slug}`}
              className="glass-button-outline px-6 py-2 rounded-lg"
            >
              Voir le projet
            </Link>
            {acf.lien_github && (
              <a
                href={acf.lien_github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:bg-white/10 px-6 py-2 rounded-lg transition-colors"
              >
                Code source
              </a>
            )}
          </div>
        </div>

        {/* Image du projet - première image de la galerie */}
        <div className="relative">
          <div className="glass-mockup p-6 rounded-2xl transform group-hover:scale-105 transition-transform duration-300">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={firstImage?.attachment?.post_title || title.rendered}
                width={500}
                height={300}
                className="rounded-lg object-cover w-full"
              />
            ) : (
              <div className="bg-white/10 rounded-lg p-6 space-y-3">
                <div className="h-4 bg-blue-300/50 rounded w-3/4"></div>
                <div className="h-3 bg-blue-200/30 rounded w-1/2"></div>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="h-16 bg-blue-400/30 rounded"></div>
                  <div className="h-16 bg-blue-500/30 rounded"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
