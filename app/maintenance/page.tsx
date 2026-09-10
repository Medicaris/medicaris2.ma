import type { Metadata } from 'next'
import Image from 'next/image'
import { whatsappHref } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Medicaris — Site en maintenance',
  robots: { index: false, follow: false },
}

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy-deep px-6 text-center text-paper">
      <Image src="/img/logo.webp" alt="Medicaris SARL" width={90} height={56} className="h-12 w-auto brightness-0 invert" />
      <h1 className="mt-8 text-2xl font-bold">Site en maintenance</h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper/70">
        Le site est momentanément indisponible. Nous serons de retour très prochainement.
      </p>

      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-center gap-2.5 rounded-lg bg-rf px-6 py-3 text-sm font-semibold text-navy-deep shadow-[0_2px_8px_oklch(0.7_0.16_55/0.35)] transition-all duration-200 hover:-translate-y-px hover:bg-[oklch(0.65_0.17_53)]"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.142 1.543 5.893L.057 23.5l5.752-1.508A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.638-.51-5.145-1.395l-.369-.22-3.812 1-.978-3.716-.24-.383A9.961 9.961 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
        WhatsApp
      </a>
      <p className="mt-3 text-xs text-paper/50">Pour toute urgence, notre équipe reste joignable sur WhatsApp durant la maintenance.</p>
    </div>
  )
}
