# Migracao Antygravity -> Codex

Este projeto possui material em `.agents` (skills, rules e workflows). O Codex usa skills em `~/.codex/skills`.

Para duplicar e adaptar automaticamente:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\sync-antygravity-to-codex.ps1
```

## O que o script faz

- Copia todos os skills de `.agents/skills` para `~/.codex/skills` com prefixo `ag-`.
- Converte `.agents/rules/*.md` em skills `ag-rule-*`.
- Converte `.agents/workflows/*.md` em skills `ag-workflow-*`.

## Resultado esperado

Depois do sync, o Codex consegue usar naturalmente os skills migrados quando o pedido do usuario combinar com os nomes e descricoes dos skills `ag-*`.
