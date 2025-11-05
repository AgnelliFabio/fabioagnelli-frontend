// src/app/page.tsx
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Header } from '@/components/ui/Header'

export default function HomePage() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden font-jura">
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
            <a
              href="#projets"
              className="glass-button px-8 py-4 text-lg rounded-xl"
            >
              Voir mes projets
            </a>
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
            <p className="text-lg md:text-xl leading-relaxed text-center max-w-4xl mx-auto">
              Développeur web débutant, je combine créativité et expertise
              technique pour donner vie à vos projets digitaux. Polyvalent suite
              à ma formation BUT MMI, j'accompagne entreprises et particuliers
              dans leur transformation numérique.
            </p>

            {/* <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-300 mb-2">3+</div>
                <div className="text-blue-200">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-300 mb-2">25+</div>
                <div className="text-blue-200">Projets réalisés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-300 mb-2">100%</div>
                <div className="text-blue-200">Clients satisfaits</div>
              </div>
            </div> */}
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
                Gestion des assistances d'un environnement d'une centaine de
                sites de clients en CMS. Accompagnement de clients dans leurs
                projets de transformation digitale.
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
                Gestion des assistances d'un environnement d'une centaine de
                sites de clients en CMS. Accompagnement de clients dans leurs
                projets de transformation digitale.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h3 className="text-2xl font-bold">
                  👨‍🎓 BUT Métiers du Multimédia et de l'Internet
                </h3>
                <span className="text-blue-300 font-medium">
                  Septembre 2022 - Juin 2025
                </span>
              </div>
              <p className="text-blue-200 mb-4">Institut Universitaire de Technologie - Béziers</p>
              <p className="leading-relaxed">
                Formation large autour du numérique et du web : développement
                front et back-end, production graphique et audiovisuelle,
                stratégie de communication, marketing.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h3 className="text-2xl font-bold">
                  Formation Développeur Web
                </h3>
                <span className="text-blue-300 font-medium">2021 - 2022</span>
              </div>
              <p className="text-blue-200 mb-4">École du Web</p>
              <p className="leading-relaxed">
                Formation intensive en développement web full stack. Maîtrise
                des technologies modernes : JavaScript, React, Node.js, PHP,
                WordPress.
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
              Découvrez une sélection de mes projets les plus aboutis
            </p>
          </div>

          <div className="grid gap-8">
            {/* Projet 1 */}
            <div className="glass-project-card p-8 rounded-3xl group">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Badge className="bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      Site E-commerce
                    </Badge>
                    <h3 className="text-3xl font-bold">
                      Plateforme e-commerce moderne
                    </h3>
                  </div>

                  <p className="text-blue-200 leading-relaxed text-lg">
                    Développement d'une plateforme e-commerce complète avec
                    gestion des stocks, paiements sécurisés et interface
                    d'administration avancée.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Badge
                      variant="secondary"
                      className="bg-white/10 text-white border border-white/20"
                    >
                      Next.js
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-white/10 text-white border border-white/20"
                    >
                      TypeScript
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-white/10 text-white border border-white/20"
                    >
                      Stripe
                    </Badge>
                  </div>

                  <div className="flex gap-4">
                    <button className="glass-button-outline px-6 py-2 rounded-lg">
                      Voir le projet
                    </button>
                    <button className="text-blue-300 hover:bg-white/10 px-6 py-2 rounded-lg transition-colors">
                      Code source
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="glass-mockup p-6 rounded-2xl transform group-hover:scale-105 transition-transform duration-300">
                    <div className="bg-white/10 rounded-lg p-6 space-y-3">
                      <div className="h-4 bg-blue-300/50 rounded w-3/4"></div>
                      <div className="h-3 bg-blue-200/30 rounded w-1/2"></div>
                      <div className="grid grid-cols-2 gap-3 mt-6">
                        <div className="h-16 bg-blue-400/30 rounded"></div>
                        <div className="h-16 bg-blue-500/30 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Projet 2 */}
            <div className="glass-project-card p-8 rounded-3xl group">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Badge className="bg-purple-500/20 text-purple-300 border border-purple-400/30">
                      Application Web
                    </Badge>
                    <h3 className="text-3xl font-bold">Dashboard analytique</h3>
                  </div>

                  <p className="text-blue-200 leading-relaxed text-lg">
                    Interface de gestion et d'analyse de données avec graphiques
                    interactifs, tableaux de bord personnalisables et exports
                    automatisés.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Badge
                      variant="secondary"
                      className="bg-white/10 text-white border border-white/20"
                    >
                      React
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-white/10 text-white border border-white/20"
                    >
                      Chart.js
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-white/10 text-white border border-white/20"
                    >
                      Node.js
                    </Badge>
                  </div>

                  <div className="flex gap-4">
                    <button className="glass-button-outline px-6 py-2 rounded-lg">
                      Voir le projet
                    </button>
                    <button className="text-blue-300 hover:bg-white/10 px-6 py-2 rounded-lg transition-colors">
                      Code source
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="glass-mockup p-6 rounded-2xl transform group-hover:scale-105 transition-transform duration-300">
                    <div className="bg-white/10 rounded-lg p-6 space-y-3">
                      <div className="h-4 bg-purple-300/50 rounded w-2/3"></div>
                      <div className="h-20 bg-gradient-to-r from-purple-400/30 to-blue-400/30 rounded mt-4"></div>
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        <div className="h-2 bg-purple-300/40 rounded"></div>
                        <div className="h-2 bg-blue-300/40 rounded"></div>
                        <div className="h-2 bg-indigo-300/40 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              Prêt à démarrer votre projet ?
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
                Planifier un appel
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
