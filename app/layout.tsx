import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LocaleProvider } from '@/lib/i18n/LocaleContext'
import { AudienceProvider } from '@/lib/audience/AudienceContext'
import { SITE_URL } from '@/lib/constants'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Radiofréquence et laser chirurgical au Maroc — Medicaris',
  description:
    "Medicaris SARL, Casablanca — spécialiste de la radiofréquence et du laser en chirurgie par énergie au Maroc : hémorroïdes et fistule, varices par voie endoveineuse, hypertrophie prostatique, ablation de nodule thyroïdien. Importation directe, installation, formation, consommables.",
  alternates: { canonical: '/' },
  openGraph: {
    siteName: 'Medicaris SARL',
    locale: 'fr_MA',
    title: 'Radiofréquence et laser chirurgical au Maroc — Medicaris',
    description:
      'Spécialiste de la radiofréquence et du laser en chirurgie par énergie : proctologie, phlébologie, urologie, ablation tissulaire. Casablanca, Maroc.',
    type: 'website',
    url: '/',
    images: ['/img/logo.webp'],
  },
  twitter: { card: 'summary' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Medicaris SARL',
  legalName: 'MEDICARIS S.A.R.L.',
  url: SITE_URL,
  logo: `${SITE_URL}/img/logo.webp`,
  description:
    'Spécialiste de la radiofréquence et du laser en chirurgie par énergie au Maroc. Distribution de générateurs de radiofréquence et de plateformes laser pour la proctologie, la phlébologie, l’urologie et l’ablation tissulaire.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rue Soumaya, Résidence Shehrazade 3, 5e étage, N° 22, Palmiers',
    addressLocality: 'Casablanca',
    addressCountry: 'MA',
  },
  telephone: '+212661330704',
  areaServed: { '@type': 'Country', name: 'Maroc' },
  identifier: [
    { '@type': 'PropertyValue', name: 'ICE', value: '003701741000047' },
    { '@type': 'PropertyValue', name: 'RC', value: '677593' },
    { '@type': 'PropertyValue', name: 'IF', value: '66972543' },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: '+212661330704',
    areaServed: 'MA',
    availableLanguage: ['fr', 'en', 'ar'],
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <LocaleProvider>
          <AudienceProvider>{children}</AudienceProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
