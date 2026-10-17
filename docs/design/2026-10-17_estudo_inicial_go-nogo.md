# Monte Casa Branca · estudo visual inicial · 17/10/2026

Estado atualizado: **Janela e Índice apreciadas como insuficientes; nenhuma direção aprovada.**

## Feedback posterior do Diogo · cerca das 19h15–19h20

A mensagem «Cada um ao seu ritmo» e a ideia dos três espaços agradam, mas a página branca com três fotos, legendas e 1/2/3 foi criticada como básica. A foto grande na entrada agrada; a mensagem da Janela e o mobile foram criticados. Não afinar automaticamente uma das duas como escolhida.

Os três anexos devolvidos servem para mostrar que o ChatGPT consegue um nível de acabamento melhor; **não são modelos a copiar**. Fica corrigida a recomendação anterior do ChatGPT de os usar como referências de execução no Lovable. A discussão de conectores não escolheu plataforma nem criou projeto.

Design apelativo é a prioridade principal; o utilizador reconhece avanços na mensagem mas não no desenho. Nova ordem: preparar demo testável com implementação incremental pelo Claude. Ver [handoff](../decisoes/2026-10-17_demo_incremental_handoff_claude.md). A primeira apreciação ocorreu; S27 não foi executado. As secções abaixo documentam a entrega e expectativa inicial, sem a converter em aprovada.

## Ponto de partida

Retoma expressamente pedida pelo Diogo a partir de docs/decisoes/2026-10-17_fecho_design_memoria_chatgpt.md. Lidos main, CLAUDE.md e acordo v1.2. Fotografias anteriores aceites como base; todas as estruturas A/B/C e retoma-v2 continuam rejeitadas.

## Entrega

[HTML autónomo de apreciação](../../design/estudo-inicial-2026-10-17/index.html), no main desde 983081357c673be28feb6447e3a1e37f3a885e3a.

Contém quatro imagens incorporadas: uma prancha desktop + telemóvel e uma composição móvel isolada para cada direção. Os botões do **visualizador** permitem trocar direção e tamanho. Os controlos desenhados nas imagens são estáticos.

Não é uma página funcional do site, nem uma nova versão completa da homepage. São composições gráficas para sentir o look and feel antes de desenvolver a direção. A estrutura de navegação descrita abaixo é uma proposta que ainda terá de ser desenhada em detalhe.

- **01 · Janela:** fotografia como cenário de entrada; navegação por cenas escolhidas (exterior, interior, envolvente), informação e escolha dos dias em camadas. Não se propõe uma sucessão longa de blocos alternados.
- **02 · Índice:** entrada editorial, clara, com exterior, interior e alpendre visíveis em simultâneo. Cada fotografia é uma porta de entrada para o respetivo espaço; desenvolvimento por índice/detalhe. Recomendação inicial do ChatGPT: esta direção, pela apresentação imediata da casa e tom mais próximo. **Não é escolha do Diogo.**

Desktop desenhado a 1280 × 800; telemóvel desenhado a 390 × 844. Cores de estudo: papel #F6F5EF, grafite #373A32, terracota #9B5139. Fontes das composições: Nimbus Roman e Nimbus Sans (fontes locais de estudo); ainda não constituem sistema tipográfico aprovado. Logótipo atual, em positivo ou negativo.

## Fotografias reais reutilizadas

- design/retoma-v2/imagens/piscina-dia.jpg: V2_verão/5.JPG, associado a Rodrigo/1/DSC_4078.JPG.
- design/retoma-v2/imagens/portas-abertas.jpg: V2_verão/13.JPG, associado a Rodrigo/3/DSC_4444.JPG.
- design/retoma-v2/imagens/alpendre-copos.jpg: V2_verão/8.JPG, associado a Rodrigo/1/DSC_4161.JPG.
- public/marca/logo.png: marca atual.

Recortes de enquadramento; sem gerar fotografias, limpar o sensor ou modificar os originais. A fotografia piscina-dia conserva os pontos no céu já documentados.

## Limites e verificação

Composições feitas por desenho programático e inspecionadas como imagens. **Não são capturas de navegador.** Integridade dos PNG/JPEG e das quatro imagens incorporadas no HTML verificada. Visualizador sem recursos externos. Não foi executado QA do HTML num navegador: a skill de Sites exige control-browser neste ambiente, que não está disponível. Não declarar conformidade visual, acessibilidade completa ou ausência de overflow.

O widget do tempo está representado nas vistas desktop, com temperaturas marcadas como exemplo. O tempo e a apresentação/personificação dos preços continuam requisitos; não foram desenvolvidos para substituir a apreciação do design. Não há consulta de disponibilidade ou meteorologia, cálculo de tarifa ou envio de pedidos.

Sem alterações à produção, src/, app, CLAUDE.md, workflows, logo original, DNS ou alojamento. Sem publicação.

## Próximo passo atualizado

Resolver o design após a apreciação negativa; não desenvolver automaticamente Janela ou Índice. Claude prepara a base da demo e integra os avanços designados pelo ChatGPT, com versão e teste, segundo o handoff. A execução técnica não equivale a aprovação estética. S27 continua por executar; S25/S26 continuam rejeitadas. Não há novas sugestões S nesta entrega.
