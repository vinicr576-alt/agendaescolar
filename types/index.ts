export type UserRole = 'admin' | 'professor' | 'pai' | 'aluno'
export type MoodType = 'otimo' | 'bom' | 'regular' | 'ruim'
export type MealType = 'comeu_tudo' | 'comeu_bem' | 'comeu_pouco' | 'nao_comeu'
export type EventType = 'prova' | 'trabalho' | 'reuniao' | 'excursao' | 'feriado' | 'outro'

export interface Profile {
  id: string
  nome: string
  email: string
  telefone?: string
  foto_url?: string
  role: UserRole
  escola_id?: string
  created_at: string
}

export interface Escola {
  id: string
  nome: string
  logo_url?: string
  cor_primaria: string
  endereco?: string
  telefone?: string
  email?: string
  admin_id: string
  created_at: string
}

export interface Turma {
  id: string
  escola_id: string
  nome: string
  ano_letivo: number
  descricao?: string
  ativa: boolean
  created_at: string
  _count?: { alunos: number }
}

export interface Aluno {
  id: string
  escola_id: string
  turma_id?: string
  nome: string
  data_nascimento?: string
  foto_url?: string
  observacoes?: string
  codigo_convite: string
  ativo: boolean
  created_at: string
  turma?: Turma
}

export interface RelatorioDiario {
  id: string
  aluno_id: string
  professor_id: string
  data: string
  humor?: MoodType
  alimentacao?: MealType
  dormiu_bem?: boolean
  atividades?: string
  observacoes?: string
  created_at: string
  aluno?: Aluno
  professor?: Profile
}

export interface Foto {
  id: string
  turma_id: string
  professor_id: string
  url: string
  caption?: string
  data: string
  created_at: string
  turma?: Turma
  professor?: Profile
}

export interface Comunicado {
  id: string
  escola_id: string
  turma_id?: string
  autor_id: string
  titulo: string
  conteudo: string
  tipo: string
  fixado: boolean
  created_at: string
  autor?: Profile
  turma?: Turma
  lido?: boolean
}

export interface Evento {
  id: string
  escola_id: string
  turma_id?: string
  criado_por: string
  titulo: string
  descricao?: string
  tipo: EventType
  data_inicio: string
  data_fim?: string
  local?: string
  created_at: string
  confirmado?: boolean | null
}

export interface Autorizacao {
  id: string
  escola_id: string
  turma_id?: string
  criado_por: string
  titulo: string
  descricao: string
  data_limite?: string
  created_at: string
  respondido?: boolean
  autorizado?: boolean
}

export interface Notificacao {
  id: string
  user_id: string
  titulo: string
  mensagem: string
  tipo: string
  lida: boolean
  link?: string
  created_at: string
}
