import { createClient } from '@/lib/supabase/server'
import type { ClinicalDomain } from '@/lib/supabase/types'

export type { ClinicalDomain }

export async function getActiveDomains(): Promise<ClinicalDomain[]> {
  const supabase = await createClient()
  const { data } = await supabase.from('clinical_domains').select('*').eq('active', true).order('order_index')
  return (data ?? []) as ClinicalDomain[]
}
