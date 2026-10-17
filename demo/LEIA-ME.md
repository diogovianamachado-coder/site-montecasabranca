# Demo de teste · Monte Casa Branca

Área isolada para a **demo navegável** pedida pelo Diogo a 17/10/2026 (instrução em
`docs/decisoes/2026-10-17_demo_incremental_handoff_claude.md`). É código do Claude, dentro do
acordo v1.2: não muda os donos de `design/` (ChatGPT), `public/` nem `src/` (produção do Claude,
só depois do «passa ao Claude»). Nada aqui publica o site, toca no domínio, na Amen, no DNS,
no Linktree, nos workflows ou na app.

## O que há aqui

| Caminho | O que é |
|---|---|
| `site/` | As páginas da demo: HTML, CSS e JS estáticos, abrem do ficheiro, sem build obrigatório. É o que o Diogo testa. |
| `site/versao.js` | Gerado por `demo.py` a partir de `versao.json`; não se edita à mão. |
| `versao.json` | Identificação da revisão atual: número (`r0`, `r1`…), estado, entrega de design implementada e commit dela, páginas e estado de cada uma. |
| `REGISTO.md` | Histórico de revisões: rascunho, aprovado ou rejeitado, com commit e endereço, para se poder voltar atrás. |
| `ferramentas/demo.py` | Python 3, biblioteca padrão: `testar`, `construir`, `servir`, `empacotar`, `artefacto`. |
| `ferramentas/captura.cjs` | Capturas a 390 e 1280 px com Playwright/Chromium, opcional. |
| `_saida/`, `_pacotes/` | Gerados; ignorados pelo git. |

A zona de revisão (`site/revisao.html`) mostra que revisão, entrega de design e commit estão
implementados. A identificação técnica fica aí e no rodapé, não no conteúdo turístico.

## Abrir e testar

1. **Do ficheiro:** abrir `demo/site/index.html` num navegador. O commit aparece como «não carimbado».
2. **Servidor local:** `python3 demo/ferramentas/demo.py servir` e abrir `http://127.0.0.1:8787/`.
   Constrói `demo/_saida/` com o commit carimbado e serve com `no-store` e `X-Robots-Tag: noindex`.
3. **Testes:** `python3 demo/ferramentas/demo.py testar` (sai com 1 se falhar). Verifica: doctype,
   `lang="pt"`, `<title>`, viewport, `noindex` em todas as páginas, um `h1`, ids únicos, ligações e
   âncoras locais existentes, nenhum recurso externo fora do Google Fonts, imagens com linha em
   `docs/fotografia/creditos.md`, sintaxe JS, `versao.json` coerente com `REGISTO.md` e `versao.js`.
4. **Capturas:** com o servidor a correr, `NODE_PATH=$(npm root -g) node demo/ferramentas/captura.cjs`.
   Grava PNG em `demo/_saida/capturas/` e falha com rolagem horizontal, erros de consola ou pedidos falhados.
5. **Pacote estático:** `python3 demo/ferramentas/demo.py empacotar` cria `demo/_pacotes/demo-<rev>-<commit>.zip`
   com a demo construída, para quem precise de a abrir noutro lado.

## Endereço de teste no telemóvel

Não existe no repositório nenhum ambiente de preview configurado (repositório privado, GitHub Pages
desligado, sem workflows). O único canal com evidência nas sessões do Claude é a **página privada do
claude.ai** (ferramenta Artifact): o Claude publica a demo construída numa ligação `claude.ai/artifact/…`
privada por omissão, que o Diogo abre no iPhone com a conta dele. A mesma ligação mantém-se de revisão
para revisão; a página de revisão diz sempre que revisão e commit estão lá.

Limites desse canal: não é um domínio do Monte, só o Diogo (ou quem ele partilhar) a vê, e a página de
entrada é embrulhada pelo claude.ai (por isso `demo.py artefacto` gera a variante). Um endereço de ensaio
próprio (`novo.montecasabranca.pt`, proposta do acordo, secção 9) depende do painel da Amen e é tarefa do
Diogo; até lá a demo não vai para nenhum servidor público.

## Como entram os avanços de design

Por cada entrega do ChatGPT (HTML/CSS editáveis em `design/`, recursos reais, commit, instruções mobile
e desktop), o Claude:

1. Implementa em `demo/site/`, sem copiar `interacao.js` das propostas rejeitadas.
2. Sobe a revisão em `versao.json` (`r1`, `r2`…), com `design.entrega` e `design.commit`, e estado
   **rascunho** até apreciação do Diogo.
3. Regista a linha em `REGISTO.md`, corre `testar` e as capturas, faz commit «SITE · demo rN · …» e
   republica o endereço de teste.
4. Avisa na conversa antes de substituir uma revisão em apreciação; a anterior reproduz-se pelo commit.

Aprovado, rejeitado e rascunho ficam separados no registo. Nunca se presume aprovação por silêncio.

## Regras de conteúdo nesta fase

- Preço, disponibilidade e tempo só como exemplos identificados; sem pré-reservas, sem mensagens enviadas.
- Sem ligação à app, sem portas, sem dados de hóspedes.
- Fotografias só com origem e autorização em `docs/fotografia/creditos.md` (o teste falha sem linha).
- Diogo e anfitrião são a mesma pessoa; saída tardia ao domingo só sem entrada nesse dia e combinada.
- Sem área do terreno enquanto 3,2 / 3,6 ha não estiver harmonizado.
- PT primeiro; EN entra na publicação.

## Estado atual

- **Revisão:** r0 · preparação técnica · 2026-10-17.
- **Commit do site:** o commit «SITE · demo r0 · base técnica» no `git log`; carimbado em `versao.js` por `demo.py construir`.
- **Endereço de teste:** https://claude.ai/artifact/DdiLqNNHdNeJnF61d4cr3S (página privada do claude.ai; abre no iPhone com a conta do Diogo).
