import { createClient } from '@/lib/supabase/server'

export async function getSetting(key: string): Promise<string | null> {
  const supabase = await createClient()
  const { data } = await supabase.from('settings').select('value').eq('key', key).single()
  return data?.value ?? null
}

export async function isMaintenanceMode(): Promise<boolean> {
  return (await getSetting('maintenance_mode')) === 'true'
}
