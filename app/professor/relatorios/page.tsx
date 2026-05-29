import { createClient } from '@/lib/supabase/server'
import RelatoriosClient from './RelatoriosClient'

export default async function RelatoriosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: turmaLinks } = await supabase
    .from('turma_professores')
    .select('turma:turmas(id, nome)')
    .eq('professor_id', user!.id)

  const turmaIds = turmaLinks?.map((t: any) => t.turma?.id).filter(Boolean) ?? []

  const { data: alunos } = await supabase
    .from('alunos')
    .select('id, nome, turma:turmas(nome)')
    .in('turma_id', turmaIds)
    .eq('ativo', true)
    .order('nome')

  return <RelatoriosClient alunos={alunos ?? []} professorId={user!.id} />
}
