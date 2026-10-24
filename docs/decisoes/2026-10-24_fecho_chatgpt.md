# Monte Casa Branca · fecho de sessão ChatGPT · 24/10/2026

## Ponto de retoma
Continuar a partir deste fecho, não reiniciar conceitos. Repositório de site: `diogovianamachado-coder/site-montecasabranca`, branch main. Repositório da app: `diogovianamachado-coder/appmontecasabranca`; não foi alterado nesta sessão. ChatGPT prepara design e revisão; Claude integra o motor técnico. Sem publicação no domínio.

## Decisões expressas do utilizador
- A prancha editorial com fotografias reais é a referência permanente e a porta de entrada. Caminho: `design/prancha-aprovada-2026-10-19/prancha-editorial-fotos-reais.png`. A imagem reenviada IMG_4439(1).jpeg reforça a referência. Preservar composição, delicadeza, cores e tipografia.
- A estrutura das sete páginas está boa e o utilizador gosta dela. Afinar detalhes dentro das páginas, sem inventar outra arquitetura. Mensagem final ainda em construção; gosta do ritmo atual e autoriza texto existente como default.
- Home em scroll é o foco: grande fotografia + características imediatamente à frente; mensagem/casa; dentro/fora/piscina; logo depois galeria. Outros menus e disponibilidade para quem quiser aprofundar.
- Retirar lista de preços por época e Reguengo da apresentação. Manter datas/disponibilidade e cálculo por estadia. Valorizar Montemor-o-Novo.
- Explora Montemor-o-Novo com fotos próprias da região e ligação a Visit Montemor; Nacional 2 com motivo para ficar duas noites, conhecer Montemor e Évora, casa como base.
- Manter trio de fotografias e antes/depois com pares certos.
- Guardar todas as versões no GitHub para memória e comparação.
- KPI oficiais confidenciais, fora do site e dos protótipos.

## O que foi efetivamente entregue e guardado
Fonte editável atual em `design/site/`, V1.3.1. Sete páginas: Início, A casa, Fotografias, Datas/estadia, Localização/Montemor, Perguntas, Contactos. Os HTML mostram exemplos; não são motor de reservas em produção.

Histórico: `design/HISTORICO-VERSOES.md`. Cinco snapshots preservados em `design/arquivo/2026-10-24/`: V1, V1.1, V1.2, V1.3, V1.3.1. Árvores de fonte e fotos verificadas contra as versões de origem. Geradores/dependências preservados onde aplicável; o visualizador V1 defeituoso é reconstruível. Não se duplicaram HTML gigantes em base64; os ficheiros de validação são regeneráveis.

- V1: sete páginas; visualizador iframe/srcdoc falhou no iPhone (controlos visíveis e conteúdo em branco).
- V1.1: exportação HTML direto, fotos incorporadas, sem iframe/JS; o utilizador mostrou que já carregava no iPhone.
- V1.2: retira épocas/Reguengo; trio, antes/depois herdado, Montemor/N2.
- V1.3: retira grandes CTA duplicados e título repetido no rodapé; ícones SVG de traço fino, barra mobile Início/Menu/Datas, galeria do trio por gesto, uma página de cada vez na apresentação e roteiro de duas noites.
- V1.3.1: entradas visuais do trio para a respetiva zona da galeria e ligação geral depois das fotos. Preserva a home em scroll.

`gerar_validacao.py` exporta V1.3.1 para `validacao-v1-3-1/` e ZIP. Instalar `requirements-design.txt`. Os geradores `build_design.py` / `build_review.py` são históricos; não sobrescrever a fonte atual com eles. A apresentação tem conteúdo direto sem scripts; não repetir o mecanismo de iframe que falhou no iPhone.

Navegação de V1.3 testada em viewport mobile 390 px e desktop: índice/menu, calendário, uma página visível, ausência de overflow horizontal, fotos, expansão do roteiro. Não foi teste em iPhone físico. V1.3.1 teve âncoras, IDs e ordem do acesso à galeria verificados.

## Galeria: informação agora disponível
O browser foi bloqueado pelo Cloudflare em mobile.zenfolio.com e no destino público `https://montecasabranca.zenfoliosite.com/zg/my-gallery` (também identificado via tr.ee/PrY7cNHFJn). Não repetir tentativas nem declarar acesso direto bem-sucedido.

O utilizador forneceu 22 capturas IMG_4594–4615, agora suficientes para observar a organização: All Media; O Monte (exterior e áreas comuns); Os Quartos; A Quinta; Antes e Depois; Montemor o Novo. Foram revistas as capturas, não descarregados os originais ou descobertos URLs individuais de álbuns.

Análise completa guardada em `docs/design/2026-10-24_analise_galeria_menu.md`. Contrato/estados em `design/site/galeria.json`.

## Erros de antes/depois identificados: corrigir antes de montagem final
- O `antes_casao_a14.jpg` atual mostra pérgula e estrutura circular exterior; foi erradamente associado ao interior `depois_casao_interior_a3.jpg`.
- IMG_4608 mostra o interior bruto correto para comparar com o salão atual. Localizar o original desse interior antes de montar o par.
- IMG_4610 mostra o par próprio da pérgula exterior.
- O quarto antigo de paredes rosadas aparece emparelhado com o quarto atual com acesso ao alpendre e decoração circular na cabeceira; referência `quarto.jpg`/IMG_0322. O `quarto_4413.jpg` usado no par do protótipo precisa de substituição/conferência. Localizar os originais, não concluir apenas pelo nome.
- Há bons pares de fachada, corredor, chaminé e poço nas capturas. Selecionar dois/três claros; restantes na história completa.
- Preferir lado a lado ou alternância quando os ângulos diferem. Slider só quando alinhável. Não gerar/deformar fotografias para fingir correspondência.

