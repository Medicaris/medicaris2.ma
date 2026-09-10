import Image from 'next/image'
import Link from 'next/link'
import { CONTACT, LEGAL } from '@/lib/constants'
import { FooterText } from './FooterText'

const NAV_LINKS = [
  { href: '/#domaines', fr: 'Domaines cliniques', en: 'Clinical Fields' },
  { href: '/#equipements', fr: 'Équipements', en: 'Equipment' },
  { href: '/#services', fr: 'Nos services', en: 'Our Services' },
  { href: '/#societe', fr: 'La société', en: 'Company' },
  { href: '/#contact', fr: 'Contact', en: 'Contact' },
  { href: '/actualites', fr: 'Actualités', en: 'News' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-navy-deep text-paper">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src="/img/logo.webp"
              alt="Medicaris SARL"
              width={90}
              height={56}
              className="h-11 w-auto brightness-0 invert"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/70">
              <FooterText
                fr="Distributeur de solutions de chirurgie par énergie : proctologie, phlébologie, urologie, ablation tissulaire. Casablanca, Maroc."
                en="Distributor of energy-based surgery solutions — proctology, phlebology, urology, tissue ablation. Casablanca, Morocco."
              />
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-paper/50">
              <FooterText fr="Navigation" en="Navigation" />
            </h4>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-paper/80 transition-colors hover:text-paper">
                    <FooterText fr={link.fr} en={link.en} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-paper/50">
              <FooterText fr="Contact" en="Contact" />
            </h4>
            <div className="mt-4 space-y-2.5 text-sm text-paper/80">
              <p>
                <a href={`tel:${CONTACT.phone}`} className="hover:text-paper">
                  <FooterText fr="Tél." en="Tel." /> · {CONTACT.phoneDisplay}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-paper/10 pt-8 text-xs leading-relaxed text-paper/50">
          <p>
            © {year} Medicaris SARL · Casablanca, <FooterText fr="Maroc" en="Morocco" /> · RC {LEGAL.rc} · ICE {LEGAL.ice} · IF {LEGAL.if}
          </p>
          <p className="mt-3 flex items-center gap-2">
            <FooterText fr="Site réalisé par" en="Website by" />
            <a href="https://agencelepanaf.com" target="_blank" rel="noopener noreferrer">
              <Image src="/img/logomini_le_panaf.png" alt="Agence Le Panaf" width={90} height={24} className="h-5 w-auto opacity-80" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
