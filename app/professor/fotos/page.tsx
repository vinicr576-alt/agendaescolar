import { createClient } from '@/lib/supabase/server'
import FotosClient from './FotosClient'

export default async function FotosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: turmaLinks } = await supabase
    .from('turma_professores')
    .select('turma:turmas(id, nome)')
    .eq('professor_id', user!.id)

  const turmaIds = turmaLinks?.map((t: any) => t.turma?.id).filter(Boolean) ?? []
  const turmas = turmaLinks?.map((t: any) => t.turma).filter(Boolean) ?? []

  const { data: fotos } = await supabase
    .from('fotos')
    .select('*, professor:profiles(nome)')
    .in('turma_id', turmaIds)
    .order('created_at', { ascending: false })
    .limit(30)

  return <FotosClient fotos={fotos ?? []} turmas={turmas} professorId={user!.id} />
}
