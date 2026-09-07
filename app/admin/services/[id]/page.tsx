import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Service } from '@/lib/supabase/types'
import { BilingualField } from '@/components/admin/BilingualField'
import { updateServiceAction } from '../actions'

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('services').select('*').eq('id', id).single()
  const service = data as Service | null
  if (!service) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">
        Étape {String(service.step_number).padStart(2, '0')}
      </h1>
      <form action={updateServiceAction} className="mt-8 max-w-3xl space-y-5">
        <input type="hidden" name="id" value={service.id} />
        <div className="space-y-5 rounded-2xl border border-line bg-paper p-6 shadow-card">
          <BilingualField label="Titre" nameFr="title_fr" nameEn="title_en" defaultValueFr={service.title_fr} defaultValueEn={service.title_en} />
          <BilingualField label="Description" nameFr="body_fr" nameEn="body_en" defaultValueFr={service.body_fr} defaultValueEn={service.body_en} multiline />
        </div>
        <button type="submit" className="rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-navy-deep">
          Enregistrer
        </button>
      </form>
    </div>
  )
}
