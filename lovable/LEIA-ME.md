# `lovable/` · as peças do Claude para o projeto do Lovable (decisão do Diogo, 25/10/2026)

O site segue pela versão do Lovable (TanStack Start). Estas peças entram lá pelo GitHub assim que o Diogo ligar o projeto do Lovable a um
repositório; até lá vivem aqui, prontas e verificadas (`node --experimental-strip-types lovable/verificar.mjs`). Nada disto é desenho.

| Ficheiro | O que é | Onde entra no projeto do Lovable |
|---|---|---|
| `src/lib/datas.ts` | datas ISO ao meio-dia, formatos pt-PT, euros | `src/lib/datas.ts` |
| `src/lib/tarifas.ts` | tarifa privada 2026/2027, épocas, mínimo 2, verão sáb→sáb, mensal nov–mar, limpeza do ano, `orcamento()` na forma da porta #190, `porDoSol()` | substitui `src/lib/stay.ts` (330 € fixos) |
| `src/lib/tempo.ts` | Open-Meteo (16 dias), classes WMO, tempo da estadia com «média histórica», semana de exemplo | o painel «Verificar disponibilidade» (hoje com `WEATHER` fixo) |
| `src/lib/ocupacao.ts` | leitura da porta #189, noites ocupadas (saída exclusiva), `intervaloLivre()`, ocupação de exemplo | o calendário do painel (hoje com `MONTHS` fixo) |
| `src/lib/pedido.ts` | pedido na forma da porta #191, textos de WhatsApp/email, `enviarPrereserva()` só no servidor | formulário «Pedir estas datas» + server function com `X-Site-Chave` |
| `src/lib/factos.ts` | factos ✓ do FACTOS.md e ligações oficiais | textos, rodapé, `data-liga` |
| `src/lib/seo.ts` | JSON-LD `VacationRental`/`LodgingBusiness` e `FAQPage`, `robots.txt`, `llms.txt` | `__root.tsx` (head) e rotas `/robots.txt`, `/llms.txt`, `/sitemap.xml` |
| `src/test/tarifas.test.ts` | os mesmos casos em vitest | `src/test/` |

Regras: factos só do `FACTOS.md` com ✓; «Reguengo» só na morada postal; a conta do site é pré-visualização (a app confirma no pedido);
a linha «Dados: Open-Meteo» é obrigatória onde o tempo aparece; a chave da porta #191 nunca sai do servidor.

## O Lovable como tela de desenho (desde 1/11/2026: o site é em PHP, na Amen)

O site a sério é a pasta `site/` (PHP). O projeto do Lovable ficou para desenhar: quando o conteúdo muda de forma, compõe-se lá e passa-se
a composição para o `site/`.

- **`composicao-2026-11-16/`** · a composição que deu origem à **versão 3** do site. Pedido do Diogo de 16/11/2026, depois de ver a
  versão 2 no iPhone: «Trabalha com o Lovable para que o conteúdo passe a estar harmonioso.»
  - `pedido-ao-lovable.md`: o pedido que o Claude enviou ao agente do Lovable (o conteúdo novo, as queixas e as regras técnicas).
  - `index.tsx` e `styles.css`: o que o Lovable devolveu (a página inteira e os estilos), tal e qual, para consulta. Não é código do
    site: foi passado à mão para `site/partes/`, `site/assets/css/site.css` e `site/assets/js/site.js`, com outra construção por baixo
    (ver o cimo desses dois ficheiros) e com a capa que o Diogo escolheu a 15/11 em vez da do Lovable.
  - `pedido-seguinte-por-enviar.md`: **por enviar.** A 16/11 o Diogo perguntou se as notas de 15/11 tinham sido passadas ao Lovable.
    A conferência (documento das notas de 15/11, secção 6) mostrou que o pedido da manhã não levou a decisão da capa («capa: 1»)
    nem as palavras dele sobre as fotografias («não precisa de dizer que tem fotos», «a rolar random»), e que a composição mudou
    o desenho de «Antes de chegar». No site (`site/`) isso ficou reposto a 17/11; este ficheiro é o pedido para a pré-visualização
    do Lovable ficar igual. O Lovable recusou-o por falta de créditos (plano gratuito); envia-se quando voltarem ou quando o Diogo
    mandar pôr créditos. Até lá, **a pré-visualização do Lovable não é a referência: a referência é o site em `novo.`**
- **`capturas/2026-11-16/`** · essa composição fotografada, no telemóvel e no computador (montada na sessão com as fotografias reais).
- Para a ver ao vivo, com dados de exemplo: a pré-visualização do projeto no Lovable (a ligação está em `docs/versoes/REGISTO.md`, ficha
  da V3). O Lovable não foi publicado nem ligado a serviços, e não se compraram créditos.
