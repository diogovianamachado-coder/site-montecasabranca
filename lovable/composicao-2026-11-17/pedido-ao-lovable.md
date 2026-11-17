# Seguimento ao Lovable: as notas do Diogo que não tinham ido no pedido de 16/11

**Estado: ENVIADO a 17/11/2026, às 00h20, e concluído pelo agente do Lovable às 00h28** (versão `df8161a` do projeto «Monte Casa
Branca»; a anterior era a `088eae5`, de 16/11). Nada foi publicado, nenhum serviço foi ligado e não se compraram créditos.
A primeira tentativa, a 16/11 às 23h40, foi recusada («Your workspace is out of credits»: o plano gratuito tinha gasto os créditos do
dia com o pedido da manhã); depois da meia-noite os créditos do dia seguinte já lá estavam.

**Porquê este seguimento.** O Diogo perguntou, a 16/11: «Espero que estejas a considerar e tenhas passado ao Lovable as notas que
estivemos a fazer ontem.» A conferência nota a nota (`docs/integracao-app/2026-11-15_notas_do_diogo_e_o_que_mudou.md`, secção 6) mostrou
que o pedido da manhã levou os textos, a ordem e as regras, mas não levou a decisão da capa (dizia «mantém a tua») nem as palavras
dele sobre as fotografias («não precisa de dizer que tem fotos», «a rolar random»), e que a composição devolvida mudou o desenho de
«Antes de chegar» em relação à referência que ele deu. No site (`site/`, versão 3) isso ficou reposto a 17/11; este pedido pôs a
pré-visualização do Lovable igual, para o Diogo ver a mesma coisa nos dois sítios.

**O que o Lovable respondeu e fez** está em `LEIA-ME.md`, nesta pasta.

## O texto enviado (uma só mensagem, ao agente do projeto «Monte Casa Branca»)

Seguimento do pedido de 16/11/2026, enviado pelo Claude em nome do Diogo. Palavras dele: «Espero que estejas a considerar e tenhas passado ao Lovable as notas que estivemos a fazer ontem.»

A composição que fizeste a 16/11 fica. Faltou passar-te algumas decisões que o Diogo tomou a 15/11. Ajusta só os sete pontos abaixo, sem mexer em mais nada (textos, fotografias, ordem, cores e o resto da composição ficam como estão).

1 · CAPA. Decisão dele, por olho, entre três opções: «capa: 1», no computador e no telemóvel. A queixa era o brilho: «por causa da máscara inicial a foto parece muito escura» e via-se pouco da casa. A capa 1 é assim:
- O título vai para cima, sobre o céu, logo por baixo do logótipo (a cerca de 6rem do topo no telemóvel e 6,75rem no computador, alinhado à esquerda com o logótipo). Dois degraus: «Uma casa inteira» e, por baixo, mais pequena, em itálico e afastada da margem, «O Alentejo à vossa porta».
- Em baixo, sobre a água, ficam a linha «Monte Casa Branca · Montemor-o-Novo, a 1 h de Lisboa», as três etiquetas, o botão «Entrar pela casa» e «Sem receção, sem pressa», como estão.
- Quase sem máscara: nada a escurecer a fotografia inteira. Só um gradiente mínimo, de cima para baixo: 16 % de sombra no topo, 0 % aos 12 %, 0 % até aos 60 % e 30 % no fundo. A leitura do texto faz-se com text-shadow (0 1px 3px a 55 % e 0 2px 28px a 65 %). O céu e a casa ficam com a luz da fotografia.
- Sem ampliação: tira o scale-[1.06] (com ele via-se menos casa). A paralaxe pode ficar.

2 · FOTOGRAFIAS DOS TRÊS CAPÍTULOS E DE MONTEMOR-O-NOVO. Palavras dele: «gosto da ideia de ter uma foto principal e, quando se chega lá, ter 2/3 fotos atrás a rolar devagar, onde os clientes podem, com o dedo no mobile ou o rato, acelerar ou parar. Não precisa de dizer que tem fotos. A dinâmica do site mostra essa parte.»
- Tira a contagem «01 / 04».
- Em ecrãs de toque (telemóvel e tablet) tira também as setas: o dedo leva as fotografias. Com rato (hover: hover e pointer: fine) as duas setas ficam, à direita, por cima da faixa; com o rato em cima das fotografias o avanço sozinho pára.
- O resto fica como fizeste: a fotografia seguinte a espreitar, um passo sozinho de poucos em poucos segundos, em círculo, com rolagem nativa e scroll-snap.

3 · FILA DO FECHO («Há mais casa para descobrir»). Palavras dele: «as fotos em régua, sem serem exageradamente grandes, a rolar random, e que se apresentem como a galeria que temos nas plataformas.»
- Ordem ao acaso em cada visita.
- Avança sozinha, devagar: um passo de cada vez, só com a página parada; ao chegar ao fim volta para trás, passo a passo. Quando o dedo ou o rato a levam, deixa de avançar sozinha.

4 · ANTES DE CHEGAR. No computador, como na referência que ele deu: duas colunas, à esquerda o sobretítulo «Antes de chegar» e o título «Para se sentirem em casa» (em três linhas), à direita as sete perguntas, com «+» que passa a «−» ao abrir. No telemóvel fica como está, numa coluna.

5 · PASSEAR PELO MONTE. Tira o sobretítulo «Fotografias»: a secção chama-se só «Passear pelo Monte».

6 · QUEM JÁ FICOU. Tira a contagem «02 / 10» por baixo da frase (ele não quer números de avaliações à vista). As frases continuam a rodar e o toque passa à seguinte.

7 · LIGAÇÕES INTERNAS. Ao clicar no menu ou nos botões, a página vai à secção sem deixar «#secção» no endereço. Foi a primeira nota dele: com o «#» no endereço, ao reabrir a página ela saltava logo para essa secção.

REGRAS TÉCNICAS (as mesmas de 16/11): movimento só com CSS e IntersectionObserver; nada de JavaScript a mexer no scroll a cada frame; caixas das fotografias com largura e altura explícitas; tem de correr bem no Safari do iPhone, sem prender a rolagem da página.

NÃO FAZER: não publicar, não mudar domínio nem serviços, não comprar créditos.

NO FIM: diz-me o que mudaste em cada um dos sete pontos e o resultado da verificação a 390 px e a 1280 px.
