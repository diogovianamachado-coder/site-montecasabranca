# Prancha editorial aprovada em termos de design · 19/10/2026

**Ficheiro:** `prancha-editorial-fotos-reais.png` (1536 × 1024). É a «primeira prancha editorial, reconstruída com fotografias reais do
Monte Casa Branca» do fecho do ChatGPT de 19/10 (`docs/decisoes/2026-10-19_fecho_chatgpt_design_kpi.md`).

**Proveniência:** feita pelo ChatGPT na sessão dele de 18–19/10/2026. A gravação pelo ChatGPT no GitHub foi bloqueada do lado dele; o Diogo
enviou a imagem ao Claude a 21/10/2026 com as palavras **«Esta é a versão aprovada»** e o Claude gravou-a aqui, tal e qual, a pedido dele.
A pasta `design/` é do ChatGPT pelo acordo v1.2; esta gravação é uma exceção pontual, não uma mudança de dono.

**Âmbito da aprovação (fecho do ChatGPT de 19/10 + confirmação escrita do Diogo de 21/10):** só o **design**: composição e organização
visual, paleta (cal · terracota · terra · verde oliveira · cinza quente), tipografia (Playfair Display nos títulos, Source Sans 3 no texto),
logótipo, fotografias reais e linguagem gráfica. **A mensagem, os textos e a narrativa NÃO estão aprovados** («Uma casa inteira. O Alentejo
à vossa porta.» é um dos caminhos em análise, não a frase final). Nenhuma página está aprovada: a prancha é o look & feel, não as páginas.

**O que a prancha mostra:** cabeçalho de página de entrada (foto da piscina de dia, menu A casa · Fotografias · Preços · Localização ·
Perguntas · Contactos · «Pedir datas»), oito mocks (1 Início · 2 A casa · 3 Fotografias «O que era, o que é», com o antes/depois · 4 Preços e
reservar/localização · 6 Perguntas frequentes · 7 Contactos · 8 Mobile) e três opções de look & feel (1 Editorial clássico · 2 Moderno e
natural · 3 Autêntico e sensorial).

**Leitura do monitor (Claude, 21/10) contra o `FACTOS.md`:**
- ✓ Até 8 pessoas · 4 quartos · piscina 10 × 5 m · renovada em 2021–2022 · Reguengo, a 3 km do centro de Montemor-o-Novo · Évora 25 min ·
  Lisboa 1 h · Comporta 50 min · Alqueva 1 h · `geral@montecasabranca.pt` · `@monte_casa_branca`.
- ✗ **Telefone:** a prancha diz «+351 962 800 626»; o certo é **+351 962 802 626** (`FACTOS.md`, identidade). Corrigir na fonte antes de
  qualquer página.
- ? **«3,6 hectares»:** continua por confirmar pelo Diogo (3,6 na MyBestHotel de 2022, 3,2 no brief de 16/10); pelo `FACTOS.md` nenhum dos
  dois entra no HTML até ele decidir.
- Ausentes na prancha, a prever nas páginas: o **widget do tempo** (pedido do Diogo de 16/10, recado de 17/10) e o **simulador «Simule aqui a
  sua estadia»** (decisão S3). A prancha tem «Pedir datas»; o simulador e o tempo entram no desenho das páginas Início e Preços.
- Logótipo: confirmar que é o atual (o `docs/identidade/logo/README.md` diz que o logótipo atual se mantém e que um estudo novo não está
  aprovado).

**Próximo passo pelo acordo:** o ChatGPT entrega cada página em HTML + CSS em `design/` a partir desta prancha (lista de conformidade,
ponto 2); o Claude implementa cada entrega como revisão da demo (rascunho até o Diogo apreciar). A demo fica na r1 até lá.
