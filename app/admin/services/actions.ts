'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function updateServiceAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  const { error } = await supabase
    .from('services')
    .update({
      title_fr: formData.get('title_fr') as string,
      title_en: formData.get('title_en') as string,
      body_fr: formData.get('body_fr') as string,
      body_en: formData.get('body_en') as string,
    })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/admin/services')
  revalidatePath('/')
  redirect('/admin/services')
}
