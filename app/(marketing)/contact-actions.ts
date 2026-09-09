'use server'

import { getTransport, MAIL_FROM, MAIL_TO } from '@/lib/mailer'

export interface ContactPayload {
  name: string
  email: string
  message: string
  specialty?: string
  indication?: string
  volume?: string
  timeline?: string
  audience?: string
  // Champ piège : invisible pour un humain, rempli par la plupart des robots.
  // Nom non sémantique pour éviter tout remplissage automatique du navigateur.
  refInterne?: string
}

export type ContactResult = { ok: true } | { ok: false; error: 'invalid' | 'send' }

const MAX = { name: 200, email: 200, message: 5000, field: 300 }

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function sendContactRequest(payload: ContactPayload): Promise<ContactResult> {
  // Robot : on répond « ok » sans rien envoyer, pour ne pas lui indiquer le piège.
  if (clean(payload.refInterne, MAX.field)) return { ok: true }

  const name = clean(payload.name, MAX.name)
  const email = clean(payload.email, MAX.email)
  const message = clean(payload.message, MAX.message)

  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
  if (!name || !emailLooksValid || message.length < 5) return { ok: false, error: 'invalid' }

  const details: [string, string][] = [
    ['Nom / Établissement', name],
    ['Email', email],
    ['Profil déclaré', clean(payload.audience, MAX.field) || 'non précisé'],
    ['Spécialité', clean(payload.specialty, MAX.field)],
    ['Indication visée', clean(payload.indication, MAX.field)],
    ["Volume d'actes", clean(payload.volume, MAX.field)],
    ['Délai souhaité', clean(payload.timeline, MAX.field)],
  ].filter(([, value]) => value !== '') as [string, string][]

  const text = [
    'Nouvelle demande envoyée depuis le formulaire de medicaris.ma',
    '',
    ...details.map(([label, value]) => `${label} : ${value}`),
    '',
    'Message :',
    message,
    '',
    '—',
    'Répondre directement à ce message écrit au demandeur.',
  ].join('\n')

  try {
    const transport = getTransport()
    await transport.sendMail({
      from: `"Site Medicaris" <${MAIL_FROM}>`,
      to: MAIL_TO,
      replyTo: `"${name}" <${email}>`,
      subject: `Demande site — ${name}`,
      text,
    })
    return { ok: true }
  } catch (error) {
    console.error('[contact] envoi impossible', error)
    return { ok: false, error: 'send' }
  }
}
