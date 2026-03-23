# Arquitetura Tecnica do MVP

## Visao Geral
Arquitetura em camadas para separar cadastro, conversa, avaliacao e auditoria.

Componentes:
- Frontend Web (login, gestao escolar, chat do aluno, painel do professor)
- API Backend (auth, RBAC, sessoes, regras, relatorios)
- Banco Relacional (usuarios, escolas, turmas, vinculos, livros, sessoes, scores)
- Armazenamento de documentos (fontes dos livros)
- Pipeline RAG (chunking + embeddings + retrieval)
- LLM Orchestrator (conducao da entrevista)
- Scoring Engine (rubrica e confianca)

## Fluxo de Cadastro e Configuracao
1. Usuario admin/professor cria conta com login e senha.
2. Usuario cadastra escola.
3. Usuario cadastra turma vinculada a escola.
4. Usuario define professor responsavel da turma.
5. Usuario cadastra alunos na turma.
6. Usuario cadastra livro e envia arquivo textual.
7. Sistema indexa o livro para RAG.
8. Professor cria avaliacao para turma e livro.

## Fluxo de Avaliacao
1. Aluno faz login com usuario e senha.
2. Aluno inicia sessao autenticada.
3. Orchestrator gera perguntas com base na rubrica e no contexto recuperado.
4. Scoring parcial acompanha consistencia e profundidade.
5. Ao encerrar, sistema gera score, parecer e evidencias.
6. Professor revisa e consolida resultado.

## Modelo de Dados (alto nivel)
- users(id, role, name, email, password_hash, status)
- schools(id, name, code, created_by)
- classes(id, school_id, name, grade_year)
- class_teachers(id, class_id, teacher_user_id, is_responsible)
- class_students(id, class_id, student_user_id)
- books(id, title, author, rights_mode)
- book_sources(id, book_id, version, file_url, mime_type)
- evaluations(id, class_id, book_id, start_at, end_at, config)
- sessions(id, evaluation_id, student_id, started_at, ended_at, status)
- messages(id, session_id, role, content, created_at)
- scores(id, session_id, factual, interpretive, consistency, evidence, confidence, final_score)
- reviews(id, session_id, teacher_id, decision, notes)
- audit_logs(id, actor_id, action, payload, created_at)

## RBAC (MVP)
- Admin: todas as operacoes, incluindo exclusao de aluno.
- Professor: mesmas operacoes do admin no MVP, exceto exclusao de aluno.
- Aluno: acesso a sessoes proprias de avaliacao.

## Decisoes de Design
- Nao enviar livro inteiro no prompt; usar RAG por trecho.
- Separar etapa de entrevista da etapa de scoring final.
- Persistir evidencias estruturadas para contestacao pedagogica.
- Exigir revisao humana quando confianca < limiar.

## Seguranca e Compliance
- Autenticacao por login e senha com hash forte (Argon2 ou bcrypt).
- RBAC por perfil (aluno/professor/admin).
- Criptografia TLS em trafego.
- Minimizacao de dados pessoais.
- Base legal de direitos autorais para obras nao publicas.
- Trilhas de auditoria com versao de prompt/modelo/base do livro.
