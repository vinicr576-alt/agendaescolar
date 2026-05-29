import { createClient } from '@/lib/supabase/server'
import ComunicadosClient from './ComunicadosClient'

export default async function ComunicadosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('escola_id').eq('id', user!.id).single()

  const { data: turmaLinks } = await supabase
    .from('turma_professores')
    .select('turma:turmas(id, nome)')
    .eq('professor_id', user!.id)
  const turmas = turmaLinks?.map((t: any) => t.turma).filter(Boolean) ?? []

  const { data: comunicados } = await supabase
    .from('comunicados')
    .select('*, autor:profiles(nome), turma:turmas(nome)')
    .eq('escola_id', profile?.escola_id)
    .order('created_at', { ascending: false })
    .limit(20)

  return <ComunicadosClient comunicados={comunicados ?? []} turmas={turmas} escolaId={profile?.escola_id ?? ''} autorId={user!.id} />
}
