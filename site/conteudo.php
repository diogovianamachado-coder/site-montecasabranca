<?php
// ============================================================================
//  Monte Casa Branca · CONTEÚDO DO SITE
//  Este é o ficheiro para editar textos, legendas, perguntas e fotografias.
//  Não é preciso tocar no código: o index.php e as partes lêem tudo daqui.
//  Regras: factos só do FACTOS.md (inc/factos.php); «Reguengo» só na morada.
//  Fotografias: ficheiro em fotos/<álbum>/; 'pos' é o ponto de foco (object-position, ex. '20% 70%').
//  Se existir um ficheiro com o mesmo nome e sufixo -m (ex. piscina-dia-m.jpg) é usado no telemóvel.
//  Álbuns: 'pares' => true mostra as fotografias duas a duas (antes | depois); 'etiqueta' é a palavra sobre a miniatura;
//  'sem_schema' => true deixa o álbum fora das imagens que os motores de busca recebem como «fotografias da casa».
// ============================================================================
declare(strict_types=1);

return [

    // ---- Cabeça da página (SEO) --------------------------------------------
    'titulo' => 'Monte Casa Branca · Casa inteira no Alentejo, Montemor-o-Novo',
    'descricao' => 'Uma casa inteira no Alentejo: 4 quartos, até 8 pessoas, piscina 10 × 5 m. Montemor-o-Novo, a 1 h de Lisboa.',
    'imagem_partilha' => 'exterior/piscina-dia.jpg',

    // ---- Menu -----------------------------------------------------------------
    'menu' => [
        ['A casa', '#casa'],
        ['Descobrir', '#descobrir'],
        ['Fotografias', '#fotografias'],
        ['Avaliações', '#avaliacoes'],
        ['Montemor-o-Novo', '#montemor'],
        ['Nacional 2', '#nacional2'],
        ['Perguntas', '#perguntas'],
        ['Contactos', '#contactos'],
    ],

    // ---- 1. Início (capa) -------------------------------------------------------
    'inicio' => [
        'foto' => ['src' => 'exterior/piscina-dia.jpg', 'alt' => 'Piscina da casa sob o céu azul do Alentejo, com a casa branca de telhado vermelho ao fundo', 'pos' => '50% 60%'],
        'titulo' => ['Uma casa inteira', 'no Alentejo'],   // duas linhas
        'subtitulo' => 'Monte Casa Branca · Montemor-o-Novo, a 1 h de Lisboa',
        'etiquetas' => [['pessoas', 'Até 8 pessoas'], ['cama', '4 quartos'], ['ondas', 'Piscina 10 × 5 m']],
        'botao' => ['Entrar pela casa', '#descobrir'],
        'nota' => 'Sem receção, sem pressa',
    ],

    // ---- 2. A casa (manifesto) ------------------------------------------------
    'casa' => [
        'eyebrow' => 'Uma casa inteira, só vossa',
        'titulo' => 'O dia é vosso',
        'titulo_italico' => 'A casa também',
        'texto' => 'Uma casa inteira no Alentejo para estar juntos, abrir as portas e deixar o dia acontecer',
    ],

    // ---- 3. Descobrir a casa (quatro espaços) -------------------------------------
    'descobrir' => [
        'eyebrow' => 'Descobrir a casa',
        'fecho' => 'Há dias em que não é preciso mais nada',
        'espacos' => [
            [
                'nome' => 'Piscina e exterior',
                'titulo' => 'Primeiro, lá fora',
                'texto' => 'A piscina de 10 por 5 metros, o jardim e o campo à volta. Zona exterior de uso livre e, de vez em quando, ovelhas a pastar',
                'fotos' => [
                    ['src' => 'exterior/piscina-dia.jpg', 'alt' => 'Água da piscina em primeiro plano, junto à casa', 'pos' => '20% 70%'],
                    ['src' => 'exterior/piscina-espreguicadeira.jpg', 'alt' => 'Espreguiçadeira à beira da piscina'],
                    ['src' => 'exterior/piscina-entardecer.jpg', 'alt' => 'A piscina ao entardecer'],
                    ['src' => 'exterior/campo-verde.jpg', 'alt' => 'O campo verde à volta da casa'],
                ],
            ],
            [
                'nome' => 'Alpendre',
                'texto' => 'O alpendre prolonga a casa para fora: mesas ao ar livre, sombra ao meio-dia e luz de fim de tarde',
                'fotos' => [
                    ['src' => 'exterior/alpendre.jpg', 'alt' => 'Duas cadeiras brancas e copos de vinho no alpendre'],
                    ['src' => 'exterior/alpendre-dia.jpg', 'alt' => 'O alpendre de dia'],
                    ['src' => 'exterior/alpendre-por-do-sol.jpg', 'alt' => 'O alpendre ao pôr do sol'],
                ],
            ],
            [
                'nome' => 'Sala e cozinha',
                'texto' => 'O salão reúne a cozinha equipada para mais do que oito, a mesa de refeições e a zona de estar, ligados ao exterior e à piscina',
                'nota' => 'Ar condicionado em todas as divisões, lareira na biblioteca',
                'fotos' => [
                    ['src' => 'interior/sala-portas.jpg', 'alt' => 'Salão com cozinha, mesa de refeições e zona de estar', 'pos' => '50% 40%'],
                    ['src' => 'interior/sala-mesa.jpg', 'alt' => 'A mesa de refeições na sala'],
                    ['src' => 'interior/cozinha.jpg', 'alt' => 'A cozinha equipada'],
                    ['src' => 'interior/lareira-acesa.jpg', 'alt' => 'A lareira da biblioteca'],
                ],
            ],
            [
                'nome' => 'Quartos e banho',
                'texto' => 'Dois quartos de casal e dois quartos com duas camas de solteiro. Roupa de cama nova, ar condicionado em todas as divisões, berço a pedido',
                'fotos' => [
                    ['src' => 'quartos/quarto.jpg', 'alt' => 'Quarto luminoso com cama feita e roupa de cama branca'],
                    ['src' => 'quartos/quarto-2.jpg', 'alt' => 'Um dos quartos'],
                    ['src' => 'quartos/casa-de-banho.jpg', 'alt' => 'Casa de banho'],
                ],
            ],
        ],
    ],

    // ---- 4. A casa, num relance (régua horizontal) -------------------------------
    'relance' => [
        'titulo' => 'A casa, num relance',
        'ligacao' => ['Ver fotografias', '#fotografias'],
        'fotos' => [
            ['src' => 'exterior/piscina-dia.jpg', 'alt' => 'Piscina da casa sob o céu azul, com a casa branca ao fundo', 'pos' => '40% 60%'],
            ['src' => 'exterior/alpendre.jpg', 'alt' => 'Alpendre com duas cadeiras brancas e copos de vinho'],
            ['src' => 'interior/sala-portas.jpg', 'alt' => 'Salão com cozinha, mesa de refeições e zona de estar', 'pos' => '50% 40%'],
            ['src' => 'quartos/quarto.jpg', 'alt' => 'Quarto luminoso com cama feita e roupa de cama branca'],
            ['src' => 'interior/sala-mesa.jpg', 'alt' => 'A mesa de refeições na sala'],
            ['src' => 'exterior/campo-verde.jpg', 'alt' => 'O campo à volta da casa'],
        ],
    ],

    // ---- 5. Quem cá esteve --------------------------------------------------------
    'avaliacoes' => [
        'eyebrow' => 'Quem cá esteve',
        'citacao' => null,           // null = usa a avaliação do FACTOS (inc/factos.php)
        'assinatura' => 'Hóspedes do Airbnb · 2023',
        'rodape' => 'Recebemos hóspedes desde 2022 · Airbnb · Booking · Vrbo',
    ],

    // ---- 6. Perguntas frequentes ----------------------------------------------------
    'perguntas' => [
        ['A casa é alugada por inteiro?', 'Sim. A casa é reservada na totalidade para o vosso grupo, até oito pessoas.'],
        ['Quantos quartos e casas de banho tem?', 'Quatro quartos e duas casas de banho: uma privativa no quarto principal e uma partilhada.'],
        ['A que horas podemos entrar e sair?', 'Entrada a partir das 16h, saída até às 11h. Ao fim de semana, a saída tardia pode ser combinada quando não há entrada no mesmo dia.'],
        ['Qual é a estadia mínima?', 'Habitualmente, duas noites. De 18 de julho a 31 de agosto, sete noites, de sábado a sábado.'],
        ['A limpeza está incluída?', 'A limpeza final é cobrada uma vez por estadia e aparece separadamente no resumo do preço.'],
        ['Podemos levar animais de companhia?', 'Sim, os animais de companhia são bem-vindos. Falem connosco para combinar os detalhes.'],
        ['Como é feito o pagamento?', '30 % para confirmar e o restante até ao terceiro dia útil antes da entrada, por transferência bancária ou PayPal.'],
        ['Também estão no Airbnb, Booking ou Vrbo?', 'Sim, a casa está nas três plataformas (ligações no fim da página). Reservar directamente connosco é a forma mais simples de falar com quem a conhece.'],
    ],

    // ---- 7. Fotografias (álbuns) -------------------------------------------------------
    // Para juntar fotografias novas: copiar o ficheiro para fotos/<álbum>/ e acrescentar a linha aqui.
    // Álbuns sem fotografias não aparecem.
    'fotografias' => [
        'titulo' => 'Fotografias',
        'albuns' => [
            [
                'nome' => 'Monte e exterior',
                'fotos' => [
                    ['src' => 'exterior/piscina-dia.jpg', 'alt' => 'Piscina da casa sob o céu azul, com a casa branca ao fundo', 'pos' => '40% 60%'],
                    ['src' => 'exterior/alpendre.jpg', 'alt' => 'Alpendre com duas cadeiras brancas e copos de vinho'],
                    ['src' => 'exterior/piscina-espreguicadeira.jpg', 'alt' => 'Espreguiçadeira à beira da piscina'],
                    ['src' => 'exterior/casa-campo-entardecer.jpg', 'alt' => 'A casa e a piscina vistas do campo, ao fim da tarde'],
                    ['src' => 'exterior/piscina-pinheiro-manha.jpg', 'alt' => 'A piscina e o pinheiro, de manhã'],
                    ['src' => 'exterior/alpendre-por-do-sol.jpg', 'alt' => 'Mesa posta no alpendre, com o sol a pôr-se atrás do pinheiro'],
                    ['src' => 'exterior/alpendre-piscina-manha.jpg', 'alt' => 'O alpendre e a piscina pela manhã'],
                    ['src' => 'exterior/piscina-chapeu-sol.jpg', 'alt' => 'Espreguiçadeiras e chapéu-de-sol junto à piscina'],
                    ['src' => 'exterior/casa-alpendre-lateral.jpg', 'alt' => 'A fachada da casa com o alpendre e a barra azul'],
                    ['src' => 'exterior/piscina-agua.jpg', 'alt' => 'A água da piscina com a casa ao fundo'],
                    ['src' => 'exterior/piscina-sobreiro.jpg', 'alt' => 'A piscina sob o sobreiro'],
                    ['src' => 'exterior/alpendre-dia.jpg', 'alt' => 'Almoço no alpendre, com o campo em frente'],
                    ['src' => 'exterior/sombra-arvore-parede.jpg', 'alt' => 'A sombra da árvore na parede branca e azul'],
                    ['src' => 'exterior/alpendre-mesa-jantar.jpg', 'alt' => 'A mesa de jantar no alpendre'],
                    ['src' => 'exterior/pateo-portas-vidro.jpg', 'alt' => 'O pátio visto do interior, pelas portas de vidro'],
                    ['src' => 'exterior/casa-oliveira.jpg', 'alt' => 'A casa, a piscina e a oliveira'],
                    ['src' => 'exterior/alpendre-vista-pinheiros.jpg', 'alt' => 'Do alpendre para a piscina e os pinheiros'],
                    ['src' => 'exterior/casa-sobreiros.jpg', 'alt' => 'A casa entre sobreiros'],
                    ['src' => 'exterior/casa-tronco-oliveira.jpg', 'alt' => 'A casa e a piscina por entre a oliveira'],
                    ['src' => 'exterior/casa-ceu-rosa.jpg', 'alt' => 'A casa ao entardecer, com o céu cor-de-rosa'],
                    ['src' => 'exterior/piscina-noite.jpg', 'alt' => 'A piscina iluminada, à noite'],
                    ['src' => 'exterior/por-do-sol.jpg', 'alt' => 'O pôr do sol reflectido na piscina'],
                    ['src' => 'exterior/pateo-noite.jpg', 'alt' => 'O pátio à noite'],
                    ['src' => 'exterior/alpendre-noite.jpg', 'alt' => 'O alpendre à noite'],
                    ['src' => 'exterior/casa-lua.jpg', 'alt' => 'A casa sob a lua'],
                    ['src' => 'exterior/alpendre-pinheiro.jpg', 'alt' => 'O alpendre e o pinheiro grande'],
                    ['src' => 'exterior/chamine-alentejana.jpg', 'alt' => 'A chaminé alentejana contra o céu azul'],
                    ['src' => 'exterior/casao-pergola.jpg', 'alt' => 'O casão e a pérgula'],
                    ['src' => 'exterior/chamine-arvore.jpg', 'alt' => 'A chaminé entre as árvores'],
                ],
            ],
            [
                'nome' => 'Sala, cozinha e biblioteca',
                'fotos' => [
                    ['src' => 'interior/sala-portas.jpg', 'alt' => 'Salão com cozinha, mesa de refeições e zona de estar', 'pos' => '50% 40%'],
                    ['src' => 'interior/sala-mesa.jpg', 'alt' => 'A mesa de refeições na sala'],
                    ['src' => 'interior/sala-sofa-tv.jpg', 'alt' => 'A zona de estar com a televisão'],
                    ['src' => 'interior/poltrona-janela.jpg', 'alt' => 'A poltrona à janela'],
                    ['src' => 'interior/estantes-cozinha.jpg', 'alt' => 'As estantes da cozinha e o tecto de madeira'],
                    ['src' => 'interior/salao-tecto-madeira.jpg', 'alt' => 'O salão com o tecto de madeira à vista'],
                    ['src' => 'interior/cozinha.jpg', 'alt' => 'A cozinha com ilha e balcão de madeira'],
                    ['src' => 'interior/cozinha-ilha.jpg', 'alt' => 'A ilha da cozinha e a porta para o pátio'],
                    ['src' => 'interior/sala-mesa-sofa.jpg', 'alt' => 'Mesa de refeições e sofá, com a porta aberta para o alpendre'],
                    ['src' => 'interior/mesa-refeicoes.jpg', 'alt' => 'A mesa de refeições para oito'],
                    ['src' => 'interior/cozinha-sala.jpg', 'alt' => 'Da cozinha para a sala'],
                    ['src' => 'interior/sala-poltronas.jpg', 'alt' => 'As poltronas da sala'],
                    ['src' => 'interior/lareira-cadeira.jpg', 'alt' => 'A lareira e a cadeira dourada'],
                    ['src' => 'interior/biblioteca-tapete-azul.jpg', 'alt' => 'A biblioteca, com o tapete azul e o sofá-cama'],
                    ['src' => 'interior/biblioteca-sofa.jpg', 'alt' => 'O sofá-cama da biblioteca, junto à lareira'],
                    ['src' => 'interior/lareira-acesa.jpg', 'alt' => 'A lareira acesa, no inverno'],
                    ['src' => 'interior/biblioteca-poltrona-estante.jpg', 'alt' => 'A poltrona da biblioteca e a estante'],
                    ['src' => 'interior/corredor-quartos.jpg', 'alt' => 'O corredor para os quartos'],
                    ['src' => 'interior/corredor-luz.jpg', 'alt' => 'O corredor com a luz do fim do dia'],
                    ['src' => 'interior/corredor-noite.jpg', 'alt' => 'O corredor à noite'],
                ],
            ],
            [
                'nome' => 'Quartos e banho',
                'fotos' => [
                    ['src' => 'quartos/quarto.jpg', 'alt' => 'Quarto luminoso com cama feita e roupa de cama branca'],
                    ['src' => 'quartos/quarto-2.jpg', 'alt' => 'Quarto de casal com porta para o alpendre'],
                    ['src' => 'quartos/quarto-casal-comoda.jpg', 'alt' => 'Quarto de casal, com cómoda e cadeira de baloiço'],
                    ['src' => 'quartos/casa-de-banho-marmore.jpg', 'alt' => 'Casa de banho em mármore, com lavatório suspenso'],
                    ['src' => 'quartos/quarto-duas-camas.jpg', 'alt' => 'Quarto com duas camas e porta para o exterior'],
                    ['src' => 'quartos/cama-verde.jpg', 'alt' => 'Cama com roupa verde-água'],
                    ['src' => 'quartos/quarto-manta-vermelha.jpg', 'alt' => 'Quarto com manta vermelha e tapete às riscas'],
                    ['src' => 'quartos/espelho-quarto.jpg', 'alt' => 'O espelho de pé do quarto'],
                    ['src' => 'quartos/quarto-duas-camas-2.jpg', 'alt' => 'Quarto com duas camas, roupa cinzenta'],
                    ['src' => 'quartos/quarto-amarelo.jpg', 'alt' => 'Quarto com duas camas e almofadas amarelas'],
                    ['src' => 'quartos/casa-de-banho.jpg', 'alt' => 'Casa de banho com duche de vidro e lavatório duplo'],
                    ['src' => 'quartos/casa-de-banho-2.jpg', 'alt' => 'Casa de banho com lavatório duplo'],
                    ['src' => 'quartos/casa-de-banho-pequena.jpg', 'alt' => 'A casa de banho de serviço'],
                ],
            ],
            [
                // Álbum «A Quinta» do Zenfolio, pela mesma ordem (design/fotos/galeria/03-a-quinta/).
                'nome' => 'A quinta',
                'fotos' => [
                    ['src' => 'quinta/casa-pinheiro-terreno.jpg', 'alt' => 'O pinheiro e a casa, vistos do terreno'],
                    ['src' => 'quinta/casa-piscina-campo.jpg', 'alt' => 'A casa e a piscina vistas do campo'],
                    ['src' => 'quinta/piscina-por-do-sol.jpg', 'alt' => 'O céu do pôr do sol refletido na piscina'],
                    ['src' => 'quinta/piscina-alpendre-entardecer.jpg', 'alt' => 'A piscina vista do alpendre, ao entardecer'],
                    ['src' => 'quinta/casa-ervas-altas.jpg', 'alt' => 'A casa vista do campo, por entre as ervas altas'],
                    ['src' => 'quinta/ovelhas.jpg', 'alt' => 'Ovelhas a pastar no campo'],
                    ['src' => 'exterior/campo-verde.jpg', 'alt' => 'O campo verde à volta da casa'],
                    ['src' => 'quinta/pinheiros-alpendre.jpg', 'alt' => 'Os pinheiros, com um dos alpendres da casa ao fundo'],
                    ['src' => 'quinta/pinheiros-sombra.jpg', 'alt' => 'À sombra dos pinheiros, com o olival ao fundo'],
                    ['src' => 'quinta/olival.jpg', 'alt' => 'O olival'],
                    ['src' => 'quinta/pinheiro-casa.jpg', 'alt' => 'O pinheiro grande ao lado da casa'],
                    ['src' => 'quinta/pinheiro-contraluz.jpg', 'alt' => 'O sol por entre o pinheiro'],
                    ['src' => 'quinta/cao-campo.jpg', 'alt' => 'Um cão à solta no campo'],
                    ['src' => 'quinta/olival-agua.jpg', 'alt' => 'Oliveiras, com a água ao fundo'],
                    ['src' => 'quinta/olival-encosta.jpg', 'alt' => 'O olival na encosta'],
                    ['src' => 'quinta/cao-olival.jpg', 'alt' => 'Um cão a passear no olival'],
                    ['src' => 'quinta/oliveiras-vedacao.jpg', 'alt' => 'Oliveiras antigas junto à vedação'],
                ],
            ],
            [
                // Os 11 pares do álbum «Antes e Depois» do Zenfolio, sempre pela ordem antes, depois
                // (design/fotos/galeria/04-antes-e-depois/). Os ângulos de cada par não são iguais: mostram-se lado a lado.
                'nome' => 'Antes e depois',
                'pares' => true,
                'sem_schema' => true,
                'fotos' => [
                    ['src' => 'antes-depois/casa-piscina-antes.jpg', 'alt' => 'A casa e a piscina · antes: os dois edifícios e o campo seco', 'etiqueta' => 'Antes'],
                    ['src' => 'antes-depois/casa-piscina-depois.jpg', 'alt' => 'A casa e a piscina · depois', 'etiqueta' => 'Depois'],
                    ['src' => 'antes-depois/salao-antes.jpg', 'alt' => 'O salão · antes: o interior do antigo casão, em bruto', 'etiqueta' => 'Antes'],
                    ['src' => 'antes-depois/salao-depois.jpg', 'alt' => 'O salão · depois: as vigas novas e a zona de estar', 'etiqueta' => 'Depois'],
                    ['src' => 'antes-depois/fachada-antes.jpg', 'alt' => 'A fachada da casa principal · antes', 'etiqueta' => 'Antes'],
                    ['src' => 'antes-depois/fachada-depois.jpg', 'alt' => 'A fachada da casa principal · depois, com a barra azul', 'etiqueta' => 'Depois'],
                    ['src' => 'antes-depois/chamine-antes.jpg', 'alt' => 'A chaminé · antes', 'etiqueta' => 'Antes'],
                    ['src' => 'antes-depois/chamine-depois.jpg', 'alt' => 'A chaminé · depois do restauro', 'pos' => '50% 12%', 'etiqueta' => 'Depois'],
                    ['src' => 'antes-depois/patio-antes.jpg', 'alt' => 'O pátio · antes: o espaço entre as duas casas', 'etiqueta' => 'Antes'],
                    ['src' => 'antes-depois/patio-depois.jpg', 'alt' => 'O pátio · depois: envidraçado, com vista para o alpendre e a piscina', 'etiqueta' => 'Depois'],
                    ['src' => 'antes-depois/corredor-antes.jpg', 'alt' => 'O corredor · antes', 'etiqueta' => 'Antes'],
                    ['src' => 'antes-depois/corredor-depois.jpg', 'alt' => 'O corredor · depois', 'etiqueta' => 'Depois'],
                    ['src' => 'antes-depois/pergula-tanque-antes.jpg', 'alt' => 'A pérgula e o tanque · antes', 'etiqueta' => 'Antes'],
                    ['src' => 'antes-depois/pergula-tanque-depois.jpg', 'alt' => 'A pérgula e o tanque · depois, de branco e azul', 'etiqueta' => 'Depois'],
                    ['src' => 'antes-depois/quarto-antes.jpg', 'alt' => 'Um quarto da casa principal · antes', 'pos' => '50% 35%', 'etiqueta' => 'Antes'],
                    ['src' => 'antes-depois/quarto-depois.jpg', 'alt' => 'Um quarto da casa principal · depois', 'etiqueta' => 'Depois'],
                    ['src' => 'antes-depois/poco-frente-antes.jpg', 'alt' => 'O poço, de frente · antes', 'etiqueta' => 'Antes'],
                    ['src' => 'antes-depois/poco-frente-depois.jpg', 'alt' => 'O poço, de frente · depois', 'etiqueta' => 'Depois'],
                    ['src' => 'antes-depois/poco-lado-antes.jpg', 'alt' => 'O poço, de lado · antes', 'etiqueta' => 'Antes'],
                    ['src' => 'antes-depois/poco-lado-depois.jpg', 'alt' => 'O poço, de lado · depois', 'etiqueta' => 'Depois'],
                    ['src' => 'antes-depois/nora-antes.jpg', 'alt' => 'A nora do poço · antes', 'pos' => '50% 40%', 'etiqueta' => 'Antes'],
                    ['src' => 'antes-depois/nora-depois.jpg', 'alt' => 'A nora do poço · depois', 'etiqueta' => 'Depois'],
                ],
            ],
            [
                // Álbum «Montemor o Novo» do Zenfolio, pela mesma ordem (design/fotos/galeria/05-montemor-o-novo/).
                'nome' => 'Montemor-o-Novo',
                'sem_schema' => true,
                'fotos' => [
                    ['src' => 'montemor/banco-vermelho.jpg', 'alt' => 'Um banco vermelho à sombra, junto a uma casa de barra azul'],
                    ['src' => 'montemor/estacao-paiao.jpg', 'alt' => 'A antiga estação ferroviária do Paião, com uma bicicleta à porta'],
                    ['src' => 'montemor/caminho-arvores-bicicleta.jpg', 'alt' => 'Uma bicicleta num caminho de terra, sob um túnel de árvores'],
                    ['src' => 'montemor/montado-bicicleta.jpg', 'alt' => 'Uma bicicleta parada junto ao montado'],
                    ['src' => 'montemor/castelo-baloico.jpg', 'alt' => 'O baloiço junto às ruínas do castelo de Montemor-o-Novo'],
                    ['src' => 'montemor/castelo-porta-vista.jpg', 'alt' => 'A vila vista por uma porta da muralha'],
                    ['src' => 'montemor/castelo-ruinas.jpg', 'alt' => 'As ruínas no alto do castelo de Montemor-o-Novo'],
                    ['src' => 'montemor/rua-branca-azul.jpg', 'alt' => 'Uma rua de casas caiadas, com barras azuis'],
                    ['src' => 'montemor/igreja-rua.jpg', 'alt' => 'Uma igreja branca e azul, vista da rua'],
                    ['src' => 'montemor/igreja-fachada.jpg', 'alt' => 'A fachada da igreja, com o painel de azulejos'],
                    ['src' => 'montemor/miradouro-candeeiros.jpg', 'alt' => 'A vila vista de um miradouro, entre dois candeeiros'],
                    ['src' => 'montemor/vila-muralha.jpg', 'alt' => 'Os telhados de Montemor-o-Novo vistos da muralha'],
                    ['src' => 'montemor/janela-flores.jpg', 'alt' => 'Uma janela com grade de ferro e vasos de flores'],
                    ['src' => 'montemor/miradouro-banco-bicicleta.jpg', 'alt' => 'Um miradouro com banco, com o castelo ao longe'],
                ],
            ],
        ],
    ],

    // ---- 8. Onde estamos ---------------------------------------------------------------
    'montemor' => [
        'foto' => ['src' => 'exterior/alpendre.jpg', 'alt' => 'Fim de tarde no alpendre, com o campo alentejano à volta', 'pos' => '50% 60%'],
        'eyebrow' => 'Onde estamos',
        'titulo' => 'O Alentejo mesmo à porta',
        'botao_mapa' => 'Abrir no Google Maps',
        'blocos' => [
            ['id' => null, 'titulo' => 'Montemor-o-Novo', 'texto' => 'Subir ao castelo, percorrer as ruas, descobrir o património e escolher onde parar à mesa. Montemor-o-Novo também faz parte da estadia'],
            ['id' => 'nacional2', 'titulo' => 'Nacional 2 · roteiro de duas noites', 'texto' => 'Façam de Montemor-o-Novo uma pausa de duas noites na viagem pela Nacional 2. Um dia para descobrir Montemor. Outro para passear por Évora. E a mesma casa para regressar ao fim do dia'],
        ],
    ],

    // ---- 9. Contactos (rodapé) ------------------------------------------------------------
    'contactos' => [
        'titulo' => 'Venham conhecer a casa, falem connosco',
        'texto' => 'Contem-nos as vossas datas e como gostam de viajar. Respondemos por WhatsApp ou por email, sem formulários nem esperas',
    ],

    // ---- 10. Painel «Verificar disponibilidade» --------------------------------------------
    'disponibilidade' => [
        'eyebrow' => 'Disponibilidade',
        'titulo' => 'As vossas datas',
        'legenda_livre' => 'Livre',
        'legenda_ocupado' => 'Ocupado',
        'nota_calendario' => 'Datas indicativamente livres · confirmamos no pedido',
        'simular' => 'Simulem a estadia',
        'nota_preco' => 'A disponibilidade e o valor final são confirmados connosco, por mensagem',
        'pedir' => 'Pedir estas datas',
        'tempo' => 'Tempo em Montemor-o-Novo',
        'fonte_tempo' => 'Dados: Open-Meteo',
    ],

    // ---- Barra fixa em baixo ----------------------------------------------------------------
    'dock' => [
        'menu' => 'Menu',
        'contacto' => 'Contacto',
        'disponibilidade' => 'Verificar disponibilidade',
    ],
];
