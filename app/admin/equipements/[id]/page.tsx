import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { ClinicalDomain, Equipment } from '@/lib/supabase/types'
import { EquipmentForm } from '@/components/admin/EquipmentForm'
import { updateEquipmentAction } from '../actions'

export default async function EditEquipmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const [{ data: equipmentData }, { data: domainsData }] = await Promise.all([
    supabase.from('equipment').select('*').eq('id', id).single(),
    supabase.from('clinical_domains').select('*').order('order_index'),
  ])
  const equipment = equipmentData as Equipment | null
  const domains = (domainsData ?? []) as ClinicalDomain[]
  if (!equipment) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Modifier l&apos;équipement</h1>
      <div className="mt-8">
        <EquipmentForm equipment={equipment} domains={domains} action={updateEquipmentAction} submitLabel="Enregistrer" />
      </div>
    </div>
  )
}
