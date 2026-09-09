import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Testimonial } from '@/lib/supabase/types'
import { TestimonialForm } from '@/components/admin/TestimonialForm'
import { updateTestimonialAction } from '../actions'

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('testimonials').select('*').eq('id', id).single()
  const testimonial = data as Testimonial | null
  if (!testimonial) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Modifier le témoignage</h1>
      <div className="mt-8">
        <TestimonialForm testimonial={testimonial} action={updateTestimonialAction} submitLabel="Enregistrer" />
      </div>
    </div>
  )
}
