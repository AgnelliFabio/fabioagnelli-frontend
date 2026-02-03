import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/ui/Header'
import { Badge } from '@/components/ui/Badge'
import { Projet, GalerieImage } from '@/types/wordpress'

// Mapping des types de projet vers les labels affichés
const typeProjetLabels: Record<string, string> = {
  vitrine: 'Site Vitrine',
  ecommerce: 'Site E-commerce',
  application: 'Application Web',
  portfolio: 'Portfolio',
}

// Helper pour récupérer l'URL de l'image de manière sécurisée
function getImageUrl(
  image: GalerieImage | undefined,
  size: 'full' | 'large' | 'medium' | 'thumbnail' = 'medium'
): string | null {
  if (!image?.metadata) return null
  const sizeData = image.metadata[size] || image.metadata.full
  return sizeData?.file_url || null
}

async function getProjets(): Promise<Projet[]> {
  const res = await fetch(
    'https://admin.fabioagnelli.fr/wp-json/wp/v2/projet?per_page=100',
    { next: { revalidate: 60 } }
  )

  if (!res.ok) {
    return []
  }

  return res.json()
}

export default async function ProjetsPage() {
  const projets = await getProjets()

  return (
    <div className="min-h-screen text-white relative overflow-hidden font-jura">
      <Header />

      {/* Hero Section */}
      <section className="section-gradient-hero pt-32 pb-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-wide">
              MES PROJETS
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Découvrez l&apos;ensemble de mes réalisations, des projets
              professionnels aux expérimentations personnelles.
            </p>
          </div>

          {/* Compteur de projets */}
          <div className="flex justify-center mb-12">
            <div className="glass-card px-6 py-3 rounded-full">
              <span className="text-blue-300">{projets.length}</span>
              <span className="text-white ml-2">
                projet{projets.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Liste des projets */}
      <section className="section-gradient-about py-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          {projets.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projets.map((projet) => {
                const firstImage = projet.acf.galerie_images?.[0]
                const imageUrl =
                  getImageUrl(firstImage, 'medium') ||
                  getImageUrl(firstImage, 'full')

                return (
                  <Link
                    key={projet.id}
                    href={`/projets/${projet.slug}`}
                    className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={projet.title.rendered}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                          <span className="text-blue-300 text-sm">
                            Aperçu non disponible
                          </span>
                        </div>
                      )}

                      {/* Badge type de projet */}
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-black/50 backdrop-blur-sm text-white border-0 text-xs">
                          {typeProjetLabels[projet.acf.type_projet] ||
                            projet.acf.type_projet}
                        </Badge>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-5">
                      <h3
                        className="text-lg font-bold mb-2 group-hover:text-blue-300 transition-colors"
                        dangerouslySetInnerHTML={{
                          __html: projet.title.rendered,
                        }}
                      />

                      <p className="text-blue-200 text-sm line-clamp-2 mb-4">
                        {projet.acf.description_courte}
                      </p>

                      {/* Métadonnées */}
                      <div className="flex items-center justify-between text-xs text-blue-300">
                        <span>{projet.acf.client}</span>
                        <span>{projet.acf.date_realisation}</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="glass-section p-12 rounded-3xl text-center">
              <p className="text-xl text-blue-200">
                Aucun projet disponible pour le moment.
              </p>
              <p className="text-blue-300 mt-2">
                Revenez bientôt pour découvrir mes réalisations !
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-gradient-contact py-20 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="glass-section p-8 md:p-12 rounded-3xl">
            <h2 className="text-3xl font-bold mb-6 tracking-wide">
              Un projet en tête ?
            </h2>
            <p className="text-xl text-blue-200 mb-8">
              Discutons de vos besoins et donnons vie à vos idées
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/#contact"
                className="glass-button px-8 py-4 text-lg rounded-xl"
              >
                Me contacter
              </Link>
              <Link
                href="/"
                className="glass-button-outline px-8 py-4 text-lg rounded-xl"
              >
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
