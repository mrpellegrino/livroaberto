# SRS - Sistema de Avaliacao de Leitura por Chat com IA

## 1. Objetivo
Desenvolver um sistema para avaliar, por conversa em chat, se o aluno leu e compreendeu um livro definido pela escola.

## 2. Escopo
Inclui:
- Cadastro de usuarios, escolas, turmas e professores responsaveis
- Cadastro de livros e turmas
- Base de contexto da obra
- Sessao avaliativa por chat
- Perguntas factuais e interpretativas
- Scoring e parecer
- Relatorio para professor

Nao inclui (MVP):
- Correcao 100% autonoma sem revisao humana
- Deteccao infalivel de fraude
- Integracao com LMS/ERP

## 3. Requisitos Funcionais (MVP)
- RF-01 Cadastro de usuario com login e senha
- RF-02 Cadastro de escola
- RF-03 Cadastro de turma vinculada a escola
- RF-04 Cadastro de professor responsavel da turma
- RF-05 Cadastro de livros
- RF-06 Indexacao da base de contexto
- RF-07 Criacao de avaliacao por professor
- RF-08 Inicio de sessao autenticada de aluno
- RF-09 Chat avaliativo adaptativo
- RF-10 Scoring por rubrica
- RF-11 Parecer com confianca
- RF-12 Relatorio com evidencias
- RF-13 Revisao docente
- RF-14 Historico e auditoria

## 4. Requisitos Nao Funcionais (MVP)
- Privacidade (LGPD)
- Seguranca (auth, autorizacao, criptografia em transito)
- Latencia media do chat <= 5s
- Observabilidade (logs, metricas, auditoria)
- Explicabilidade (justificativas no parecer)

## 5. Regras de Negocio
- Uma sessao avalia um unico livro
- IA nao e veredito final isolado
- IA nao revela resposta correta durante avaliacao
- Casos de baixa confianca exigem revisao humana
- Todos os perfis acessam por login e senha
- Professor possui as mesmas permissoes operacionais do admin, exceto excluir alunos

## 6. Perfis e Permissoes (MVP)
- Admin: gestao completa de escola, turmas, livros, avaliacoes, usuarios e exclusao de aluno
- Professor: gestao completa de escola, turmas, livros, avaliacoes, usuarios, sem permissao para excluir aluno
- Aluno: participa das avaliacoes, consulta seu historico permitido

## 7. Fluxo de Cadastro Inicial
1. Criar usuario com role admin ou professor.
2. Cadastrar escola.
3. Cadastrar turma vinculada a escola.
4. Definir professor responsavel da turma.
5. Cadastrar alunos na turma.
6. Cadastrar livro e subir base textual.
7. Criar avaliacao para turma/livro.

## 8. Rubrica Inicial
- Conhecimento factual do enredo: 30%
- Personagens e motivacoes: 20%
- Interpretacao de temas: 20%
- Consistencia entre respostas: 15%
- Especificidade/evidencias de leitura: 15%

## 9. Criterios de Aceite do MVP
- Cadastro de usuario, escola, turma e professor responsavel
- Autenticacao por login e senha para todos os perfis
- Cadastro de livro e indexacao de base textual
- Sessao de chat concluida por aluno
- Minimo de 8 perguntas adaptativas
- Score + parecer final
- Relatorio para professor
- Historico da sessao
- Flag de baixa confianca
