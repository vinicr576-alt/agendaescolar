import { createClient } from '@/lib/supabase/server'
import AutorizacoesClient from './AutorizacoesClient'

export default async function AutorizacoesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('escola_id').eq('id', user!.id).single()

  const { data: vinculos } = await supabase
    .from('aluno_responsaveis')
    .select('aluno:alunos(id, nome)')
    .eq('responsavel_id', user!.id)
  const alunos = vinculos?.map((v: any) => v.aluno).filter(Boolean) ?? []

  const { data: autorizacoes } = await supabase
    .from('autorizacoes')
    .select('*')
    .eq('escola_id', profile?.escola_id)
    .order('created_at', { ascending: false })

  return <AutorizacoesClient autorizacoes={autorizacoes ?? []} alunos={alunos} userId={user!.id} />
}
