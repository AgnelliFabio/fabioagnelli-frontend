// src/app/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/ui/Header'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { WelcomePopup } from '@/components/ui/WelcomePopup'
import { Projet } from '@/types/wordpress'

async function getProjets(): Promise<Projet[]> {
  const res = await fetch('https://admin.fabioagnelli.fr/wp-json/wp/v2/projet', {
    next: { revalidate: 60 } // Revalidate toutes les 60 secondes
  })

  if (!res.ok) {
    return []
  }

  return res.json()
}

export default async function HomePage() {
  const projets = await getProjets()
  return (
    <div className="min-h-screen text-white relative overflow-hidden font-jura">
      {/* Popup de bienvenue (première visite uniquement) */}
      <WelcomePopup />

      {/* Navigation avec glassmorphism et auto-hide */}
      <Header />

      {/* Section Hero avec gradient */}
      <section className="section-gradient-hero min-h-screen flex items-center justify-center relative">
        <div className="text-center space-y-8 z-10">
          <h1 className="text-6xl md:text-8xl font-bold tracking-wider">
            FABIO AGNELLI
          </h1>

          <div className="glass-card px-8 py-4 rounded-2xl inline-block">
            <p className="text-xl md:text-2xl font-light tracking-wide">
              DÉVELOPPEUR ET INTÉGRATEUR WEB
            </p>
            <p className="text-lg md:text-xl text-blue-200 mt-2">JUNIOR</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            <Link
              href="/contact"
              className="glass-button px-8 py-4 text-lg rounded-xl"
            >
              Me contacter
            </Link>
            <Link
              href="/projets"
              className="glass-button-outline px-8 py-4 text-lg rounded-xl"
            >
              Voir plus de réalisations
            </Link>
          </div>
        </div>
      </section>

      {/* Section À propos avec gradient différent */}
      <section id="about" className="section-gradient-about py-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-wide">
              À PROPOS
            </h2>
          </div>

          <div className="glass-section p-8 md:p-12 rounded-3xl">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              {/* Texte à gauche - 66% */}
              <div className="w-full md:w-2/3">
                <p className="text-lg md:text-xl leading-relaxed text-left">
                  Développeur et intégrateur web débutant, je combine créativité et expertise
                  pour donner vie à vos projets digitaux. Avec un profil accès sur la polyvalence 
                  suite à ma formation BUT MMI, où j'ai découvert tout les aspects de la production digitale,
                  j&apos;accompagne entreprises et particuliers
                  dans leur transformation numérique.
                </p>
              </div>

              {/* Photo à droite - 33% */}
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative">
                  {/* Cadre décoratif */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-2xl blur-sm"></div>
                  <div className="relative glass-card p-2 rounded-2xl">
                    <Image
                      src="/images/fabio_agnelli_photo.webp"
                      alt="Fabio Agnelli"
                      width={280}
                      height={350}
                      className="rounded-xl object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Parcours avec gradient */}
      <section
        id="parcours"
        className="section-gradient-parcours py-20 relative"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-wide">
              PARCOURS
            </h2>
          </div>

          <div className="space-y-8">
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h3 className="text-2xl font-bold">👨‍💻 Alternant Intégrateur</h3>
                <span className="text-blue-300 font-medium">
                  Septembre 2024 - Août 2025
                </span>
              </div>
              <p className="text-blue-200 mb-4">Agence DEFACTO - Narbonne</p>
              <p className="leading-relaxed">
                Gestion des assistances d&apos;un environnement d&apos;une centaine de sites de clients en CMS. Accompagnement de clients dans leurs projets de transformation digitale.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h3 className="text-2xl font-bold">👨‍💻 Stagiaire Intégrateur Web</h3>
                <span className="text-blue-300 font-medium">
                  Avril 2024 - Juin 2024
                </span>
              </div>
              <p className="text-blue-200 mb-4">2F Prod - Mougins</p>
              <p className="leading-relaxed">
                Nettoyage d'un environnement digitale daté, avec création d'un nouveau site boutique et système de devis, suivi d'une campagne Google Ads et d'un travail de référencement pour permettre à l'entreprise d'enregistrer plus de vente.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h3 className="text-2xl font-bold">
                  👨‍🎓 BUT Métiers du Multimédia et de l&apos;Internet
                </h3>
                <span className="text-blue-300 font-medium">
                  Septembre 2022 - Juin 2025
                </span>
              </div>
              <p className="text-blue-200 mb-4">Institut Universitaire de Technologie - Béziers</p>
              <p className="leading-relaxed">
                Formation large autour du numérique et du web : développement front et back-end, production graphique et audiovisuelle, stratégie de communication, marketing.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h3 className="text-2xl font-bold">
                  👨‍🎓 Licence mention Mathématiques et Informatique Appliquées aux Sciences Humaines et Sociales
                </h3>
                <span className="text-blue-300 font-medium">
                  Septembre 2018 - Décembre 2021
                </span>
              </div>
              <p className="text-blue-200 mb-4">Campus Valrose - Nice</p>
              <p className="leading-relaxed">
                Licence pluridisciplinaire combinant rigueur mathématique, compétences informatiques et approche des sciences humaines. Solide base théorique et pratique pour aborder les enjeux numériques.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Section Projets avec gradient */}
      <section id="projets" className="section-gradient-projets py-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-wide">
              PROJETS RÉCENTS
            </h2>
            <p className="text-xl text-blue-200">
              Découvrez une sélection de mes projets les plus aboutis ainsi que des projets en développement et d'entraînement.
            </p>
          </div>

          <div className="grid gap-8">
            {projets.length > 0 ? (
              projets.map((projet) => (
                <ProjectCard key={projet.id} projet={projet} />
              ))
            ) : (
              <p className="text-center text-blue-200">Aucun projet disponible pour le moment.</p>
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/projets"
              className="glass-button px-8 py-4 text-lg rounded-xl inline-block"
            >
              Voir plus de réalisations
            </Link>
          </div>
        </div>
      </section>

      {/* Section Contact avec gradient */}
      <section id="contact" className="section-gradient-contact py-20 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-wide">
            CONTACT
          </h2>

          <div className="glass-section p-8 md:p-12 rounded-3xl">
            <p className="text-xl md:text-2xl text-blue-200 mb-8">
              Prêt à démarrer votre projet ou à travailler ensemble ?
            </p>
            <p className="text-lg text-blue-300 mb-10">
              Discutons de vos besoins et transformons vos idées en réalité
              digitale
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="glass-button px-8 py-4 text-lg rounded-xl">
                Me contacter
              </button>
              <button className="glass-button-outline px-8 py-4 text-lg rounded-xl">
                M'envoyer un mail
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