A última análise só alterou documentos e contrato interno: não corrigiu ainda os pares no HTML nem implementou o novo menu. Não apresentar o código atual desses pares como validado.

## Propostas recentes, ainda sem aprovação final
- Curadoria da galeria: Todas; Sala e cozinha; Piscina e alpendre; Quartos; Biblioteca e lareira; A quinta; Antes e depois. Montemor em Explora. Verão/inverno como fios de seleção/etiquetas, evitando duplicar álbuns.
- Piscina com especial protagonismo, contrapondo dia e entardecer/noite. Biblioteca/lareira para mostrar inverno; campo e quinta nas várias estações. Home com seleção curta, galeria para aprofundar.
- O utilizador disse que a barra inferior pode funcionar; não é aprovação final. Nas referências IMG_4616–4618, interessa a interação, não o dashboard nem os dados de reserva.
- Proposta ChatGPT: duas ações flutuantes Menu + Verificar disponibilidade; terracota no CTA. Mostrar disponibilidade quando o CTA do hero sai do ecrã; recolher ao abrir menu/lightbox ou chegar à ação equivalente no calendário. Manter logo/menu no cabeçalho, respeitar áreas seguras, foco, teclado e redução de movimento. Desktop conserva navegação de cabeçalho.

## Última ideia do utilizador: fotografias que abrem mais fotografias
O utilizador propôs que cada foto principal de “por dentro / por fora / afins” tivesse mais fotos por trás, visíveis ao tocar. ChatGPT considerou a direção coerente e propôs:
- Cada imagem do trio é capa de uma galeria daquele espaço, com contexto preservado.
- Por dentro → sala/cozinha/biblioteca; Por fora → alpendre/exteriores/quinta; Piscina → água, diferentes ângulos e luz de dia/entardecer/noite. Afinar limites de cada grupo e evitar repetições excessivas.
- Ícone discreto de galeria e contagem real; experimentar margem deslocada atrás como sugestão subtil de mais fotos, sem cobrir a imagem.
- Toque abre ampliação; gesto lateral percorre só esse grupo; contador, fecho e retorno à mesma posição de leitura. Acesso geral “Explorar toda a galeria” mantém-se.

Trata-se de direção proposta pelo utilizador e detalhe para prototipar; ainda não implementado nem aprovado visualmente. Não confundir com os acessos V1.3.1, que apenas ligam à página de galeria/zonas.

## Roteiro de duas noites
Implementado como proposta de texto e layout expansível: dia 1 conhecer Montemor, entrada na casa a partir das 16h, primeira noite; dia 2 Évora e regresso à casa, segunda noite; manhã seguinte saída até às 11h. Duas noites mínimas, algumas datas exigem mais. Sem promessa de early check-in/late checkout, passeios ou refeições incluídos. Consulta a Visit Montemor, portal municipal Évora e Rota N2. Não se declara a propriedade parceira/certificada N2.

## Próxima sessão: trabalho concreto
1. Retomar este fecho e a análise; preservar estrutura/prancha.
2. Localizar originais para os pares certos e fotos de biblioteca/lareira, piscina em várias luzes, quinta e Montemor. Usar os materiais do projeto/Dropbox/repositório; capturas são referência, não assets finais.
3. Preparar uma revisão visual do trio como capas de microgalerias e das duas ações flutuantes. Mostrar interações para validação antes de expandir o resto.
4. Depois transferir o design validado para a montagem do Claude. Não reabrir a mensagem antes dos espaços estarem suficientemente definidos.

## Pendentes técnicos / divergências
`demo/base/CONTRATO.md` pede imagens.json, mas `demo/ferramentas/demo.py` inclui o nome em RESERVADOS. O problema já estava no handoff V1 e no patch de uma linha; não foi corrigido nesta sessão. Um ensaio local em memória passou, mas não afirmar que o workflow original está verde. Claude deve rever o conflito do manifesto antes de montar.

Não há nova divergência factual reportada pelo Claude nesta sessão. A crítica anterior do ChatGPT a espaçamentos/ritmo não autoriza redesenho global: o utilizador clarificou que gosta da estrutura. A mensagem tem dono no processo acordado; o texto dos protótipos é default provisório.

## Três ideias exploratórias para futura apreciação (não aprovadas)
1. “A mesma vista, outra luz”: uma única vista da piscina que permite alternar dia/entardecer/noite com fotografias reais, quando existirem enquadramentos adequados.
2. Uma pequena legenda de contexto em fotos escolhidas (biblioteca no inverno, último café no alpendre), com tom humano e sem encher todas as imagens de texto.
3. Guardar/partilhar o roteiro de dois dias numa página leve para levar no telemóvel, reforçando Montemor como base da visita sem acrescentar uma nova etapa à reserva.

## Frase para retomar
“Continua o Monte Casa Branca a partir do fecho de 24/10/2026 em docs/decisoes/2026-10-24_fecho_chatgpt.md. Mantém a prancha e a estrutura. Retoma o trio como capas de galerias por espaço, a proposta de menu/disponibilidade flutuantes e a correção dos pares antes/depois, sem recomeçar o design.”
