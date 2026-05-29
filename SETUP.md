# Agenda Escolar Digital — Setup

## Stack
- **Next.js 15** (App Router)
- **Supabase** (banco, auth, storage, realtime)
- **Tailwind CSS**
- **TypeScript**

---

## 1. Supabase

1. Acesse [supabase.com](https://supabase.com) e crie um projeto
2. No SQL Editor, execute o arquivo `supabase/schema.sql`
3. Em **Storage > Buckets**, crie 3 buckets:
   - `fotos-alunos` (privado)
   - `fotos-perfil` (público)
   - `documentos` (privado)
4. Copie a **Project URL** e a **anon key** de Settings > API

---

## 2. Variáveis de ambiente

Renomeie `.env.local.example` para `.env.local` e preencha:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key
```

---

## 3. Instalar e rodar

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

---

## 4. Primeiro uso

1. Acesse `/auth/login`
2. Crie um usuário manualmente no **Supabase > Authentication > Users**
3. No SQL Editor, defina-o como admin:
   ```sql
   UPDATE profiles SET role = 'admin', escola_id = NULL WHERE email = 'seu@email.com';
   ```
4. Crie a escola via SQL (por enquanto):
   ```sql
   INSERT INTO escolas (nome, admin_id)
   VALUES ('Nome da Escola', 'uuid-do-admin');
   
   UPDATE profiles SET escola_id = 'uuid-da-escola' WHERE email = 'seu@email.com';
   ```
5. Faça login como admin e acesse `/admin`
6. Crie turmas e alunos pelo painel
7. Copie o código de convite de cada aluno e envie para os pais

---

## 5. Deploy (Vercel)

```bash
npm i -g vercel
vercel --prod
```

Configure as variáveis de ambiente no painel da Vercel.

---

## Estrutura de pastas

```
app/
├── auth/          → Login e registro
├── admin/         → Painel admin (escola)
├── professor/     → Painel professor
└── pais/          → Painel dos responsáveis
```

---

## Próximas melhorias sugeridas

- [ ] Notificações push (PWA + Firebase FCM)
- [ ] Chat direto professor ↔ pai
- [ ] Gestão de eventos com RSVP
- [ ] App mobile nativo (React Native)
- [ ] Relatórios em PDF para exportação
- [ ] Painel financeiro (cobranças/autorizações de pagamento)
