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
