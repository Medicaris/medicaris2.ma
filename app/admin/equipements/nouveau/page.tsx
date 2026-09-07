import { createClient } from '@/lib/supabase/server'
import type { ClinicalDomain } from '@/lib/supabase/types'
import { EquipmentForm } from '@/components/admin/EquipmentForm'
import { createEquipmentAction } from '../actions'

export default async function NewEquipmentPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('clinical_domains').select('*').order('order_index')
  const domains = (data ?? []) as ClinicalDomain[]

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Nouvel équipement</h1>
      <div className="mt-8">
        <EquipmentForm domains={domains} action={createEquipmentAction} submitLabel="Créer" />
      </div>
    </div>
  )
}
