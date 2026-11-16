# Versões do site em `novo.montecasabranca.pt` · registo

**Para que serve (pedido do Diogo, 15/11/2026):** «preciso que se registe as versões que vão para o "novo" para sabermos onde fomos
melhores. Eu quero poder dizer que quero manter X parte da versão anterior.»

Cada vez que o site é publicado no ensaio (`novo.montecasabranca.pt`) nasce uma **versão** com número: V1, V2, V3… Este ficheiro guarda,
para cada uma, quando foi publicada, o que mudou em cada parte da página, onde estão as fotografias dessa versão e o que o Diogo achou.

## Como se usa (Diogo)

1. **Saber que versão estás a ver.** No fundo da página do ensaio, em letra pequena, está escrito «Ensaio · versão 2 · 16/11/2026».
   O site a sério (`montecasabranca.pt`) não mostra isto.
2. **Ver uma versão antiga.** Depois de uma versão nova ser publicada, a anterior deixa de estar no ar, mas fica fotografada parte a parte
   em `docs/versoes/v<N>/` (no computador e no telemóvel). As folhas «lado a lado» de duas versões pedem-se ao Claude a qualquer altura
   («mostra-me a V1 ao lado da V2»).
3. **Manter uma parte de uma versão anterior.** Basta dizer a parte e a versão, pelos nomes da tabela de baixo:
   «quero a capa da V1», «o menu da V1 era melhor», «a galeria fica como na V2 mas com o título da V1». O Claude vai buscar essa parte
   à versão guardada, monta-a na versão atual sem desfazer o resto e mostra as duas lado a lado antes de publicar. O resultado é uma
   versão nova (a seguinte), com a nota «capa reposta da V1».
4. **Dizer onde fomos melhores.** Em cada ficha há a coluna «O que o Diogo achou». Fica «por dizer» até dizeres; basta uma palavra por
   parte (melhor · pior · igual) ou uma frase.

## As partes da página (os nomes que usamos)

| N.º | Parte | O que é | Onde está no código da versão atual (pasta `site/`) |
|---|---|---|---|
| 1 | **Capa** | A primeira imagem, o título, as etiquetas e o menu de cima | `partes/inicio.php` · `conteudo.php` → `inicio`, `menu_topo` |
| 2 | **A casa** (a mensagem) | A frase grande que abre a casa | `partes/casa.php` · `conteudo.php` → `casa` |
| 3 | **Os espaços** | Por fora, sem pressa, por dentro: as fotografias e os textos de cada um | `partes/momentos.php` · `conteudo.php` → `momentos` |
| 4 | **O fecho e a régua** | A frase que fecha a casa e a fila de fotografias pequenas | `partes/regua.php` · `conteudo.php` → `fecho`, `regua` |
| 5 | **Montemor, N2 e onde estamos** | A vila, a ecopista, a Nacional 2, as distâncias e o mapa | `partes/montemor.php` · `conteudo.php` → `montemor` · `inc/factos.php` → `distancias`, `ligacoes` |
| 6 | **A galeria** | Os álbuns de fotografias («Passear pelo Monte») | `partes/galeria.php` · `conteudo.php` → `galeria` |
| 7 | **Antes de chegar** | As perguntas e respostas | `partes/antes.php` · `conteudo.php` → `antes`, `perguntas` |
| 8 | **Quem já ficou** | As frases dos hóspedes e as três notas | `partes/avaliacoes.php` · `conteudo.php` → `avaliacoes` · `inc/factos.php` → `notas` |
| 9 | **Contactos e rodapé** | «Falamos?», os contactos e a letra pequena | `partes/contactos.php` · `conteudo.php` → `contactos` |
| 10 | **O menu completo** | O menu que abre no botão «Menu» | `partes/dock.php` · `conteudo.php` → `menu` |
| 11 | **O painel das datas** | Calendário, contas, tempo e pedido de datas | `partes/dock.php` · `assets/js/site.js` · `conteudo.php` → `disponibilidade` · `api/` · `inc/tarifas.php` |
| 12 | **A barra de baixo** | Menu · Contacto · Verificar disponibilidade | `partes/dock.php` · `conteudo.php` → `dock` |

O desenho de todas as partes vive em `assets/css/site.css` (cada parte tem o seu bloco) e as fotografias em `fotos/`.

## Versões

### V2 · revisão do Diogo de 15/11/2026 · rascunho, por publicar

