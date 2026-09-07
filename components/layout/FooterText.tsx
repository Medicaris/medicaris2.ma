'use client'

import { useT } from '@/lib/i18n/LocaleContext'

export function FooterText({ fr, en }: { fr: string; en: string }) {
  const t = useT()
  return <>{t(fr, en)}</>
}
