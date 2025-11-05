// src/app/layout.tsx
import type { Metadata } from 'next'
import { Jura } from 'next/font/google'
import './globals.css'

const jura = Jura({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jura'
})

export const metadata: Metadata = {
  title: 'Fabio Agnelli - Développeur Full Stack',
  description: 'Portfolio de Fabio Agnelli, développeur full stack spécialisé en React, Next.js et WordPress headless',
  keywords: 'développeur, full stack, React, Next.js, WordPress, freelance',
  authors: [{ name: 'Fabio Agnelli' }],
  openGraph: {
    title: 'Fabio Agnelli - Développeur Full Stack',
    description: 'Portfolio de Fabio Agnelli, développeur full stack spécialisé en React, Next.js et WordPress headless',
    url: 'https://fabioagnelli.fr',
    siteName: 'Fabio Agnelli Portfolio',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={jura.variable}>
      <body className="font-jura">
        {children}
      </body>
    </html>
  )
}