- **Estado:** em `main`, à espera do «Lança». Quando for publicada: a data, o n.º do deploy, o commit e a etiqueta `novo-v2` ficam
  escritos aqui.
- **Capturas:** `docs/versoes/v2/` · **De onde vem:** as 17 notas do Diogo de 15/11 e as respostas da mesma noite
  (`docs/integracao-app/2026-11-15_notas_do_diogo_e_o_que_mudou.md`).
- **Ordem da página:** capa → a casa → por fora → sem pressa → por dentro → fecho e régua → Montemor, N2 e onde estamos → Passear pelo
  Monte → Antes de chegar → Quem já ficou → contactos.

| Parte | O que mudou face à V1 | O que o Diogo achou |
|---|---|---|
| 1 Capa | Título em dois degraus, «Uma casa inteira» / «O Alentejo à vossa porta», no céu da fotografia; a fotografia deixou de ser ampliada e quase não tem sombra por cima; menu de cima novo (Montemor-o-Novo · N2 · Passear pelo Monte · Antes de chegar · Avaliações). Houve um estudo com três opções; ficou a 1 e o estudo saiu | **capa 1, no computador e no telemóvel** (15/11) |
| 2 A casa | «Por fora · Sem pressa · Por dentro» em cartaz de ecrã inteiro: as três palavras em degraus (também no telemóvel), a entrar uma a seguir à outra; cada uma leva ao seu momento. Era «O dia é vosso / A casa também» | «esta mensagem é forte; deveria ficar mais visível e enquadrável no ecrã com alguma estilização» (15/11): feito assim; por ver ao vivo |
| 3 Os espaços | Três momentos, cada um num ecrã. A palavra do momento é o título, grande, com o desenho do cartaz («Por fora» sobre a fotografia, «Sem pressa» em itálico, «Por dentro»), com «1 / 3» e um traço por cima e a frase e o texto por baixo; uma fotografia principal e três ou quatro atrás, a rolar devagar. Eram «Primeiro, lá fora» e três blocos (Alpendre · Sala e cozinha · Quartos e banho) com uma fotografia cada | o mesmo pedido da parte 2 (15/11): feito assim; por ver ao vivo |
| 4 Fecho e régua | «Há dias em que não é preciso mais nada» e «Há mais casa para descobrir»: 19 fotografias pequenas a rolar, por ordem diferente em cada visita, sem casas de banho. Era «A casa, num relance», uma fila para arrastar | por dizer |
| 5 Montemor, N2 e onde estamos | «Montemor-o-Novo também é a estadia» com dez fotografias da vila a rolar; a Ecopista do Montado; um programa de duas noites (sexta · sábado · domingo); ligações ao Visit Montemor, à ecopista e à Rota da N2; o mapa abre a ficha «Monte Casa Branca». Subiu para logo a seguir à casa. Era «O Alentejo mesmo à porta», no fim da página, com uma fotografia do alpendre e dois textos | por dizer |
| 6 A galeria | Chama-se «Passear pelo Monte» e tem os álbuns do Zenfolio pela mesma ordem: O Monte 49 · Os Quartos 12 · A Quinta 18 · Montemor-o-Novo 14. Entraram três fotografias da pasta do verão que o Diogo viu a 15/11: as duas fachadas do fim de «O Monte» (a 51 e a 52) e a casa ao longe, vista do campo (a 34), em «A Quinta». O «antes e depois» saiu. Era «Fotografias»: Monte e exterior 32 · Sala, cozinha e biblioteca 22 · Quartos e banho 13 · Antes e depois 4 · Montemor-o-Novo 1 | a 34, a 51 e a 52: «sim entram» (16/11); o resto por dizer |
| 7 Antes de chegar | «Para se sentirem em casa», sete perguntas em duas colunas; saem a limpeza, o pagamento e as plataformas; a saída pode ficar para as 18h quando ninguém entra a seguir. Era «Perguntas frequentes», com oito | por dizer |
| 8 Quem já ficou | Dez frases curtas, uma de cada vez, e as três notas em anel (Booking 10 · Airbnb 4,95 · Google 5,0): só a nota e o nome, sem ligações para as plataformas e sem o número de avaliações. Era «Quem cá esteve», com uma só opinião, comprida, do Airbnb de 2023 | as três notas: sim, sem ligações e sem o número de avaliações (15/11); o resto por dizer |
| 9 Contactos e rodapé | «Falamos? · Contem-nos os vossos planos»; rodapé com o registo, a firma e a morada; **saem as três ligações pequenas para o Airbnb, o Booking e o Vrbo**; no ensaio, o número da versão. Era «Venham conhecer a casa, falem connosco», com as três ligações no rodapé | «retirar Airbnb, Vrbo, Booking» (15/11): feito |
| 10 Menu completo | A casa (com Por fora · Sem pressa · Por dentro) · Montemor-o-Novo · Nacional 2 · Passear pelo Monte · Antes de chegar · Quem já ficou · Contactos. Era A casa · Descobrir · Fotografias · Avaliações · Montemor-o-Novo · Nacional 2 · Perguntas · Contactos | «não se chama Galeria» (15/11): já diz «Passear pelo Monte» em todo o lado |
| 11 Painel das datas | «Os vossos dias · Quando vos apetece vir?»; «As contas, sem surpresas» em três linhas (estadia · limpeza · total); saída até às 18h quando ninguém entra a seguir, sem falar no pôr do sol; tempo com ícones de traço e, para datas ainda longe, a média dos últimos anos. **No telemóvel o pedido abre só com o nome e o email**; o telefone e a mensagem abrem com um toque e o WhatsApp e o Email ficam lado a lado. Era «Simulem a estadia», com a conta numa linha e o aviso do pôr do sol | «rearranja para ficar mais leve» no telemóvel (15/11): feito assim; por ver ao vivo |
| 12 Barra de baixo | Sem mudanças (nota 15: «está bem, manter») | — |
| Toda a página | As ligações dos menus rolam até ao sítio sem deixar «#…» no endereço: a página deixou de abrir a meio | por dizer |

