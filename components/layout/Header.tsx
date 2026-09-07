'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useT } from '@/lib/i18n/LocaleContext'
import { LangToggle } from './LangToggle'
// import { AudienceToggle } from './AudienceToggle' // masqué pour l'instant

const NAV_LINKS = [
  { href: '/#domaines', fr: 'Domaines cliniques', en: 'Clinical Fields' },
  { href: '/#equipements', fr: 'Équipements', en: 'Equipment' },
  { href: '/#services', fr: 'Nos services', en: 'Our Services' },
  { href: '/actualites', fr: 'Actualités', en: 'News' },
  { href: '/#societe', fr: 'La société', en: 'Company' },
]

export function Header() {
  const t = useT()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[68px] border-b border-line bg-paper/95 backdrop-blur-md transition-shadow ${
        scrolled ? 'shadow-card' : ''
      }`}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center gap-6 px-6">
        <Link href="/#hero" className="flex shrink-0 items-center">
          <Image src="/img/logo.webp" alt="Medicaris SARL" width={150} height={60} priority className="h-[52px] w-auto" />
        </Link>

        <nav className="ml-auto hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2.5 py-2 text-[13.5px] font-medium text-muted transition-colors hover:bg-navy/8 hover:text-navy"
            >
              {t(link.fr, link.en)}
            </Link>
          ))}

          <Link
            href="/#contact"
            className="relative ml-5 rounded-md bg-navy px-4 py-2.5 text-[13.5px] font-semibold text-paper transition-colors before:absolute before:-left-3 before:top-1/2 before:h-5 before:w-px before:-translate-y-1/2 before:bg-line hover:bg-navy-deep"
          >
            {t('Demander un devis', 'Request a Quote')}
          </Link>
        </nav>

        <div className="hidden shrink-0 items-center lg:ml-6 lg:flex">
          <LangToggle />
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <LangToggle />
          <button
            type="button"
            aria-label={t('Menu', 'Menu')}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex items-center justify-center rounded-md p-2 text-ink"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-[68px] flex max-h-[calc(100vh-68px)] flex-col gap-1 overflow-y-auto border-b border-line bg-paper px-4 py-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-base font-medium text-ink hover:bg-paper-alt"
            >
              {t(link.fr, link.en)}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-3 rounded-md bg-navy px-4 py-3 text-center text-sm font-semibold text-paper"
          >
            {t('Demander un devis', 'Request a Quote')}
          </Link>
        </div>
      )}
    </header>
  )
}
