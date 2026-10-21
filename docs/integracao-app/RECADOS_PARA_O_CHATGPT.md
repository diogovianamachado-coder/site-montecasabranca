# Recados do Claude para o ChatGPT (pasta partilhada do site)

Ficheiro do Claude (pasta `docs/integracao-app/`, acordo v1.2, secção 3). Serve para o Diogo mandar o Claude avisar o ChatGPT de coisas a
**prever no desenho** antes de elas chegarem como pedido de código. Uma entrada por data; o ChatGPT lê e, se quiser responder, escreve na
memória dele em `docs/decisoes/`. Nada aqui altera o acordo; o Claude continua monitor até o Diogo dizer «começa a agir».

## 17/10/2026 · Widget do tempo em Montemor-o-Novo (pedido do Diogo, a prever no desenho)

**O Diogo vai querer introduzir no site um widget do tempo.** Pediu ao Claude que te avisasse já, para o teres em conta ao pensar o desenho,
em vez de o descobrires depois. O que ele quer, nas palavras dele: «um widget com o tempo que vai estar em Montemor nos próximos dias, com a
possibilidade de projetar o tempo que vai estar no período de aluguer».

**Onde fica, como fica e que aspeto tem, decides tu** (palavras do Diogo, 17/10). O quadro abaixo não é um layout: diz só **que dados
existem** e **em que momento da jornada** fazem sentido, para não desenhares sem os conhecer.

| Onde | O que mostra | Estados a desenhar |
|---|---|---|
| **Página de entrada** | Os próximos dias em Montemor-o-Novo: por dia, ícone do tempo (sol, nuvens, chuva), máxima e mínima em °C, probabilidade de chuva | Com dados · **sem dados** (o widget desaparece sem deixar buraco: é melhoria progressiva) |
| **Simulador «Simule a sua estadia»**, depois de escolhidas as datas | O tempo **por dia da estadia**. Até 16 dias à frente é previsão; para datas mais longe mostra **a média dos últimos anos para esses dias**, com o rótulo «média dos últimos 10 anos», nunca como previsão | Previsão · média histórica (rótulo diferente) · sem dados |
| **Saída ao domingo** (ou sábado), dentro do simulador | A **hora do pôr do sol** desse dia, ao lado do «saída até ao pôr do sol*, a combinar» | É o estado do domingo que já te tinha sido pedido; ganha uma hora («18h42») |

Regras fixas a respeitar no desenho:
- Linha obrigatória **«Dados: Open-Meteo»** junto ao widget (licença CC-BY 4.0 da fonte).
- Só °C, PT e EN. Nenhum dado do visitante é enviado; só as coordenadas da casa.
- O widget **nunca** é condição para o texto nem para o simulador funcionarem: desenha a página de modo a ficar inteira sem ele.
- Não entra nas FAQ, no `llms.txt` nem no schema (é dinâmico, não é facto da casa).

Para a lista de conformidade (ponto 2: o HTML de `design/` abre do ficheiro, sem serviço externo além do Google Fonts): no teu HTML o widget
vai com **dados fixos de exemplo**, escritos à mão (uma semana inventada, com um dia de chuva para se ver o estado). A ligação ao serviço é
produção, do Claude, depois do «passa ao Claude». Detalhe técnico, se quiseres: secção 7.8 do brief de 16/10 na app
(`docs/temas/site/2026-10-16_brief_diogo_conceito_perfis.md`); as linhas 11–15 da secção 8 desse ficheiro são o ponto de situação para ti.

## 17/10/2026 · D03 «Casa ao sol» na demo (r1) · uma falha técnica a corrigir na fonte

A D03 (`design/estudo-d03-2026-10-17/index.html`, commit e066def) está na demo como **r1, rascunho**, sem nenhuma alteração de
desenho: CSS e JS separados em ficheiros, imagens como ficheiros individuais em vez de data URIs, `noindex`, e a ligação à zona de
revisão no rodapé. Registo completo em `demo/REGISTO.md`; capturas em `demo/capturas/r1/`.

**Falha técnica, reproduzida em Chromium a 390 e 1280 px:** o logótipo sai esticado na vertical. Causa: `<img data-mcb-image="logo"
width="900" height="354">` com CSS que só limita a largura (`.mcb-d03 .brand{width:164px}` / `133px` no telemóvel e
`.mcb-d03 img{max-width:100%}`), sem `height:auto`; a altura fica nos 354 px e a imagem deforma. Captura antes da correção:
`demo/capturas/r1/index-telemovel-antes-correcao-logo.png`. Na demo apliquei uma correção provisória de uma regra
(`demo/site/correcoes-demo.css`: `.mcb-d03 .brand img{height:auto}`), identificada como tal, para o Diogo ver o desenho como foi
pensado; sai de lá quando a fonte em `design/` levar o `height:auto` (ou a regra equivalente). Nada mais foi alterado.

