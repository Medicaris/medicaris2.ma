'use client'

import { useAudience } from '@/lib/audience/AudienceContext'
import { useT } from '@/lib/i18n/LocaleContext'

export function AudienceToggle() {
  const { audience, setAudience } = useAudience()
  const t = useT()

  return (
    <div
      role="radiogroup"
      aria-label={t('Type de visiteur', 'Visitor type')}
      className="flex items-center rounded-full border border-line bg-paper-alt p-0.5 text-xs font-semibold"
    >
      <button
        type="button"
        role="radio"
        aria-checked={audience === 'professionnel'}
        onClick={() => setAudience('professionnel')}
        className={`rounded-full px-3 py-1.5 transition-colors ${
          audience === 'professionnel' ? 'bg-navy text-paper shadow-card' : 'text-muted hover:text-ink'
        }`}
      >
        {t('Professionnel', 'Professional')}
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={audience === 'public'}
        onClick={() => setAudience('public')}
        className={`rounded-full px-3 py-1.5 transition-colors ${
          audience === 'public' ? 'bg-navy text-paper shadow-card' : 'text-muted hover:text-ink'
        }`}
      >
        {t('Grand public', 'General public')}
      </button>
    </div>
  )
}