### V1 · 8/11/2026 · a primeira versão em `novo.`

- **Publicada:** 8/11/2026, deploys do site n.º 5 (20h12 UTC, commit `3c73fd9`) e n.º 7 (20h30 UTC, commit `17198b1`: o mesmo site com o
  nosso ícone e fora dos motores de busca). **Referência:** o commit `17198b1` (sem etiqueta: é anterior a este registo e o GitHub não
  deixa etiquetar commits antigos). Esteve no ar de 8/11 até à publicação da V2.
- **Capturas:** `docs/versoes/v1/` · **De onde vem:** o site em PHP feito a partir do desenho do Lovable (7/11), verificado e corrigido.
- **Ordem da página:** capa → «O dia é vosso / A casa também» → descobrir a casa (lá fora, alpendre, sala e cozinha, quartos e banho) →
  «A casa, num relance» → quem cá esteve → perguntas frequentes → fotografias → onde estamos (Montemor e N2) → contactos.

| Parte | Como era | O que o Diogo achou (notas de 15/11) |
|---|---|---|
| 1 Capa | «Uma casa inteira no Alentejo», em baixo à esquerda, com a fotografia ampliada e uma sombra por cima; menu de cima A casa · Descobrir · Fotografias · Avaliações · Montemor-o-Novo | pediu menos sombra, outro enquadramento, o título em cascata e outro menu (notas 2, 5 e 7) |
| 2 A casa | «O dia é vosso / A casa também» | a página abria aqui a meio (nota 1); pediu «Por fora · Sem pressa · Por dentro» (nota 8) |
| 3 Os espaços | «Primeiro, lá fora» com a mesma fotografia da capa; Alpendre · Sala e cozinha · Quartos e banho, uma fotografia cada | pediu outra fotografia e mais expressivas (nota 6b) |
| 4 Fecho e régua | «Há dias em que não é preciso mais nada» e «A casa, num relance» (fila de fotografias para arrastar) | — |
| 5 Montemor, N2 e onde estamos | «O Alentejo mesmo à porta», distâncias, botão do mapa (alfinete), um texto sobre Montemor e outro sobre a N2 | pediu a mensagem «também é a estadia», fotografias a rolar, um programa de duas noites e o mapa na ficha (notas 11 e 12) |
| 6 A galeria | «Fotografias», cinco álbuns, com quatro miniaturas de «antes e depois» | pediu os álbuns como no Zenfolio e sem «antes e depois» (notas 8 e 9) |
| 7 Antes de chegar | «Perguntas frequentes», oito perguntas | pediu «Antes de chegar» e outro tom (nota 10) |
| 8 Quem já ficou | «Quem cá esteve», uma opinião comprida | pediu frases curtas e várias (nota 13) |
| 9 Contactos e rodapé | «Venham conhecer a casa, falem connosco» | pediu «Falamos? · Contem-nos os vossos planos» (nota 14) |
| 10 Menu completo | A casa · Descobrir · Fotografias · Avaliações · Montemor-o-Novo · Nacional 2 · Perguntas · Contactos | pediu que seguisse o que foi trabalhado (nota 16) |
| 11 Painel das datas | «Simulem a estadia», conta numa linha, aviso «podem ficar até ao pôr do sol» ao domingo | pediu outro tom, 18h sem pôr do sol e o tempo como no Lovable (nota 17) |
| 12 Barra de baixo | Menu · Contacto · Verificar disponibilidade | «está bem, manter» (nota 15) |

