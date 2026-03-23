# Formato de Upload de Livro (MVP)

## Recomendado
- `.txt` em UTF-8
- Um capitulo por bloco com titulo claro
- Sem cabecalho/rodape repetido

## Aceito no MVP
- `.txt` (prioritario)
- `.pdf` textual (nao escaneado)
- `.docx`

## Nao recomendado no MVP inicial
- PDF escaneado (imagem)
- EPUB com estrutura complexa
- Arquivos com DRM

## Regras de Ingestao
- Tamanho maximo por arquivo: 20 MB
- Idioma principal: pt-BR
- O sistema extrai texto, divide em trechos e indexa para RAG
- Metadados obrigatorios: titulo, autor, edicao/ano (quando houver), fonte/licenca

## Critico para qualidade
- Quanto mais limpo o texto, melhor a qualidade das perguntas e do scoring.
- Em obras protegidas, subir apenas conteudo com autorizacao/licenca valida.
