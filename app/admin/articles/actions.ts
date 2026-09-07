'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createArticleAction(formData: FormData) {
  const supabase = await createClient()
  const published = formData.get('published') === 'true'

  const { data, error } = await supabase
    .from('articles')
    .insert({
      title_fr: formData.get('title_fr') as string,
      title_en: formData.get('title_en') as string,
      slug: formData.get('slug') as string,
      excerpt_fr: formData.get('excerpt_fr') as string,
      excerpt_en: formData.get('excerpt_en') as string,
      content_fr: formData.get('content_fr') as string,
      content_en: formData.get('content_en') as string,
      cover_image_url: (formData.get('cover_image_url') as string) || null,
      published,
      published_at: published ? new Date().toISOString() : null,
    })
    .select('id')
    .single()

  if (error) throw new Error(error.message)

  revalidatePath('/admin/articles')
  revalidatePath('/actualites')
  revalidatePath('/')
  redirect(`/admin/articles/${data.id}`)
}

export async function updateArticleAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const published = formData.get('published') === 'true'

  const { error } = await supabase
    .from('articles')
    .update({
      title_fr: formData.get('title_fr') as string,
      title_en: formData.get('title_en') as string,
      slug: formData.get('slug') as string,
      excerpt_fr: formData.get('excerpt_fr') as string,
      excerpt_en: formData.get('excerpt_en') as string,
      content_fr: formData.get('content_fr') as string,
      content_en: formData.get('content_en') as string,
      cover_image_url: (formData.get('cover_image_url') as string) || null,
      published,
      published_at: published ? new Date().toISOString() : null,
    })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/admin/articles')
  revalidatePath(`/actualites/${formData.get('slug')}`)
  revalidatePath('/actualites')
  revalidatePath('/')
  redirect(`/admin/articles/${id}`)
}

export async function togglePublishedAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const published = formData.get('published') === 'true'

  await supabase
    .from('articles')
    .update({ published, published_at: published ? new Date().toISOString() : null })
    .eq('id', id)

  revalidatePath('/admin/articles')
  revalidatePath('/actualites')
  revalidatePath('/')
}

export async function deleteArticleAction(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  await supabase.from('articles').delete().eq('id', id)

  revalidatePath('/admin/articles')
  revalidatePath('/actualites')
  revalidatePath('/')
}
