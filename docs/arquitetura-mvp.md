# Arquitetura Tecnica do MVP

## Visao Geral
Arquitetura em camadas para separar cadastro, atividades, conversa, avaliacao e auditoria.

Componentes:
- Frontend Web (login, gestao escolar, atividades, chat do aluno, painel do professor)
- API Backend (auth, RBAC, atividades, sessoes, regras, relatorios)
- Banco Relacional (usuarios, escolas, turmas, vinculos, livros, atividades, scores)
- Armazenamento de documentos (fontes dos livros)
- Pipeline RAG (chunking + embeddings + retrieval)
- LLM Orchestrator (conducao da entrevista)
- Scoring Engine (rubrica e confianca)
- Notificacao por Email (convite, lembrete e vencimento)
- Job Scheduler (disparo de lembretes e fechamento de ciclo)

## Fluxo de Cadastro e Configuracao
1. Usuario admin/professor cria conta com login e senha.
2. Usuario cadastra escola.
3. Usuario cadastra turma vinculada a escola.
4. Usuario define professor responsavel da turma.
5. Usuario cadastra alunos na turma.
6. Usuario cadastra livro e envia arquivo textual.
7. Sistema indexa o livro para RAG.
8. Professor cria atividade para turma com data final de exame.

## Fluxo de Atividade
1. Professora cria atividade com modo `individual` ou `projeto_literario`.
2. Em `individual`, professora define livro por aluno.
3. Em `projeto_literario`, professora define pool de livros e regra de escolha/distribuicao.
4. Sistema envia email inicial para os alunos.
5. Scheduler envia lembretes em D-7, D-3 e D-1 (configuravel).
6. Aluno conclui avaliacao por chat dentro da janela.
7. Em projeto literario, sistema gera proximo ciclo de rodizio.

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
- activities(id, class_id, mode, title, exam_start_at, exam_end_at, allow_student_choice, status)
- activity_books(id, activity_id, book_id)
- activity_student_books(id, activity_id, cycle_no, student_id, book_id, assigned_by)
- activity_cycles(id, activity_id, cycle_no, start_at, end_at, status)
- evaluations(id, activity_id, class_id, book_id, start_at, end_at, config)
- sessions(id, evaluation_id, student_id, started_at, ended_at, status)
- messages(id, session_id, role, content, created_at)
- scores(id, session_id, factual, interpretive, consistency, evidence, confidence, final_score)
- reviews(id, session_id, teacher_id, decision, notes)
- email_notifications(id, user_id, activity_id, template, scheduled_at, sent_at, status)
- audit_logs(id, actor_id, action, payload, created_at)

## RBAC (MVP)
- Admin: todas as operacoes, incluindo exclusao de aluno.
- Professor: mesmas operacoes do admin no MVP, exceto exclusao de aluno.
- Aluno: acesso a sessoes proprias, escolha de livro quando habilitada.

## Regras de Rodizio (Projeto Literario)
- Restricao de ciclo: um aluno nao pode repetir livro ate cobrir todo o pool.
- Restricao de turma: no mesmo ciclo, livro nao pode ser duplicado entre alunos quando o modo for livros distintos.
- Pre-condicao: para livros distintos no mesmo ciclo, total de livros ativos >= total de alunos ativos.
- Encerramento: atividade encerra quando todos os alunos lerem todos os livros ou por acao docente.

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
