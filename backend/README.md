# LivroAberto Backend

API NestJS para projeto literario escolar.

## Funcionalidades implementadas
- Auth (registro, login, JWT)
- RBAC (admin, professor, aluno)
- Escolas
- Turmas (professor responsavel e alunos)
- Livros (cadastro + upload de PDF + extracao + chunking)
- Atividades (individual/projeto literario)
- Rubrica configuravel por professor na criacao da atividade
- Sessoes de avaliacao (inicio, mensagens, encerramento)
- Resultado inicial da avaliacao com score e confianca

## Banco (PostgreSQL no Docker)
```bash
npm run db:up
npx prisma migrate dev
```

## Executar
```bash
npm run start:dev
```

## Endpoints principais
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `POST /schools`, `GET /schools`
- `POST /classes`, `GET /classes`
- `POST /classes/:id/responsible-teacher`
- `POST /classes/:id/students`
- `POST /books`, `GET /books`
- `POST /books/:id/upload-pdf`
- `GET /books/:id/chunks`
- `POST /activities`, `GET /activities`, `GET /activities/:id`
- `POST /activities/:id/assign-book`
- `POST /evaluations/sessions/start`
- `POST /evaluations/sessions/:id/messages`
- `POST /evaluations/sessions/:id/complete`
- `GET /evaluations/results`

## Regras de rubrica
Na criacao da atividade, o professor define:
- `rubricFactualWeight`
- `rubricCharacterWeight`
- `rubricInterpretWeight`
- `rubricConsistencyWeight`
- `rubricEvidenceWeight`

A API valida soma exata de 100.
