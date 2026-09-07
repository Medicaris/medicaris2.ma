export const SITE_URL = 'https://medicaris.ma'

export const CONTACT = {
  phone: '+212661330704',
  phoneDisplay: '+212 661 33 07 04',
  whatsappNumber: '212661330704',
  addressFr: 'Rue Soumaya, Rés. Shehrazade 3, 5ᵉ ét., N° 22 — Palmiers, Casablanca',
  addressEn: 'Rue Soumaya, Res. Shehrazade 3, 5th fl., No. 22 — Palmiers, Casablanca',
}

export const LEGAL = {
  raisonSociale: 'Medicaris SARL',
  rc: '677593',
  ice: '003701741000047',
  if: '66972543',
  capital: '100 000 MAD',
}

export function whatsappHref(prefilledText?: string) {
  const base = `https://wa.me/${CONTACT.whatsappNumber}`
  return prefilledText ? `${base}?text=${encodeURIComponent(prefilledText)}` : base
}
