-- =============================================
-- AGENDA ESCOLAR DIGITAL - Schema Supabase
-- Execute este arquivo no SQL Editor do Supabase
-- =============================================

-- Tipos enumerados
CREATE TYPE user_role AS ENUM ('admin', 'professor', 'pai', 'aluno');
CREATE TYPE mood_type AS ENUM ('otimo', 'bom', 'regular', 'ruim');
CREATE TYPE meal_type AS ENUM ('comeu_tudo', 'comeu_bem', 'comeu_pouco', 'nao_comeu');
CREATE TYPE event_type AS ENUM ('prova', 'trabalho', 'reuniao', 'excursao', 'feriado', 'outro');

-- =============================================
-- PERFIS DE USUÁRIO (estende auth.users)
-- =============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT,
  foto_url TEXT,
  role user_role NOT NULL DEFAULT 'pai',
  escola_id UUID, -- preenchido após criar escola
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ESCOLAS
-- =============================================
CREATE TABLE escolas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  logo_url TEXT,
  cor_primaria TEXT DEFAULT '#2563EB',
  endereco TEXT,
  telefone TEXT,
  email TEXT,
  admin_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Adiciona FK de escola em profiles
ALTER TABLE profiles ADD CONSTRAINT profiles_escola_fk
  FOREIGN KEY (escola_id) REFERENCES escolas(id);

-- =============================================
-- TURMAS
-- =============================================
CREATE TABLE turmas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  escola_id UUID NOT NULL REFERENCES escolas(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  ano_letivo INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM NOW()),
  descricao TEXT,
  ativa BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Professores vinculados a turmas (N:N)
CREATE TABLE turma_professores (
  turma_id UUID REFERENCES turmas(id) ON DELETE CASCADE,
  professor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  PRIMARY KEY (turma_id, professor_id)
);

-- =============================================
-- ALUNOS
-- =============================================
CREATE TABLE alunos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  escola_id UUID NOT NULL REFERENCES escolas(id) ON DELETE CASCADE,
  turma_id UUID REFERENCES turmas(id),
  nome TEXT NOT NULL,
  data_nascimento DATE,
  foto_url TEXT,
  observacoes TEXT,
  codigo_convite TEXT UNIQUE DEFAULT SUBSTRING(gen_random_uuid()::TEXT FROM 1 FOR 8),
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Responsáveis vinculados a alunos (N:N)
CREATE TABLE aluno_responsaveis (
  aluno_id UUID REFERENCES alunos(id) ON DELETE CASCADE,
  responsavel_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  parentesco TEXT DEFAULT 'responsável', -- pai, mãe, avó, etc.
  PRIMARY KEY (aluno_id, responsavel_id)
);

-- =============================================
-- RELATÓRIOS DIÁRIOS
-- =============================================
CREATE TABLE relatorios_diarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id UUID NOT NULL REFERENCES alunos(id) ON DELETE CASCADE,
  professor_id UUID NOT NULL REFERENCES profiles(id),
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  humor mood_type,
  alimentacao meal_type,
  dormiu_bem BOOLEAN,
  atividades TEXT,
  observacoes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(aluno_id, data) -- um relatório por aluno por dia
);

-- =============================================
-- FOTOS E GALERIAS
-- =============================================
CREATE TABLE fotos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  turma_id UUID NOT NULL REFERENCES turmas(id) ON DELETE CASCADE,
  professor_id UUID NOT NULL REFERENCES profiles(id),
  url TEXT NOT NULL,
  caption TEXT,
  data DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alunos marcados em fotos
CREATE TABLE foto_alunos (
  foto_id UUID REFERENCES fotos(id) ON DELETE CASCADE,
  aluno_id UUID REFERENCES alunos(id) ON DELETE CASCADE,
  PRIMARY KEY (foto_id, aluno_id)
);

-- =============================================
-- COMUNICADOS
-- =============================================
CREATE TABLE comunicados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  escola_id UUID NOT NULL REFERENCES escolas(id) ON DELETE CASCADE,
  turma_id UUID REFERENCES turmas(id), -- NULL = para escola toda
  autor_id UUID NOT NULL REFERENCES profiles(id),
  titulo TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  tipo TEXT DEFAULT 'geral', -- geral, urgente, informativo
  fixado BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leituras de comunicados
