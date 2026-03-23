# SRS - Sistema de Avaliacao de Leitura por Chat com IA

## 1. Objetivo
Desenvolver um sistema para avaliar, por conversa em chat, se o aluno leu e compreendeu um livro definido pela escola.

## 2. Escopo
Inclui:
- Cadastro de usuarios, escolas, turmas e professores responsaveis
- Cadastro de livros e turmas
- Criacao de atividades com periodo de exame
- Definicao de livro por aluno ou grupo de livros por turma
- Envio de lembretes por email para alunos
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
- RF-07 Criacao de atividade por professora/professor para uma turma
- RF-08 Definicao de periodo de exame (inicio/fim)
- RF-09 Modo de atividade `individual`: definir livro por aluno
- RF-10 Modo de atividade `projeto_literario`: definir pool de livros da turma
- RF-11 Escolha de livro pelo aluno dentro do pool (quando habilitado)
- RF-12 Geracao automatica de rodizio de livros por ciclos
- RF-13 Envio de email de convite e lembretes da atividade
- RF-14 Inicio de sessao autenticada de aluno
- RF-15 Chat avaliativo adaptativo
- RF-16 Scoring por rubrica
- RF-17 Parecer com confianca
- RF-18 Relatorio com evidencias
- RF-19 Revisao docente
- RF-20 Historico e auditoria

## 4. Requisitos Nao Funcionais (MVP)
- Privacidade (LGPD)
- Seguranca (auth, autorizacao, criptografia em transito)
- Latencia media do chat <= 5s
- Observabilidade (logs, metricas, auditoria)
- Explicabilidade (justificativas no parecer)
- Entrega de email com retentativa e log de envio

## 5. Regras de Negocio
- Uma sessao avalia um unico livro
- IA nao e veredito final isolado
- IA nao revela resposta correta durante avaliacao
- Casos de baixa confianca exigem revisao humana
- Todos os perfis acessam por login e senha
- Professor possui as mesmas permissoes operacionais do admin, exceto excluir alunos
- Cada atividade pertence a uma unica turma
- Atividade sempre tem data limite de exame
- Em `projeto_literario`, cada aluno deve ler livro diferente dos colegas no mesmo ciclo
- Em `projeto_literario`, o sistema deve impedir repeticao de livro para o mesmo aluno ate cobrir o pool
- Se `projeto_literario` exigir livros distintos no mesmo ciclo, quantidade de livros ativos deve ser >= quantidade de alunos ativos

## 6. Perfis e Permissoes (MVP)
- Admin: gestao completa de escola, turmas, livros, atividades, usuarios e exclusao de aluno
- Professor: gestao completa de escola, turmas, livros, atividades, usuarios, sem permissao para excluir aluno
- Aluno: participa das atividades, escolhe livro quando permitido, consulta seu historico permitido

## 7. Fluxo de Cadastro Inicial
1. Criar usuario com role admin ou professor.
2. Cadastrar escola.
3. Cadastrar turma vinculada a escola.
4. Definir professor responsavel da turma.
5. Cadastrar alunos na turma.
6. Cadastrar livro e subir base textual.
7. Criar atividade para turma.
8. Definir prazo final e configuracao de atribuicao de livros.
9. Enviar email inicial para os alunos.

## 8. Fluxo do Projeto Literario com Rodizio
1. Professora cria atividade no modo `projeto_literario` e escolhe pool de livros.
2. Sistema abre janela para escolha inicial dos alunos (ou distribuicao automatica).
3. Fecha o ciclo na data limite de exame.
4. Alunos realizam avaliacao por chat do livro do ciclo.
5. Sistema marca livros ja lidos por aluno.
6. Novo ciclo e aberto com livros ainda nao lidos por cada aluno.
7. Rodizio continua ate todos da turma lerem todos os livros do pool (ou ate encerramento manual da atividade).

## 9. Rubrica Inicial
- Conhecimento factual do enredo: 30%
- Personagens e motivacoes: 20%
- Interpretacao de temas: 20%
- Consistencia entre respostas: 15%
- Especificidade/evidencias de leitura: 15%

## 10. Criterios de Aceite do MVP
- Cadastro de usuario, escola, turma e professor responsavel
- Autenticacao por login e senha para todos os perfis
- Criacao de atividade com prazo final de exame
- Modo individual e modo projeto literario disponiveis
- Envio de email de lembrete da atividade ao aluno
- Cadastro de livro e indexacao de base textual
- Sessao de chat concluida por aluno
- Minimo de 8 perguntas adaptativas
- Score + parecer final
- Relatorio para professor
- Historico da sessao
- Flag de baixa confianca
