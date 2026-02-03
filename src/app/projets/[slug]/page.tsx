import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/ui/Header'
import { Badge } from '@/components/ui/Badge'
import { ProjectGallery } from '@/components/ui/ProjectGallery'
import { Projet } from '@/types/wordpress'

// Mapping des types de projet vers les labels affichés
const typeProjetLabels: Record<string, string> = {
  vitrine: 'Site Vitrine',
  ecommerce: 'Site E-commerce',
  application: 'Application Web',
  portfolio: 'Portfolio',
}

async function getProjet(slug: string): Promise<Projet | null> {
  const res = await fetch(
    `https://admin.fabioagnelli.fr/wp-json/wp/v2/projet?slug=${slug}`,
    { next: { revalidate: 60 } }
  )

  if (!res.ok) {
    return null
  }

  const projets = await res.json()
  return projets[0] || null
}

export default async function ProjetPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const projet = await getProjet(slug)

  if (!projet) {
    notFound()
  }

  const { acf, title } = projet

  // Récupérer les noms des ressources
  const ressourcesPrincipales = acf.ressources_principales?.map(r => r.post_title) || []
  const ressourcesSecondaires = acf.ressources_secondaires?.map(r => r.post_title) || []

  return (
    <div className="min-h-screen text-white relative overflow-hidden font-jura">
      <Header />

      {/* Hero Section du projet */}
      <section className="section-gradient-hero pt-32 pb-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link href="/#projets" className="text-blue-300 hover:text-white transition-colors">
              Projets
            </Link>
            <span className="mx-3 text-blue-400">/</span>
            <span className="text-white" dangerouslySetInnerHTML={{ __html: title.rendered }} />
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Infos principales */}
            <div className="space-y-6">
              <Badge className="bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {typeProjetLabels[acf.type_projet] || acf.type_projet}
              </Badge>

              <h1
                className="text-4xl md:text-5xl font-bold tracking-wide"
                dangerouslySetInnerHTML={{ __html: title.rendered }}
              />

              <p className="text-xl text-blue-200 leading-relaxed">
                {acf.description_courte}
              </p>

              {/* Métadonnées */}
              <div className="glass-card p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-300">Client</span>
                  <span className="font-medium">{acf.client}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-300">Date</span>
                  <span className="font-medium">{acf.date_realisation}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-300">Durée</span>
                  <span className="font-medium">{acf.duree_projet}</span>
                </div>
              </div>

              {/* Liens externes */}
              <div className="flex flex-wrap gap-4">
                {acf.lien_site && (
                  <a
                    href={acf.lien_site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button px-6 py-3 rounded-xl inline-flex items-center gap-2"
                  >
                    Visiter le site
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                {acf.lien_github && (
                  <a
                    href={acf.lien_github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button-outline px-6 py-3 rounded-xl inline-flex items-center gap-2"
                  >
                    Code source
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                )}
                {acf.lien_figma && (
                  <a
                    href={acf.lien_figma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button-outline px-6 py-3 rounded-xl inline-flex items-center gap-2"
                  >
                    Maquettes Figma
                  </a>
                )}
              </div>
            </div>

            {/* Galerie d'images */}
            <ProjectGallery
              images={acf.galerie_images}
              projectTitle={title.rendered}
            />
          </div>
        </div>
      </section>

      {/* Section Contexte */}
      <section className="section-gradient-about py-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="glass-section p-8 md:p-12 rounded-3xl">
            <h2 className="text-3xl font-bold mb-6 tracking-wide">Contexte</h2>
            <p className="text-lg text-blue-200 leading-relaxed">
              {acf.contexte}
            </p>
          </div>
        </div>
      </section>

      {/* Section Problématique / Solution / Résultats */}
      <section className="section-gradient-parcours py-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Problématique */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Problématique</h3>
              <div
                className="text-blue-200 leading-relaxed prose prose-invert prose-p:text-blue-200"
                dangerouslySetInnerHTML={{ __html: acf.problematique }}
              />
            </div>

            {/* Solution */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Solution apportée</h3>
              <div
                className="text-blue-200 leading-relaxed prose prose-invert prose-p:text-blue-200"
                dangerouslySetInnerHTML={{ __html: acf.solution_apportee }}
              />
            </div>

            {/* Résultats */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Résultats et impact</h3>
              <div
                className="text-blue-200 leading-relaxed prose prose-invert prose-p:text-blue-200"
                dangerouslySetInnerHTML={{ __html: acf.resultats_impact }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Technologies */}
      <section className="section-gradient-projets py-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 tracking-wide text-center">
            Technologies utilisées
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Ressources principales */}
            {ressourcesPrincipales.length > 0 && (
              <div className="glass-section p-8 rounded-3xl">
                <h3 className="text-xl font-bold mb-6 text-blue-300">Ressources principales</h3>
                <div className="flex flex-wrap gap-3">
                  {ressourcesPrincipales.map((ressource, index) => (
                    <Badge
                      key={index}
                      className="bg-blue-500/20 text-blue-300 border border-blue-400/30 px-4 py-2 text-base"
                    >
                      {ressource}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Ressources secondaires */}
            {ressourcesSecondaires.length > 0 && (
              <div className="glass-section p-8 rounded-3xl">
                <h3 className="text-xl font-bold mb-6 text-purple-300">Ressources secondaires</h3>
                <div className="flex flex-wrap gap-3">
                  {ressourcesSecondaires.map((ressource, index) => (
                    <Badge
                      key={index}
                      className="bg-purple-500/20 text-purple-300 border border-purple-400/30 px-4 py-2 text-base"
                    >
                      {ressource}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="section-gradient-contact py-20 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="glass-section p-8 md:p-12 rounded-3xl">
            <h2 className="text-3xl font-bold mb-6 tracking-wide">
              Un projet similaire ?
            </h2>
            <p className="text-xl text-blue-200 mb-8">
              Discutons de vos besoins et transformons vos idées en réalité digitale
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact" className="glass-button px-8 py-4 text-lg rounded-xl">
                Me contacter
              </Link>
              <Link href="/#projets" className="glass-button-outline px-8 py-4 text-lg rounded-xl">
                Voir d&apos;autres projets
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
