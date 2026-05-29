import { createClient } from '@/lib/supabase/server'
import TurmasClient from './TurmasClient'

export default async function TurmasPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('escola_id').eq('id', user!.id).single()

  const { data: turmas } = await supabase
    .from('turmas')
    .select('*')
    .eq('escola_id', profile?.escola_id)
    .order('nome')

  return <TurmasClient turmas={turmas ?? []} escolaId={profile?.escola_id ?? ''} />
}
