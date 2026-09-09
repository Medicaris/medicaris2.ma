'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

function fieldsFromForm(formData: FormData) {
  return {
    initials: formData.get('initials') as string,
    quote_fr: formData.get('quote_fr') as string,
    quote_en: formData.get('quote_en') as string,
    name_fr: formData.get('name_fr') as string,
    name_en: formData.get('name_en') as string,
    role_fr: formData.get('role_fr') as string,
    role_en: formData.get('role_en') as string,
    order_index: Number(formData.get('order_index') ?? 0),
    active: formData.get('active') === 'true',
  }
}

export async function createTestimonialAction(formData: FormData) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('testimonials').insert(fieldsFromForm(formData)).select('id').single()
  if (error) throw new Error(error.message)

  revalidatePath('/admin/temoignages')
  revalidatePath('/')
  redirect(`/admin/temoignages/${data.id}`)
}

export async function updateTestimonialAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const { error } = await supabase.from('testimonials').update(fieldsFromForm(formData)).eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/admin/temoignages')
  revalidatePath('/')
  redirect(`/admin/temoignages/${id}`)
}

export async function deleteTestimonialAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  await supabase.from('testimonials').delete().eq('id', id)

  revalidatePath('/admin/temoignages')
  revalidatePath('/')
}
