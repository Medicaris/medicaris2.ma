'use client'

import { useForm } from 'react-hook-form'
import { Phone } from 'lucide-react'
import { useT } from '@/lib/i18n/LocaleContext'
import { useAudience } from '@/lib/audience/AudienceContext'
import { CONTACT, whatsappHref } from '@/lib/constants'
import { Reveal } from '@/components/motion/Reveal'

interface ContactFormValues {
  name: string
  email: string
  message: string
  specialty?: string
  indication?: string
  volume?: string
  timeline?: string
}

export function Contact() {
  const t = useT()
  const { audience } = useAudience()
  const { register, handleSubmit, reset } = useForm<ContactFormValues>()

  function onSubmit(values: ContactFormValues) {
    const lines = [
      'Demande via le site Medicaris',
      '',
      `Nom / Établissement : ${values.name}`,
      `Email : ${values.email}`,
    ]
    if (audience === 'professionnel') {
      if (values.specialty) lines.push(`Spécialité : ${values.specialty}`)
      if (values.indication) lines.push(`Indication visée : ${values.indication}`)
      if (values.volume) lines.push(`Volume d'actes : ${values.volume}`)
      if (values.timeline) lines.push(`Délai souhaité : ${values.timeline}`)
    }
    lines.push('', values.message)

    window.open(whatsappHref(lines.join('\n')), '_blank', 'noopener')
    reset()
  }

  return (
    <section id="contact" className="bg-paper-alt py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-navy/8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-navy">
            {t('Contact', 'Contact')}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t('Voir l’équipement avant de décider', 'See the equipment before deciding')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {t(
              'Démonstration sur site, devis, information technique ou demande de partenariat fabricant — écrivez-nous, nous répondons sous 24 heures ouvrables.',
              'On-site demonstration, quotation, technical information or manufacturer partnership enquiry — write to us, we reply within 24 business hours.'
            )}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-4">
            <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-4 rounded-2xl border border-line bg-paper p-5 transition-shadow hover:shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy/10 text-navy">
                <Phone size={20} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">{t('Téléphone', 'Phone')}</span>
                <span className="block text-sm text-muted">{CONTACT.phoneDisplay}</span>
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-line bg-paper p-8 shadow-card">
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-ink">
                    {t('Nom / Établissement', 'Name / Institution')}
                  </label>
                  <input
                    id="name"
                    {...register('name', { required: true })}
                    placeholder="Dr. Ahmed Benali — Clinique Al Fath"
                    className="mt-1.5 w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-navy"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-ink">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', { required: true })}
                    placeholder="contact@example.com"
                    className="mt-1.5 w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-navy"
                  />
                </div>

                {audience === 'professionnel' && (
                  <div className="grid grid-cols-2 gap-4 rounded-xl bg-paper-alt p-4">
                    <div>
                      <label htmlFor="specialty" className="text-xs font-medium text-muted">
                        {t('Spécialité', 'Specialty')}
                      </label>
                      <input
                        id="specialty"
                        {...register('specialty')}
                        className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-navy"
                      />
                    </div>
                    <div>
                      <label htmlFor="indication" className="text-xs font-medium text-muted">
                        {t('Indication visée', 'Target indication')}
                      </label>
                      <input
                        id="indication"
                        {...register('indication')}
                        className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-navy"
                      />
                    </div>
                    <div>
                      <label htmlFor="volume" className="text-xs font-medium text-muted">
                        {t("Volume d'actes", 'Case volume')}
                      </label>
                      <input
                        id="volume"
                        {...register('volume')}
                        className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-navy"
                      />
                    </div>
                    <div>
                      <label htmlFor="timeline" className="text-xs font-medium text-muted">
                        {t('Délai souhaité', 'Expected timeline')}
                      </label>
                      <input
                        id="timeline"
                        {...register('timeline')}
                        className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-navy"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="message" className="text-sm font-medium text-ink">
                    {t('Votre besoin', 'Your need')}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register('message', { required: true })}
                    placeholder={t(
                      "Spécialité, indication visée, volume d'actes, délai souhaité...",
                      'Specialty, target indication, case volume, expected timeline...'
                    )}
                    className="mt-1.5 w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-navy"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-paper shadow-card transition-colors hover:bg-navy-deep"
                >
                  {t('Envoyer la demande', 'Send Request')}
                </button>
                <p className="text-center text-xs text-muted">{t('Réponse sous 24 heures ouvrables.', 'Reply within 24 business hours.')}</p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
