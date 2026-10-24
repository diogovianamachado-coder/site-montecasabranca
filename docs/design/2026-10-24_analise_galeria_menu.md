# Monte Casa Branca · análise da galeria e navegação mobile

24/10/2026 · Propostas para apreciação. Não altera a prancha nem a estrutura aprovada. Não é uma nova versão de design.

## Base observada
As 22 capturas IMG_4594.jpeg a IMG_4615.jpeg mostram a galeria do Zenfolio e permitem observar a organização, apesar de continuar bloqueado o acesso direto deste navegador.

Organização existente: All Media (vista agregada), O Monte (exteriores e espaços comuns), Os Quartos, A Quinta, Antes e Depois, Montemor o Novo. O menu horizontal percorre os grupos; as fotografias formam uma grelha com proporções variadas. As capturas não fornecem os URLs individuais dos álbuns nem os ficheiros originais.

O utilizador quer uma curadoria que acompanhe a mensagem: sala/cozinha de verão e inverno, piscina com especial protagonismo, biblioteca e lareira no inverno, quinta; Montemor na página “Explora Montemor-o-Novo”. A página principal em scroll continua o foco, seguida da exploração voluntária da galeria e da disponibilidade.

## Leitura estética
O acervo é mais rico que a seleção reduzida do protótipo: piscina com céu azul, pôr do sol, luz noturna, refeições no alpendre, biblioteca com lareira, luz interior, campo verde e seco. A personalidade vem da mudança de luz e dos modos de estar. Evitar sequências de enquadramentos quase iguais na home.

Manter o estilo claro da prancha (cal, terracota, tipografia editorial, ícones de traço fino). A organização do Zenfolio informa o acesso; fundo preto, grande cabeçalho, marca de água e interface da plataforma não são automaticamente decisões para o site.

## Proposta para a home, dentro da estrutura existente
1. Hero preservado: grande fotografia, mensagem e características imediatamente acessíveis.
2. A casa / por dentro: sala e cozinha abertas ao exterior. Contraponto discreto de inverno com biblioteca/lareira, sem outro manifesto longo.
3. Trio preservado: dentro / fora / piscina. A fotografia de piscina pode ganhar a maior área na composição. Esta é uma proposta de curadoria/proporção, não uma alteração já aprovada.
4. “Explorar a galeria” imediatamente depois. Entrada geral e entradas contextuais nas imagens.
5. Restantes conteúdos e disponibilidade. O calendário continua acessível sem obrigar a percorrer a home inteira.

Piscina: a home deve usar um enquadramento principal forte e um contraponto de atmosfera (entardecer ou noite); a galeria pode explorar os outros ângulos. Explorar ao máximo não significa repetir todas as fotografias semelhantes na página principal.

Verão/inverno: usar como temas de curadoria e etiquetas, sem duplicar álbuns completos nem fazer promessas de sazonalidade automática. A biblioteca/lareira dá ao inverno uma imagem própria; a quinta mostra as estações através do campo e da luz.

## Proposta de grupos da galeria
- Todas: vista agregada das fotografias selecionadas. Sequência organizada; os pares históricos permanecem agrupados e legendados no seu bloco, sem misturar ruínas com a casa atual na entrada.
- Sala e cozinha: convívio, refeições e relação com o exterior; variedade de verão/inverno.
- Piscina e alpendre: água, refeições, sombra, luz do fim do dia e noite; protagonismo visual.
- Quartos: os quatro quartos e casas de banho; distinguir configurações reais, evitar multiplicar fotos quase iguais.
- Biblioteca e lareira: leitura, inverno, fogo e ambiente interior.
- A quinta: olival, árvores, campo e percursos dentro da propriedade; distinguir de imagens de passeios fora da quinta.
- Antes e depois: pares corretos, com a mesma identificação e ordem Antes → Depois.

Montemor fica em “Explora Montemor-o-Novo”, com acesso próprio às fotografias e ligações de turismo/N2. Não é necessário um oitavo filtro no conjunto principal da casa. Esta taxonomia é uma proposta, não uma transcrição literal do menu Zenfolio nem uma divisão final aprovada.