## Para quem monta (Claude ou outro assistente)

**Regra:** cada publicação em `novo.` é uma versão; nenhuma vai para o servidor sem número e sem ficha aqui.

**Fechar uma versão (antes do «Lança»):**
1. Subir o número e a data em `site/versao.json` e juntar a versão a `docs/versoes/versoes.json` (data e estado, para as legendas;
   o `commit` fica vazio até ser publicada).
2. Escrever a ficha `### V<N> · …` neste ficheiro, por cima das outras: o que mudou em cada parte face à anterior.
3. Fotografar: `bash demo/ferramentas/site/versao/fotografar.sh <N>` (grava `docs/versoes/v<N>/`, computador e telemóvel).
4. Lado a lado com a anterior, para mostrar ao Diogo: `python3 demo/ferramentas/site/versao/comparar.py <N-1> <N> <pasta>`.
5. Testes (`bash demo/ferramentas/site/testar-site.sh`), commit, push, «Capturas» verde, ensaio a seco.

**O que o deploy faz sozinho** (`.github/workflows/deploy-site.yml`): pára se `site/versao.json` não tiver número, se faltar a ficha
`### V<N> · ` aqui, ou se a versão N já tiver sido publicada com outro conteúdo (é preciso subir o número); no fim de um envio a sério
cria a etiqueta `novo-v<N>` no commit enviado (`raiz-v<N>` quando for para `montecasabranca.pt`).

**Depois de um envio a sério (à mão, logo a seguir):** escrever na ficha a data, o n.º do deploy e o commit; em `versoes.json`, o
identificador **completo** do commit em `commit` (`commit_raiz` quando for o site a sério), a etiqueta e o estado. É por esse commit
(ou pela etiqueta) que o deploy sabe que a versão já foi publicada e que se vai buscar uma parte mais tarde.

**Etiquetas: o que se pode e o que não se pode.** A sessão do Claude não consegue enviar etiquetas para o GitHub (403; só commits em
`main`), por isso é o deploy que as cria. O GitHub só deixa um workflow etiquetar um commit cujos ficheiros de `.github/workflows` sejam
iguais aos de `main` nesse momento: funciona no envio normal (envia-se o commit que está em `main`) e falha para commits antigos. Por isso
**a V1 não tem etiqueta** (tentado a 15/11, recusado) e a referência dela é o commit `17198b1`. Se a etiqueta de um envio falhar, o envio
fica feito na mesma: vale o commit escrito aqui, e pode tentar-se o workflow manual «Etiqueta de versão do site». Para usar as etiquetas
na sessão: `git fetch origin 'refs/tags/novo-v*:refs/tags/novo-v*'`. Uma etiqueta de versão nunca se muda nem se apaga.

**Repor uma parte de uma versão anterior:**
1. Ver como era: as capturas de `docs/versoes/v<N>/` e o código dessa versão, pelo commit da ficha (ou pela etiqueta, se houver):
   `git show 17198b1:site/partes/<ficheiro>` e `git diff 17198b1 HEAD -- site/partes/<ficheiro> site/conteudo.php site/assets/css/site.css`.
2. Trazer para a versão atual só essa parte: o ficheiro de `partes/`, as chaves de `conteudo.php` e o bloco do `site.css` que lhe
   pertencem (tabela «As partes da página»), acertando os nomes que mudaram entretanto (ex.: `#casa` → `#a-casa`). Nunca repor a pasta
   `site/` inteira nem desfazer o resto.
3. Fechar como versão nova, com a nota «<parte> reposta da V<N>», e mostrar ao Diogo as duas lado a lado antes do «Lança».

**As capturas são feitas como o ensaio está no ar:** sem as portas da app (#189–#192 ainda não existem), com o calendário de exemplo e a
conta feita pelo site; o tempo é de ensaio. Quando as portas existirem, o `fotografar.sh` passa a usar a app de ensaio.
