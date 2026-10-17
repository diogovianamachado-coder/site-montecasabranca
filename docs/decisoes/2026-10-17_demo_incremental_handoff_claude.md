# Monte Casa Branca · instrução do Diogo e handoff para demo incremental
**17/10/2026 · cerca das 19h20 Europe/Lisbon · v1**

## Ler primeiro — nova instrução do Diogo

> As fotos que enviei foi para te dizer que consegues fazer melhor. Não foi para usares como modelo. Já passamos por sites de concorrentes, os teus modelos e estamos sem progredir porque não me consegues entregar um design apelativo. Estás a acertar e a desafiar-me na mensagem mas não estás a conseguir o design que para já é o mais importante. Outra coisa. Prepara para fazer um site demo para que seja testado. Passa ao Claude informação para fazer a demo à medida que formos fazendo avanços

**Registo da instrução atual do utilizador, não uma aprovação de desenho.** A autorização nova permite ao Claude preparar a demo de teste e acompanhar os avanços, mesmo durante o design. O papel anterior de monitor exclusivo deixa de impedir **este trabalho delimitado de demo**. Mantêm-se os papéis de design/decisão e as restantes restrições do acordo v1.2. Isto não é o «passa ao Claude» integral para produção, nem o «Lança».

Não foi criada nem declarada uma v1.3 aprovada pelos três. A ordem atual do Diogo está registada aqui para execução no seu âmbito. Claude deve refletir esta instrução na sua própria memória, que só ele edita.

## Diagnóstico e feedback que prevalecem

- Prioridade principal: **um design apelativo**. A mensagem está a evoluir; o design continua aquém do pedido.
- Os três anexos devolvidos pelo Diogo são uma demonstração do nível de qualidade que espera. **Não são modelos para copiar**, nem imagens para usar como fotografias da casa, nem uma seleção de layout.
- Janela e Índice, no estudo inicial de hoje, foram consideradas insuficientes. Não desenvolver automaticamente nenhuma como direção escolhida.
- Há interesse na mensagem «Cada um ao seu ritmo» e na ideia dos três espaços. A página branca com três fotografias, legendas e numeração foi criticada por básica; esses elementos positivos não aprovam a composição.
- A fotografia grande na entrada agrada; a mensagem de Janela e a sua apresentação mobile foram criticadas.
- Não atribuir ao Diogo a responsabilidade de desenhar o site, redigir o briefing de novo ou resolver a implementação.
- A recomendação anterior do ChatGPT de enviar os anexos ao Lovable como modelos foi corrigida expressamente pelo Diogo. **Não fazer essa transferência como modelos.**
- Lovable foi discutido e a ligação verificada; **não foi criado projeto nem escolhido como plataforma final**. Figma também foi verificado. A demo solicitada é trabalho do Claude; não pressupor uma mudança de stack ou alojamento.

## Trabalho imediato para o Claude

Preparar **a base técnica de uma demo navegável**, sem inventar um novo desenho:

