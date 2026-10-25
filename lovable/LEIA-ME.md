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
