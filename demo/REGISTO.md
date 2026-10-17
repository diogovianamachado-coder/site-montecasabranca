# Demo · registo de revisões

Uma linha por revisão da demo. A revisão atual está em `versao.json`; cada uma pode reproduzir-se pelo commit do site indicado (`git checkout <commit>` e `python3 demo/ferramentas/demo.py servir`). Estados: preparação técnica · rascunho · aprovado · rejeitado. **Só o Diogo aprova, por escrito, em `docs/decisoes/aprovadas.md`**; esta tabela regista, não decide.

**Ligação principal (mostra sempre a revisão mais recente):** https://claude.ai/artifact/DdiLqNNHdNeJnF61d4cr3S
**Ligação fixa por revisão (S29):** na coluna respetiva; não muda depois de publicada. **Capturas por revisão (S28):** `demo/capturas/rN/`.

| Revisão | Data | Estado | O que contém | Entrega de design (commit) | Commit do site | Ligação fixa da revisão | Validação |
|---|---|---|---|---|---|---|---|
| r0 | 2026-10-17 | preparação técnica | Página neutra «Demo em preparação» + zona de revisão `revisao.html`; ferramenta `demo.py`; capturas | nenhuma (sem desenho indicado para implementação) | 0b59571 (base) e o commit «SITE · demo · S28–S30» (capturas, ligação fixa, workflow) | https://claude.ai/artifact/Ld3NMAqtE7cyCNxv2Ud7cV | `demo.py testar` OK · capturas 390/1280 sem rolagem horizontal nem erros de consola |

## r0 · 2026-10-17 · preparação técnica

- **Conteúdo:** nenhuma composição implementada. A entrada diz «Demo em preparação»; a zona de revisão mostra revisão, estado, entrega de design, commit e endereço.
- **Commit do site:** 0b59571 (base técnica) e o commit «SITE · demo · S28–S30» (capturas versionadas, ligação fixa, página de revisões, workflow «Capturas»); carimbado em `versao.js` pela ferramenta.
- **Ligação fixa r0:** https://claude.ai/artifact/Ld3NMAqtE7cyCNxv2Ud7cV (privada, claude.ai). Capturas em `demo/capturas/r0/`.
- **Validação:** `python3 demo/ferramentas/demo.py testar` (estrutura HTML, metas, `noindex`, ligações locais, recursos externos, JS) e `node demo/ferramentas/captura.cjs` (Chromium a 390 e 1280 px; sem rolagem horizontal, sem erros de consola, sem pedidos falhados). Capturas em `demo/_saida/capturas/` (não versionadas).
- **Limites:** sem app, sem dados reais, sem fotografias, PT apenas.
