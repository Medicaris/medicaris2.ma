'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

function fieldsFromForm(formData: FormData) {
  return {
    slug: formData.get('slug') as string,
    icon_key: formData.get('icon_key') as string,
    tag_fr: formData.get('tag_fr') as string,
    tag_en: formData.get('tag_en') as string,
    title_fr: formData.get('title_fr') as string,
    title_en: formData.get('title_en') as string,
    body_fr: formData.get('body_fr') as string,
    body_en: formData.get('body_en') as string,
    audience_fr: formData.get('audience_fr') as string,
    audience_en: formData.get('audience_en') as string,
    order_index: Number(formData.get('order_index') ?? 0),
    active: formData.get('active') === 'true',
  }
}

export async function createDomainAction(formData: FormData) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('clinical_domains').insert(fieldsFromForm(formData)).select('id').single()
  if (error) throw new Error(error.message)

  revalidatePath('/admin/domaines')
  revalidatePath('/')
  redirect(`/admin/domaines/${data.id}`)
}

export async function updateDomainAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const { error } = await supabase.from('clinical_domains').update(fieldsFromForm(formData)).eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/admin/domaines')
  revalidatePath('/')
  redirect(`/admin/domaines/${id}`)
}

export async function deleteDomainAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  await supabase.from('clinical_domains').delete().eq('id', id)

  revalidatePath('/admin/domaines')
  revalidatePath('/')
}
