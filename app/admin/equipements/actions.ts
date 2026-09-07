'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

function fieldsFromForm(formData: FormData) {
  return {
    slug: formData.get('slug') as string,
    energy_type: formData.get('energy_type') as string,
    clinical_domain_id: (formData.get('clinical_domain_id') as string) || null,
    eyebrow_fr: formData.get('eyebrow_fr') as string,
    eyebrow_en: formData.get('eyebrow_en') as string,
    name_fr: formData.get('name_fr') as string,
    name_en: formData.get('name_en') as string,
    description_fr: formData.get('description_fr') as string,
    description_en: formData.get('description_en') as string,
    tags: JSON.parse((formData.get('tags') as string) || '[]'),
    spec_sheet: JSON.parse((formData.get('spec_sheet') as string) || '[]'),
    image_url: (formData.get('image_url') as string) || null,
    order_index: Number(formData.get('order_index') ?? 0),
    active: formData.get('active') === 'true',
  }
}

export async function createEquipmentAction(formData: FormData) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('equipment').insert(fieldsFromForm(formData)).select('id').single()
  if (error) throw new Error(error.message)

  revalidatePath('/admin/equipements')
  revalidatePath('/')
  redirect(`/admin/equipements/${data.id}`)
}

export async function updateEquipmentAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const { error } = await supabase.from('equipment').update(fieldsFromForm(formData)).eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/admin/equipements')
  revalidatePath('/')
  redirect(`/admin/equipements/${id}`)
}

export async function deleteEquipmentAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  await supabase.from('equipment').delete().eq('id', id)

  revalidatePath('/admin/equipements')
  revalidatePath('/')
}