Menu de grupos horizontal com texto e indicação visível de continuidade; fotografias grandes com espaços consistentes e respeito pelos formatos. Evitar miniaturas minúsculas e esconder toda a oferta numa gaveta. Abrir uma fotografia em ampliação com gesto lateral, contador e fecho; voltar à posição anterior. Na versão funcional, carregar primeiro as fotos visíveis e conservar navegação por teclado e nomes acessíveis.

## Antes/depois: correções que as capturas esclarecem
1. Casão/salão: IMG_4608.jpeg mostra o interior atual ao lado do interior por renovar (trave, cobertura e abertura frontal correspondentes). A imagem atual corresponde à referência `depois_casao_interior_a3.jpg`. O “antes” correto é o interior bruto mostrado na captura, cujo original ainda precisa de ser localizado. NÃO usar `antes_casao_a14.jpg` neste par.
2. Pérgula/estrutura exterior: IMG_4610.jpeg mostra o atual e o antigo com a estrutura circular e a pérgula. É a este conjunto que pertence `antes_casao_a14.jpg`, apesar do nome enganador. Comparar com a fotografia atual desse mesmo local, não com o salão.
3. Quarto: IMG_4610.jpeg associa o quarto antigo de paredes rosadas a um quarto atual com abertura para o alpendre e decoração circular sobre a cama. A referência atual aproxima-se de `quarto.jpg` (IMG_0322), e não do `quarto_4413.jpg` usado no protótipo. Localizar os originais e conferir a correspondência antes da montagem final; as capturas revelam o pareamento pretendido, mas não fornecem metadados.
4. Outros pares visualmente fortes: fachada principal/casa e piscina, chaminé restaurada, corredor e poço (IMG_4608–4611). Priorizar dois ou três pares claros na apresentação e deixar a história completa na galeria.

A identidade espacial pode ficar clara sem os enquadramentos terem o mesmo ângulo. Usar comparação lado a lado ou alternância por toque. Reservar um slider sobreposto para pares realmente alinháveis: não deformar nem inventar o “antes”.

A análise anterior que tratava os dois pares do protótipo como herdados não os validava. As capturas agora revelam que precisam de correção. O contrato `design/site/galeria.json` regista a substituição necessária; não montar/publicar os pares atuais como verificados.

## Proposta de navegação inspirada nas novas referências
O utilizador apresenta as capturas IMG_4616–4618 como referência de comportamento de menu e ação flutuante. Usar apenas esse comportamento na análise; não copiar o aspeto de dashboard de reservas nem informação de hóspedes.

Proposta preferida para apreciar:
- Manter logo e menu discreto no cabeçalho.
- Em mobile, trocar a barra de três itens por duas ações flutuantes: Menu (compacto, com ícone) e Verificar disponibilidade (principal, terracota).
- A ação de disponibilidade aparece quando o botão equivalente do hero sai do ecrã; fica acessível durante a leitura e não se repete em grandes blocos no rodapé.
- Menu abre um painel com A casa, Fotografias, Explora Montemor-o-Novo, Datas e estadia, Perguntas e Contactos; Início acessível pelo logo e no painel. Painel usa o mesmo fundo cal e tipografia do site.
- Esconder os controlos flutuantes quando o painel ou a fotografia ampliada estão abertos, e quando a ação equivalente do calendário está visível. Evitar cobrir legendas, formulário e teclado.
- Verificar disponibilidade abre diretamente a área de calendário; sem nova página intermédia comercial. O motor e as regras continuam com o Claude.
- No desktop, manter o menu no cabeçalho e a ação discreta já existente. Não ampliar mecanicamente o controlo flutuante do mobile.

Requisitos para implementação futura: área segura do dispositivo, alvos de toque adequados, rótulos completos, fecho acessível, gestão de foco e retorno à posição de leitura. Movimentos curtos e opcionais, respeitando redução de movimento. Não bloquear o scroll nem exigir animações para revelar conteúdo.

## Estado e próximos passos
Confirmado: prancha, estrutura e prioridade da home; fotos reais; orientação interior/exterior/piscina, inverno/biblioteca/quinta, Montemor em Explora.

Proposto agora: grupos da galeria, seleção editorial por luz/estação, par de ações flutuantes e os detalhes do painel.

Pendente: URLs diretos dos álbuns, originais para os pares corrigidos e curadoria final. Não usar capturas de ecrã como fotografias finais. Não alterar a estrutura ou publicar enquanto se aprecia esta análise. Todas as versões anteriores continuam no histórico do GitHub.
