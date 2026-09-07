'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Audience = 'professionnel' | 'public'

interface AudienceContextValue {
  audience: Audience
  setAudience: (audience: Audience) => void
}

const AudienceContext = createContext<AudienceContextValue | null>(null)

const STORAGE_KEY = 'med-audience'

/**
 * Filtre de profondeur de contenu, pas un vrai segment B2C (cf. PRODUCT.md).
 * Défaut "professionnel" : aucune des trois audiences réelles du site n'est un patient.
 */
export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudienceState] = useState<Audience>('professionnel')

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'public' || saved === 'professionnel') setAudienceState(saved)
  }, [])

  function setAudience(next: Audience) {
    setAudienceState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  return (
    <AudienceContext.Provider value={{ audience, setAudience }}>
      {children}
    </AudienceContext.Provider>
  )
}

export function useAudience() {
  const ctx = useContext(AudienceContext)
  if (!ctx) throw new Error('useAudience must be used within an AudienceProvider')
  return ctx
}
