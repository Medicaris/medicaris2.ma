import { createClient } from '@/lib/supabase/server'
import type { Service } from '@/lib/supabase/types'

export type { Service }

export async function getServices(): Promise<Service[]> {
  const supabase = await createClient()
  const { data } = await supabase.from('services').select('*').order('order_index')
  return (data ?? []) as Service[]
}