- Ler main atualizado, CLAUDE.md, acordo v1.2, este handoff e as fontes listadas no fim.
- Criar a área isolada **demo/** no repositório do site, como proposta técnica de organização deste handoff. O Claude pode ajustar a organização se houver motivo técnico, registando o caminho exato. Esta área nova serve a demo e não muda os donos de design/, public/ ou src/.
- Começar pela estrutura mínima de execução, identificação da versão e modo de abrir/testar. Se ainda não existir um novo desenho indicado para implementação, usar apenas uma página neutra de estado «Demo em preparação», identificada como preparação técnica; não fabricar uma homepage alternativa ou ressuscitar layouts rejeitados.
- Servir páginas reais em HTML/CSS/JS, com texto selecionável, imagens individuais e navegação real. **Não transformar a prancha inteira numa imagem e chamar-lhe site.**
- Usar a stack estática já acordada; não adicionar React, backend, base de dados ou nova plataforma por associação ao nome Lovable.
- Preparar uma entrada estável de teste e uma forma de identificar qual a entrega de design, revisão e commit que estão implementados.
- Fornecer instruções de execução reproduzíveis e resultado dos testes iniciais. A identificação técnica pertence à zona de revisão da demo, não ao conteúdo turístico.

### Acesso no telemóvel

O objetivo é um endereço de teste que o Diogo consiga abrir no iPhone. Verificar primeiro se já existe um ambiente de preview autorizado ou configurado; usar o que for encontrado com evidência.

**Este documento não inventa um subdomínio nem confirma a raiz da Amen.** Não mexer no domínio público, redirecionamento Linktree, DNS, alojamento de produção, workflows de publicação ou diretórios da app. Não publicar uma demo aberta ao público por inferência. Se faltar acesso/configuração para uma preview reservada, devolver o impedimento exato e um pacote estático de teste enquanto se resolve o endereço. Não apresentar localhost ou o GitHub de código como uma URL de demo acessível no iPhone.

O pedido de preparar a demo já está autorizado; não voltar a pedir autorização para o trabalho reversível dentro deste âmbito. Nenhuma publicação foi realizada pelo ChatGPT.

## Como incorporar os avanços

| Momento | ChatGPT | Claude | Diogo |
|---|---|---|---|
| Novo avanço de design | Entrega HTML/CSS editáveis, recursos reais, commit e instruções de composição/interação mobile e desktop | Implementa essa entrega na demo, assinalada como rascunho se ainda não apreciada | Vê e testa a revisão identificada |
| Correção após apreciação | Regista feedback, altera o desenho e indica exatamente o que mudou | Atualiza só o incremento indicado, mantendo rastreabilidade | Confirma ou rejeita por olho |
| Aprovação | Regista apenas o «sim» expresso, com âmbito e data | Mantém separadas revisões aprovadas, rascunhos e rejeitadas | Decide |
| Produção | Reúne o desenho em conformidade | Só avança para produção/publicação no âmbito da autorização respetiva | Autoriza publicação conforme acordo |

Rascunhos podem ser testados na demo sem se tornarem aprovados. Antes de atualizar uma revisão em apreciação, avisar na conversa e identificar a nova versão; conservar a possibilidade de reproduzir a anterior por commit/pacote. Não fazer alterações silenciosas nem presumir que ausência de resposta é aprovação.

A cada incremento, o handoff deverá incluir:

- páginas/blocos alterados e estado: rascunho, aprovado ou rejeitado;
- commit de origem do design e ficheiros/recursos necessários;
- desktop/mobile e comportamento esperado;
- interações reais ou apenas de apresentação;
- teste feito, resultado e limitações;
- endereço de teste, revisão e commit implementado, quando existirem.

**Primeira devolução do Claude:** o que ficou pronto tecnicamente, como abrir a demo, revisão/commit, validação realizada e dependências concretas. Não é pedido um novo conceito visual ao Claude.

## Conteúdos, dados e interações nesta fase

- Fotografias reais já localizadas; originais preservados. Logo atual preservado. Uso público continua sujeito ao registo de autorização previsto no acordo.
- Tempo e apresentação/personificação dos preços continuam requisitos apreciados; não são prioridade substituta do design.
- Na primeira demo, usar exemplos claramente identificados para preço/tempo/disponibilidade quando forem necessários para testar o desenho. Não mostrar disponibilidade inventada como verdadeira, não criar pré-reservas nem enviar mensagens sem ação explícita.
- Não copiar cegamente interacao.js das propostas rejeitadas: o main ainda contém limitações conhecidas nos estados de contactos, preços e tempo. As correções locais da sessão anterior não foram promovidas.
- Não ligar a app, criar portas, tocar em reservas reais ou usar dados de hóspedes por força deste pedido.
- Diogo e anfitrião são a mesma pessoa. Saída tardia sempre condicionada a não haver entrada no mesmo dia e combinação com o Diogo. Nenhuma área de terreno divergente deve entrar como facto.
- PT primeiro no teste do desenho; PT e EN continuam requisito da publicação.
- S25/S26 rejeitadas. S27 não foi executado. A primeira apreciação destas composições ocorreu e foi negativa; o teste sem fotos não substitui a prioridade atual de resolver o design. Não o executar na demo como alteração visual por iniciativa técnica.

## Fontes e estado da entrega

- docs/decisoes/2026-10-17_fecho_design_memoria_chatgpt.md — contexto completo até à retoma.
- docs/design/2026-10-17_estudo_inicial_go-nogo.md — registo das composições Janela/Índice e atualização do feedback.
- design/estudo-inicial-2026-10-17/index.html — **visualizador de composições estáticas**, entregue em 9830813; não é homepage funcional nem código de base aprovado.
- design/retoma-v2/ — propostas rejeitadas; imagens reutilizáveis, desenho sem aprovação.
- docs/fotografia/2026-10-17_leitura_materiais_v2.md — curadoria e origens.
- docs/conteudos/fontes/BRIEF_SITE.md e FACTOS.md — conferir com o brief mais recente e instruções do Diogo.
- docs/integracao-app/RECADOS_PARA_O_CHATGPT.md — recado do Claude sobre meteorologia.
- docs/decisoes/2026-10-13_acordo_dois_repositorios_v1.2.md e CLAUDE.md.

Main lido pelo ChatGPT antes desta preparação: **1b277454f4053f3912107a940ef55424f55c27ac**.

**Estado real:** instruções preparadas pelo ChatGPT no repositório para o Claude ler. Não há canal direto de conversa com Claude neste ambiente; este ficheiro não prova que o Claude tenha sido notificado, lido ou começado. A demo ainda não foi construída nem testada pelo Claude.
