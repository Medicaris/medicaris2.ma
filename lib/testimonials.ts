import { createClient } from '@/lib/supabase/server'
import type { Testimonial } from '@/lib/supabase/types'

export type { Testimonial }

export async function getActiveTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient()
  const { data } = await supabase.from('testimonials').select('*').eq('active', true).order('order_index')
  return (data ?? []) as Testimonial[]
}
