# Roadmap MVP

## Fase 0 - Fundacao
- Definir stack e padrao de repositorio
- Configurar CI basica
- Modelo de dados inicial

## Fase 1 - Cadastros e Acesso
- Autenticacao por login/senha
- Cadastro de escola, turma e professor responsavel
- RBAC (admin/professor/aluno)

## Fase 2 - Conteudo e Contexto
- Cadastro de livro
- Upload de material textual
- Indexacao e retrieval por livro

## Fase 3 - Atividades e Lembretes
- Criacao de atividade por turma
- Definicao de periodo de exame
- Modo individual (livro por aluno)
- Modo projeto literario (pool de livros)
- Envio de email de convite e lembretes

## Fase 4 - Chat Avaliativo
- Sessao autenticada do aluno
- Orquestracao de perguntas adaptativas
- Regras de encerramento da sessao

## Fase 5 - Scoring e Parecer
- Rubrica configuravel
- Score por criterio
- Parecer textual com confianca
- Evidencias por pergunta/resposta

## Fase 6 - Rodizio e Painel Docente
- Motor de rodizio por ciclo
- Restricoes de nao repeticao
- Lista de avaliacoes e pendencias
- Revisao e ajuste do parecer
- Historico por aluno/turma/livro

## Fase 7 - Observabilidade e Hardening
- Auditoria completa
- Metricas de latencia e qualidade
- Politicas de retencao de dados

## Entregavel da primeira sprint util
- Fluxo ponta a ponta com:
  - 1 turma
  - 1 atividade com prazo
  - atribuicao de livro por aluno
  - envio de email inicial
  - avaliacao em chat e relatorio final
