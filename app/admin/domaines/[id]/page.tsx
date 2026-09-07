import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { ClinicalDomain } from '@/lib/supabase/types'
import { DomainForm } from '@/components/admin/DomainForm'
import { updateDomainAction } from '../actions'

export default async function EditDomainPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('clinical_domains').select('*').eq('id', id).single()
  const domain = data as ClinicalDomain | null
  if (!domain) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Modifier le domaine</h1>
      <div className="mt-8">
        <DomainForm domain={domain} action={updateDomainAction} submitLabel="Enregistrer" />
      </div>
    </div>
  )
}
