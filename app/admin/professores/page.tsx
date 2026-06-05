import { createClient } from '@/lib/supabase/server'
import ProfessoresClient from './ProfessoresClient'

export default async function ProfessoresPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('escola_id').eq('id', user!.id).single()
  const escola_id = profile?.escola_id

  const { data: professores } = await supabase
    .from('profiles')
    .select('*')
    .eq('escola_id', escola_id)
    .eq('role', 'professor')
    .order('nome')

  return <ProfessoresClient professores={professores ?? []} escolaId={escola_id ?? ''} />
}
