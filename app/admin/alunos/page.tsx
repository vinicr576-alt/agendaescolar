import { createClient } from '@/lib/supabase/server'
import AlunosClient from './AlunosClient'

export default async function AlunosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('escola_id').eq('id', user!.id).single()

  const [{ data: alunos }, { data: turmas }] = await Promise.all([
    supabase.from('alunos').select('*, turma:turmas(nome)').eq('escola_id', profile?.escola_id).eq('ativo', true).order('nome'),
    supabase.from('turmas').select('id, nome').eq('escola_id', profile?.escola_id).eq('ativa', true).order('nome'),
  ])

  return <AlunosClient alunos={alunos ?? []} turmas={turmas ?? []} escolaId={profile?.escola_id ?? ''} />
}