CREATE TABLE comunicado_leituras (
  comunicado_id UUID REFERENCES comunicados(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lido_em TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (comunicado_id, user_id)
);

-- =============================================
-- EVENTOS / AGENDA
-- =============================================
CREATE TABLE eventos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  escola_id UUID NOT NULL REFERENCES escolas(id) ON DELETE CASCADE,
  turma_id UUID REFERENCES turmas(id), -- NULL = para escola toda
  criado_por UUID NOT NULL REFERENCES profiles(id),
  titulo TEXT NOT NULL,
  descricao TEXT,
  tipo event_type DEFAULT 'outro',
  data_inicio TIMESTAMPTZ NOT NULL,
  data_fim TIMESTAMPTZ,
  local TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Confirmações de presença em eventos
CREATE TABLE evento_confirmacoes (
  evento_id UUID REFERENCES eventos(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  confirmado BOOLEAN,
  respondido_em TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (evento_id, user_id)
);

-- =============================================
-- AUTORIZAÇÕES
-- =============================================
CREATE TABLE autorizacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  escola_id UUID NOT NULL REFERENCES escolas(id) ON DELETE CASCADE,
  turma_id UUID REFERENCES turmas(id),
  criado_por UUID NOT NULL REFERENCES profiles(id),
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  data_limite DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Respostas das autorizações
CREATE TABLE autorizacao_respostas (
  autorizacao_id UUID REFERENCES autorizacoes(id) ON DELETE CASCADE,
  responsavel_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  aluno_id UUID REFERENCES alunos(id) ON DELETE CASCADE,
  autorizado BOOLEAN NOT NULL,
  respondido_em TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (autorizacao_id, responsavel_id, aluno_id)
);

-- =============================================
-- NOTIFICAÇÕES
-- =============================================
CREATE TABLE notificacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  tipo TEXT DEFAULT 'info', -- info, alerta, novo_relatorio, nova_foto
  lida BOOLEAN DEFAULT FALSE,
  link TEXT, -- rota interna para navegar ao clicar
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE escolas ENABLE ROW LEVEL SECURITY;
ALTER TABLE turmas ENABLE ROW LEVEL SECURITY;
ALTER TABLE alunos ENABLE ROW LEVEL SECURITY;
ALTER TABLE relatorios_diarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE fotos ENABLE ROW LEVEL SECURITY;
ALTER TABLE comunicados ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE autorizacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notificacoes ENABLE ROW LEVEL SECURITY;

-- Profiles: cada um vê o próprio perfil; admin vê todos da escola
CREATE POLICY "profiles_self" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_escola" ON profiles FOR SELECT USING (
  escola_id = (SELECT escola_id FROM profiles WHERE id = auth.uid())
);
CREATE POLICY "profiles_update_self" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Escolas: membros da escola veem sua escola
CREATE POLICY "escolas_read" ON escolas FOR SELECT USING (
  id = (SELECT escola_id FROM profiles WHERE id = auth.uid())
);

-- Turmas: todos da escola veem; só admin/professor gerenciam
CREATE POLICY "turmas_read" ON turmas FOR SELECT USING (
  escola_id = (SELECT escola_id FROM profiles WHERE id = auth.uid())
);
CREATE POLICY "turmas_write" ON turmas FOR ALL USING (
  escola_id = (SELECT escola_id FROM profiles WHERE id = auth.uid())
  AND (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'professor')
);

-- Alunos: pai só vê filhos vinculados
CREATE POLICY "alunos_escola" ON alunos FOR SELECT USING (
  escola_id = (SELECT escola_id FROM profiles WHERE id = auth.uid())
  AND (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'professor')
);
CREATE POLICY "alunos_pai" ON alunos FOR SELECT USING (
  id IN (SELECT aluno_id FROM aluno_responsaveis WHERE responsavel_id = auth.uid())
);

-- Relatórios: professor cria; pai vê apenas dos filhos
CREATE POLICY "relatorios_professor" ON relatorios_diarios FOR ALL USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'professor')
  AND aluno_id IN (
    SELECT a.id FROM alunos a
    JOIN turma_professores tp ON tp.turma_id = a.turma_id
    WHERE tp.professor_id = auth.uid()
    OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  )
);
CREATE POLICY "relatorios_pai" ON relatorios_diarios FOR SELECT USING (
  aluno_id IN (SELECT aluno_id FROM aluno_responsaveis WHERE responsavel_id = auth.uid())
);

-- Fotos: turma da escola; pai vê apenas fotos dos filhos
CREATE POLICY "fotos_escola" ON fotos FOR SELECT USING (
  turma_id IN (SELECT id FROM turmas WHERE escola_id = (SELECT escola_id FROM profiles WHERE id = auth.uid()))
  AND (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'professor')
);
CREATE POLICY "fotos_pai" ON fotos FOR SELECT USING (
  id IN (SELECT foto_id FROM foto_alunos fa JOIN aluno_responsaveis ar ON fa.aluno_id = ar.aluno_id WHERE ar.responsavel_id = auth.uid())
);
CREATE POLICY "fotos_write" ON fotos FOR INSERT WITH CHECK (
  (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'professor')
);

-- Comunicados, eventos, autorizações: escola inteira lê
CREATE POLICY "comunicados_read" ON comunicados FOR SELECT USING (
  escola_id = (SELECT escola_id FROM profiles WHERE id = auth.uid())
);
CREATE POLICY "comunicados_write" ON comunicados FOR ALL USING (
  escola_id = (SELECT escola_id FROM profiles WHERE id = auth.uid())
  AND (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'professor')
);
CREATE POLICY "eventos_read" ON eventos FOR SELECT USING (
  escola_id = (SELECT escola_id FROM profiles WHERE id = auth.uid())
);
CREATE POLICY "eventos_write" ON eventos FOR ALL USING (
  escola_id = (SELECT escola_id FROM profiles WHERE id = auth.uid())
  AND (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'professor')
);
CREATE POLICY "autorizacoes_read" ON autorizacoes FOR SELECT USING (
  escola_id = (SELECT escola_id FROM profiles WHERE id = auth.uid())
);
CREATE POLICY "autorizacoes_write" ON autorizacoes FOR ALL USING (
  escola_id = (SELECT escola_id FROM profiles WHERE id = auth.uid())
  AND (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'professor')
);

-- Notificações: só o próprio usuário vê
CREATE POLICY "notificacoes_self" ON notificacoes FOR ALL USING (user_id = auth.uid());

-- =============================================
-- FUNÇÃO: criar profile após signup
-- =============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, nome, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'pai')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =============================================
-- STORAGE BUCKETS (execute separado no dashboard)
-- =============================================
-- Crie os seguintes buckets em Storage > Buckets:
-- 1. "fotos-alunos"     → público: false
-- 2. "fotos-perfil"     → público: true
-- 3. "documentos"       → público: false
