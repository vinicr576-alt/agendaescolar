import { createClient } from '@/lib/supabase/server'
import EventosClient from './EventosClient'

export default async function EventosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('escola_id').eq('id', user!.id).single()
  const escola_id = profile?.escola_id

  const [{ data: eventos }, { data: turmas }] = await Promise.all([
    supabase.from('eventos').select('*').eq('escola_id', escola_id).order('data_inicio', { ascending: true }),
    supabase.from('turmas').select('id, nome').eq('escola_id', escola_id).eq('ativa', true).order('nome'),
  ])

  return <EventosClient eventos={eventos ?? []} turmas={turmas ?? []} escolaId={escola_id ?? ''} criadoPor={user!.id} />
}
