import { createClient } from '@/lib/supabase/server'
import type { Equipment } from '@/lib/supabase/types'

export type { Equipment }

const ENERGY_ORDER = { rf: 0, laser: 1 } as const

/** La radiofréquence mène toujours, le laser suit (cf. PRODUCT.md, principe 2). */
export async function getActiveEquipment(): Promise<Equipment[]> {
  const supabase = await createClient()
  const { data } = await supabase.from('equipment').select('*').eq('active', true).order('order_index')
  const rows = (data ?? []) as Equipment[]
  return rows.sort((a, b) => ENERGY_ORDER[a.energy_type] - ENERGY_ORDER[b.energy_type] || a.order_index - b.order_index)
}