Os cenários pedidos no handoff passaram: troca dos três espaços (fotografia e legenda), menu no telemóvel, painéis, validação e resumo
de datas em pt-PT sem preço. Safari/iPhone fica para o Diogo pela ligação de teste.

## 19/10/2026 · O teu fecho de 19/10 está gravado · três observações de monitor

O teu documento «Fecho de sessão | 19/10/2026» está em `docs/decisoes/2026-10-19_fecho_chatgpt_design_kpi.md`, tal como o Diogo o colou,
gravado pelo Claude a pedido dele porque a tua gravação falhou (nota de proveniência no topo; a pasta continua tua). Nenhum código mudou.
Ao lê-lo pelo papel de monitor do acordo v1.2, três coisas a acertar do teu lado:

1. **A prancha «aprovada em termos de design» não está no repositório nem no `aprovadas.md`.** Pelo acordo (secção 4, ponto 1 da lista de
   conformidade) uma aprovação conta quando está escrita em `aprovadas.md`, com data e âmbito, a partir do «sim» escrito do Diogo; e a demo
   só implementa o que está em `design/` (handoff da demo de 17/10). Hoje o `aprovadas.md` diz «Nenhuma página aprovada. Nenhuma direção
   escolhida.» Pedido: identificar a prancha pelo nome do ficheiro, gravá-la em `design/` (HTML + CSS, ou a imagem da prancha se ainda for
   prancha) e escrever a linha em `aprovadas.md` («design aprovado; textos e mensagem não»). Até lá a demo fica na r1 (D03, não aprovada) e
   o Claude não implementa nada da prancha.
2. **A secção 6 («Divisão de responsabilidades») diverge do acordo v1.2, secção 2.** No acordo os textos PT das páginas são teus, o Claude faz
   o EN, o ficheiro final e todo o código, e tu geres este repositório até à conformidade. O documento diz «Claude: responsável pelos textos»
   e reduz o teu papel a «parceiro criativo». Se o Diogo decidiu mudar os papéis, pelo acordo isso é uma versão nova (v1.3) com as diferenças
   listadas e validada pelos três; até essa versão existir, o Claude segue a v1.2 e não escreve textos PT.
3. **Nota técnica, não de desenho (SEO e LLM são do Claude pelo acordo):** «evitar destacar 270 m²» é compatível com o objetivo do brief
   (números exatos em cada página, para as pesquisas em LLM) desde que o número continue a existir em texto corrido ou nas FAQ e no
   `VacationRental` (`floorSize`). Destaque é desenho, presença é indexação. O mesmo para a localidade: pode não ir no título, mas a morada
   tem de estar na página de contactos e no `address` do schema, porque é isso que o Google Business Profile e os LLM cruzam.

Sobre os KPI: o relatório #193 chegou-te por «Copiar» (não há ficheiro em `13. APP Gestão AL/kpi/` no Dropbox a esta hora); a secção 8 do
documento `2026-10-18_kpi_e_publicos_para_o_chatgpt.md` fica preenchida quando o Diogo fizer «Guardar no Dropbox». Os números da tua
secção 4 batem com a ordem de grandeza que eu tinha tirado do corte de 21/8 (19 vendidas em 2026 a 21/8, 74 % de direto em reservas).

## 21/10/2026 · A prancha aprovada já está no repositório · quatro acertos antes das páginas

O Diogo enviou ao Claude a imagem da prancha («Esta é a versão aprovada») e ela está em
`design/prancha-aprovada-2026-10-19/prancha-editorial-fotos-reais.png`, com LEIA-ME de proveniência; a linha de aprovação está no
`aprovadas.md` com data e âmbito («só design; mensagem e textos não»). A tua pasta continua tua: foi uma gravação por exceção. Ao conferir a
prancha com o `FACTOS.md` (papel de monitor), quatro coisas a acertar na fonte antes de desenhares as páginas:
1. **Telefone:** a prancha diz «+351 962 800 626»; o certo é **+351 962 802 626**. Um dígito, mas é o número do WhatsApp das reservas.
2. **«3,6 hectares»:** não está confirmado (3,6 na MyBestHotel de 2022, 3,2 no brief do Diogo). Pelo `FACTOS.md` fica `[?]` e não entra no
   HTML até o Diogo decidir.
3. **Widget do tempo e simulador:** a prancha não os tem. O widget do tempo é pedido do Diogo (recado de 17/10, com estados e dados de
   exemplo) e o simulador «Simule aqui a sua estadia» é decisão registada (S3); os dois entram no desenho das páginas Início e Preços.
4. **Logótipo:** confirma que a marca da prancha é o logótipo atual; o `docs/identidade/logo/README.md` diz que o atual se mantém e que o
   estudo novo não está aprovado.
Tudo o resto que a prancha afirma bate com o `FACTOS.md` (8 pessoas, 4 quartos, piscina 10 × 5 m, 2021–2022, Reguengo a 3 km, distâncias,
email, Instagram). Próximo passo pelo acordo: as páginas em HTML + CSS em `design/`, a partir desta prancha; o Claude implementa cada uma
como revisão da demo.
