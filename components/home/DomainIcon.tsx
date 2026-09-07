const ICONS: Record<string, React.ReactNode> = {
  proctologie: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" strokeLinecap="round" />
    </>
  ),
  phlebologie: (
    <>
      <path d="M7 3c0 5 10 4 10 9s-6 4-6 9" strokeLinecap="round" />
      <circle cx="7" cy="3.5" r="1.6" />
      <circle cx="11" cy="20.5" r="1.6" />
    </>
  ),
  urologie: (
    <>
      <path
        d="M8 4c-3 0-4 3-3 6s4 3 3 6M16 4c3 0 4 3 3 6s-4 3-3 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 10v6M16 10v6" strokeLinecap="round" />
      <circle cx="12" cy="19.5" r="1.6" />
    </>
  ),
  ablation: (
    <>
      <path d="M4 20L14 10" strokeLinecap="round" />
      <path d="M13 5.5l5.5 5.5" strokeLinecap="round" />
      <circle cx="16" cy="8" r="4.2" />
      <path d="M4 20l1.2-3 1.8 1.8L4 20z" fill="currentColor" stroke="none" />
    </>
  ),
}

/** icon_key en base mappe vers un tracé codé — jamais de SVG brut stocké en base. */
export function DomainIcon({ iconKey, className }: { iconKey: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className} aria-hidden="true">
      {ICONS[iconKey] ?? ICONS.proctologie}
    </svg>
  )
}
