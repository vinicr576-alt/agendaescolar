import { createClient } from '@/lib/supabase/server'
import ComunicadosClient from './ComunicadosClient'

export default async function ComunicadosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('escola_id').eq('id', user!.id).single()
  const escola_id = profile?.escola_id

  const [{ data: comunicados }, { data: turmas }] = await Promise.all([
    supabase.from('comunicados').select('*').eq('escola_id', escola_id).order('created_at', { ascending: false }),
    supabase.from('turmas').select('id, nome').eq('escola_id', escola_id).eq('ativa', true).order('nome'),
  ])

  return <ComunicadosClient comunicados={comunicados ?? []} turmas={turmas ?? []} escolaId={escola_id ?? ''} autorId={user!.id} />
}
