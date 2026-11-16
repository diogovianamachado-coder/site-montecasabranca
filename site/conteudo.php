<?php
// ============================================================================
//  Monte Casa Branca · CONTEÚDO DO SITE
//  Este é o ficheiro para editar textos, legendas, perguntas e fotografias.
//  Não é preciso tocar no código: o index.php e as partes lêem tudo daqui.
//  Regras: factos só do FACTOS.md (inc/factos.php); «Reguengo» só na morada.
//  Tom (Diogo, 15/11/2026): frases curtas, calorosas, na segunda pessoa do plural; nunca literal, nunca um testamento.
//  Fotografias: ficheiro em fotos/<álbum>/; 'pos' é o ponto de foco (object-position, ex. '20% 70%'); 'pos_m' o mesmo, só no telemóvel.
//  Se existir um ficheiro com o mesmo nome e sufixo -m (ex. piscina-dia-m.jpg) é usado no telemóvel.
//  'legenda' é a frase curta escrita sobre a fotografia nos três capítulos da casa e em Montemor; 'alt' descreve a imagem a quem não a vê.
//  Composição (versão 3, 16/11/2026): feita com o Lovable a pedido do Diogo; cada capítulo abre com sobretítulo, título e uma frase.
//  Álbuns: 'sem_schema' => true deixa o álbum fora das imagens que os motores de busca recebem como «fotografias da casa».
// ============================================================================
declare(strict_types=1);

return [

    // ---- Cabeça da página (SEO) --------------------------------------------
    'titulo' => 'Monte Casa Branca · Casa inteira no Alentejo, Montemor-o-Novo',
    'descricao' => 'Uma casa inteira no Alentejo: 4 quartos, até 8 pessoas, piscina 10 × 5 m. Montemor-o-Novo, a 1 h de Lisboa.',
    'imagem_partilha' => 'exterior/piscina-dia.jpg',

    // ---- Menus ----------------------------------------------------------------
    // A barra de cima da capa (só no computador) e o menu completo (botão «Menu»). A ordem é a da página.
    'menu_topo' => [
        ['Montemor-o-Novo', '#montemor'],
        ['N2', '#nacional2'],
        ['Passear pelo Monte', '#galeria'],      // a galeria (Diogo, 15/11/2026: «vamos passar a chamar "passear pelo monte"»)
        ['Antes de chegar', '#antes-de-chegar'],
        ['Avaliações', '#avaliacoes'],
    ],
    'menu' => [
        // 'sub' = a linha pequena por baixo: cada palavra leva ao seu momento da casa
        ['A casa', '#a-casa', 'sub' => [['Por fora', '#por-fora'], ['Sem pressa', '#sem-pressa'], ['Por dentro', '#por-dentro']]],
        ['Montemor-o-Novo', '#montemor'],
        ['Nacional 2', '#nacional2'],
        ['Passear pelo Monte', '#galeria'],
        ['Antes de chegar', '#antes-de-chegar'],
        ['Quem já ficou', '#avaliacoes'],
        ['Contactos', '#contactos'],
    ],
    'menu_rodape' => 'Uma casa inteira no Alentejo',

    // ---- 1. Início (capa) -------------------------------------------------------
    'inicio' => [
        'titulo' => ['Uma casa inteira', 'O Alentejo à vossa porta'],   // em cascata: a segunda linha desce um degrau
        'subtitulo' => 'Monte Casa Branca · Montemor-o-Novo, a 1 h de Lisboa',
        'etiquetas' => [['pessoas', 'Até 8 pessoas'], ['cama', '4 quartos'], ['ondas', 'Piscina 10 × 5 m']],
        'botao' => ['Entrar pela casa', '#a-casa'],
        'nota' => 'Sem receção, sem pressa',
        // A capa: escolhida pelo Diogo a 15/11/2026, para o computador e para o telemóvel («capa: 1 · capa telemóvel: 1»).
        // Fotografia 1, com o título no céu e quase sem máscara (o texto leva sombra própria); a casa fica toda à vista.
        // As opções 2 e 3 do estudo saíram (estão no histórico do repositório, commit 5f23bdc). Se um dia houver outro estudo,
        // basta juntar opções a 'capas': no ensaio, ?capa=N mostra cada uma, com botões para trocar.
        'capa' => '1',
        'capas' => [
            '1' => ['nome' => 'Fotografia 1 · título no céu · quase sem máscara', 'titulo' => 'ceu', 'mascara' => 'minima',
                'foto' => ['src' => 'exterior/piscina-dia.jpg', 'alt' => 'A piscina sob o céu azul do Alentejo, com a casa branca de telhado vermelho ao fundo', 'pos' => '50% 0%', 'pos_m' => '22% 50%']],
        ],
    ],

    // ---- 2. A casa: a mensagem «Por fora · Sem pressa · Por dentro» ----------------
    'casa' => [
        'eyebrow' => 'A casa',
        'titulo' => [['Por fora', '#por-fora'], ['Sem pressa', '#sem-pressa'], ['Por dentro', '#por-dentro']],   // três linhas, cada uma com a sua seta
        'texto' => 'Uma casa inteira, só vossa, para abrir as portas e deixar o dia acontecer',
    ],

    // ---- 3. Os três capítulos da casa -----------------------------------------------
    // 'palavra' é o título grande do capítulo (a mesma do cartaz); 'frase' vem por baixo, a cor; 'texto' é o parágrafo e 'nota' a linha pequena.
    // As fotografias passam uma de cada vez, em sequência e em círculo: o dedo leva-as, as setas também, e avançam sozinhas devagar.
    'momentos' => [
        [
            'id' => 'por-fora', 'palavra' => 'Por fora',
            'frase' => 'O melhor lugar é cá fora',
            'texto' => 'Da água à sombra do alpendre, o dia vive-se de portas abertas',
            'fotos' => [
                ['src' => 'exterior/piscina-agua.jpg', 'alt' => 'A água da piscina em primeiro plano, com a casa e o chapéu-de-sol ao fundo', 'legenda' => 'A piscina, a casa e a luz do Alentejo'],
                ['src' => 'exterior/piscina-sobreiro.jpg', 'alt' => 'A piscina e o pinheiro grande, com o sol por trás', 'legenda' => 'Ficar até a luz mudar'],
                ['src' => 'exterior/casa-oliveira.jpg', 'alt' => 'A casa, a piscina e a oliveira', 'legenda' => 'A casa, entre as árvores'],
                ['src' => 'quinta/ovelhas.jpg', 'alt' => 'Ovelhas a pastar no campo', 'legenda' => 'E, de vez em quando, ovelhas'],
            ],
        ],
        [
            'id' => 'sem-pressa', 'palavra' => 'Sem pressa',
            'frase' => 'A mesa pode esperar por todos',
            'texto' => 'Sombra para os dias quentes, uma mesa para as conversas longas e o campo sempre por perto',
            'fotos' => [
                ['src' => 'exterior/alpendre-por-do-sol.jpg', 'alt' => 'Mesa posta no alpendre, com o sol a pôr-se atrás do pinheiro', 'legenda' => 'O alpendre, ao fim da tarde'],
                ['src' => 'exterior/alpendre-mesa-jantar.jpg', 'alt' => 'A mesa de jantar no alpendre', 'legenda' => 'Lugar para todos à mesa'],
                ['src' => 'exterior/alpendre.jpg', 'alt' => 'Duas cadeiras brancas e copos de vinho no alpendre', 'legenda' => 'Dois copos e a tarde inteira'],
                ['src' => 'exterior/alpendre-dia.jpg', 'alt' => 'Almoço no alpendre, com o campo em frente', 'legenda' => 'Almoçar com o campo em frente'],
            ],
        ],
        [
            'id' => 'por-dentro', 'palavra' => 'Por dentro',
            'frase' => 'Entrar sem deixar o exterior para trás',
            'texto' => 'O salão abre-se à piscina. A cozinha, a mesa e a sala dão lugar a cozinhar, conversar e ficar mais um pouco',
            'nota' => 'Quatro quartos, lareira na biblioteca e ar condicionado em todas as divisões',
            'fotos' => [
                ['src' => 'interior/sala-portas.jpg', 'alt' => 'O salão visto pelas portas abertas: cozinha, mesa de refeições e zona de estar', 'legenda' => 'O salão, de portas abertas'],
                ['src' => 'interior/sala-mesa-sofa.jpg', 'alt' => 'Mesa de refeições e sofá, com a porta aberta para o alpendre', 'legenda' => 'À mesa cabem todos'],
                ['src' => 'interior/cozinha.jpg', 'alt' => 'A cozinha com ilha e balcão de madeira', 'legenda' => 'A cozinha, pronta para mais do que oito'],
                ['src' => 'interior/biblioteca-tapete-azul.jpg', 'alt' => 'A biblioteca, com o tapete azul e o sofá', 'legenda' => 'Livros, lareira e uma tarde inteira'],
                ['src' => 'quartos/quarto.jpg', 'alt' => 'Quarto luminoso com cama feita e roupa de cama branca', 'legenda' => 'Quatro quartos para descansar'],
            ],
        ],
    ],

    // A frase que fecha o dia.
    'fecho' => 'Há dias em que não é preciso mais nada',

    // ---- 4. Fecho da casa: a frase e a fila de fotografias mais pequenas, para levar com o dedo -------
    // Sem casas de banho (Diogo, 15/11/2026: não fazem parte da mensagem nem das fotografias de destaque; só na galeria).
    // As fotografias ao alto ficam mais altas e estreitas do que as outras (o site vê-o pelo ficheiro).
    'regua' => [
        'titulo' => 'Há mais casa para descobrir',
        'ligacao' => ['Passear pelo Monte', '#galeria'],
        'fotos' => [
            ['src' => 'exterior/piscina-chapeu-sol.jpg', 'alt' => 'Espreguiçadeiras e chapéu-de-sol junto à piscina'],
            ['src' => 'interior/salao-tecto-madeira.jpg', 'alt' => 'O salão com o teto de madeira à vista'],
            ['src' => 'quartos/quarto-casal-comoda.jpg', 'alt' => 'Quarto de casal, com cómoda e cadeira de baloiço'],
            ['src' => 'exterior/casa-campo-entardecer.jpg', 'alt' => 'A casa e a piscina vistas do campo, ao fim da tarde'],
            ['src' => 'interior/cozinha-ilha.jpg', 'alt' => 'A ilha da cozinha e a porta para o pátio'],
            ['src' => 'exterior/por-do-sol.jpg', 'alt' => 'O pôr do sol refletido na piscina'],
            ['src' => 'quartos/quarto-duas-camas.jpg', 'alt' => 'Quarto com duas camas e porta para o exterior'],
            ['src' => 'exterior/alpendre-vista-pinheiros.jpg', 'alt' => 'Do alpendre para a piscina e os pinheiros'],
            ['src' => 'interior/sala-poltronas.jpg', 'alt' => 'As poltronas da sala'],
            ['src' => 'exterior/piscina-noite.jpg', 'alt' => 'A piscina iluminada, à noite'],
            ['src' => 'quinta/olival.jpg', 'alt' => 'O olival'],
            ['src' => 'interior/lareira-acesa.jpg', 'alt' => 'A lareira acesa, no inverno'],
            ['src' => 'interior/sala-mesa.jpg', 'alt' => 'A mesa de refeições na sala'],
            ['src' => 'quinta/cao-campo.jpg', 'alt' => 'Um cão à solta no campo'],
            ['src' => 'exterior/casa-tronco-oliveira.jpg', 'alt' => 'A casa e a piscina por entre a oliveira'],
            ['src' => 'interior/biblioteca-sofa.jpg', 'alt' => 'O sofá da biblioteca, junto à lareira'],
            ['src' => 'exterior/sombra-arvore-parede.jpg', 'alt' => 'A sombra da árvore na parede branca e azul'],
            ['src' => 'exterior/casa-lua.jpg', 'alt' => 'A casa sob a lua'],
        ],
    ],

    // ---- 5. Montemor-o-Novo (capítulo com abertura própria) ------------------------------------
    // As ligações ('visit_montemor', 'ecopista', 'rota_n2', 'maps') estão em inc/factos.php → 'ligacoes'.
    'montemor' => [
        'eyebrow' => 'A 1 h de Lisboa',
        'titulo' => 'Montemor-o-Novo também é a estadia',
        'texto' => 'Subir ao castelo, descobrir as ruas e escolher onde parar à mesa. A casa fica a 3 km do centro e Évora a 25 minutos',
        'ligacao' => ['Visitar Montemor-o-Novo', 'visit_montemor'],   // não «Passear por…»: «Passear pelo Monte» é a galeria
        'ecopista' => [
            'titulo' => 'Ecopista do Montado',
            'texto' => 'A Ecopista do Montado passa à nossa porta: a antiga linha de comboio, hoje caminho entre sobreiros, para fazer a pé ou de bicicleta',
            'ligacao' => ['Conhecer a ecopista', 'ecopista'],
        ],
        // As fotografias passam aqui mesmo, em sequência (não levam a outra página).
        'fotos' => [
            ['src' => 'montemor/castelo-ruinas.jpg', 'alt' => 'As ruínas no alto do castelo de Montemor-o-Novo', 'legenda' => 'O castelo, lá no alto', 'pos' => '50% 100%'],
            ['src' => 'montemor/vila-muralha.jpg', 'alt' => 'Os telhados de Montemor-o-Novo vistos da muralha', 'legenda' => 'A vila, vista da muralha'],
            ['src' => 'montemor/rua-branca-azul.jpg', 'alt' => 'Uma rua de casas caiadas, com barras azuis', 'legenda' => 'Ruas de cal e barras azuis'],
            ['src' => 'montemor/caminho-arvores-bicicleta.jpg', 'alt' => 'Uma bicicleta num caminho de terra, sob um túnel de árvores', 'legenda' => 'De bicicleta, à sombra'],
            ['src' => 'montemor/igreja-fachada.jpg', 'alt' => 'A fachada de uma igreja branca e azul, com o painel de azulejos', 'legenda' => 'Branco, azul e azulejo'],
            ['src' => 'montemor/estacao-paiao.jpg', 'alt' => 'A antiga estação ferroviária do Paião, com uma bicicleta à porta', 'legenda' => 'A antiga estação do Paião, na ecopista'],
            ['src' => 'montemor/castelo-porta-vista.jpg', 'alt' => 'A vila vista por uma porta da muralha', 'legenda' => 'Uma porta para a planície'],
            ['src' => 'montemor/janela-flores.jpg', 'alt' => 'Uma janela com grade de ferro e vasos de flores', 'legenda' => 'Janelas com flores'],
            ['src' => 'montemor/montado-bicicleta.jpg', 'alt' => 'Uma bicicleta parada junto ao montado', 'legenda' => 'O montado, logo ali'],
            ['src' => 'montemor/miradouro-candeeiros.jpg', 'alt' => 'A vila vista de um miradouro, entre dois candeeiros', 'legenda' => 'Parar no miradouro'],
        ],
    ],

    // ---- 5b. Nacional 2 (capítulo próprio, com o mesmo peso do de Montemor) --------------------------
    // Não há fotografia da estrada: a do capítulo é a casa ao entardecer, «a mesma casa à vossa espera ao fim do dia».
    'n2' => [
        'eyebrow' => 'Nacional 2 · No caminho, uma casa',
        'titulo' => 'Dois dias no coração do Alentejo',
        'texto' => 'Na viagem pela Nacional 2, façam de Montemor uma pausa de duas noites. Um dia para a vila, outro para Évora, e a mesma casa à vossa espera ao fim do dia',
        'foto' => ['src' => 'exterior/casa-ceu-rosa.jpg', 'alt' => 'A casa ao entardecer, com o céu cor-de-rosa', 'legenda' => 'A mesma casa à vossa espera ao fim do dia', 'pos_m' => '88% 50%'],
        // O programa é nosso (Diogo, 15/11/2026): castelo e mercado de sábado de manhã.
        'programa' => [
            ['Sexta', 'Chegar, abrir as portas e deixar a estrada lá fora'],
            ['Sábado', 'O mercado de manhã, a subida ao castelo e o fim da tarde entre a piscina e o alpendre'],
            ['Domingo', 'Évora a 25 minutos e, se ninguém entrar a seguir, a casa é vossa até ao fim da tarde'],
        ],
        'nota' => 'Estadia mínima de duas noites. No verão, de sábado a sábado',
        'ligacao' => ['Montemor-o-Novo na Rota da N2', 'rota_n2'],
    ],

    // ---- 5c. Onde estamos (as distâncias vêm de inc/factos.php → 'distancias') -------------------------
    'onde' => ['titulo' => 'Onde estamos', 'botao_mapa' => 'Abrir no Google Maps'],

    // ---- 6. Galeria, com o nome «Passear pelo Monte» (os álbuns do Zenfolio, pela mesma ordem) ----------
    // Para juntar fotografias novas: copiar o ficheiro para fotos/<álbum>/ e acrescentar a linha aqui.
    // Álbuns sem fotografias não aparecem.
    'galeria' => [
        'eyebrow' => 'Fotografias',
        'titulo' => 'Passear pelo Monte',
        'albuns' => [
            [
                // Álbum «O Monte» do Zenfolio (design/fotos/galeria/01-o-monte/). Completo desde 16/11/2026: as duas fachadas do
                // fim (a 51 e a 52 da pasta do verão) entraram por decisão do Diogo («sim entram»).
                'nome' => 'O Monte',
                'fotos' => [
                    ['src' => 'exterior/casa-campo-entardecer.jpg', 'alt' => 'A casa e a piscina vistas do campo, ao fim da tarde'],
                    ['src' => 'exterior/piscina-pinheiro-manha.jpg', 'alt' => 'A piscina e o pinheiro, com o sol baixo'],
                    ['src' => 'exterior/alpendre-por-do-sol.jpg', 'alt' => 'Mesa posta no alpendre, com o sol a pôr-se atrás do pinheiro'],
                    ['src' => 'exterior/alpendre-piscina-manha.jpg', 'alt' => 'O alpendre e a piscina pela manhã'],
                    ['src' => 'exterior/piscina-chapeu-sol.jpg', 'alt' => 'Espreguiçadeiras e chapéu-de-sol junto à piscina'],
                    ['src' => 'exterior/piscina-dia.jpg', 'alt' => 'A piscina sob o céu azul, com a casa branca ao fundo'],
                    ['src' => 'exterior/casa-alpendre-lateral.jpg', 'alt' => 'A fachada da casa com o alpendre e a barra azul'],
                    ['src' => 'exterior/piscina-agua.jpg', 'alt' => 'A água da piscina com a casa ao fundo'],
                    ['src' => 'exterior/alpendre.jpg', 'alt' => 'Alpendre com duas cadeiras brancas e copos de vinho'],
                    ['src' => 'exterior/piscina-sobreiro.jpg', 'alt' => 'A piscina e o pinheiro grande'],
                    ['src' => 'exterior/alpendre-dia.jpg', 'alt' => 'Almoço no alpendre, com o campo em frente'],
                    ['src' => 'exterior/sombra-arvore-parede.jpg', 'alt' => 'A sombra da árvore na parede branca e azul'],
                    ['src' => 'exterior/alpendre-mesa-jantar.jpg', 'alt' => 'A mesa de jantar no alpendre'],
                    ['src' => 'exterior/pateo-portas-vidro.jpg', 'alt' => 'O pátio visto do interior, pelas portas de vidro'],
                    ['src' => 'interior/sala-portas.jpg', 'alt' => 'O salão visto pelas portas abertas'],
                    ['src' => 'interior/sala-sofa-tv.jpg', 'alt' => 'A zona de estar com a televisão'],
                    ['src' => 'interior/poltrona-janela.jpg', 'alt' => 'A poltrona à janela'],
                    ['src' => 'interior/estantes-cozinha.jpg', 'alt' => 'As estantes da cozinha e o teto de madeira'],
                    ['src' => 'interior/salao-tecto-madeira.jpg', 'alt' => 'O salão com o teto de madeira à vista'],
                    ['src' => 'interior/cozinha.jpg', 'alt' => 'A cozinha com ilha e balcão de madeira'],
                    ['src' => 'interior/cozinha-ilha.jpg', 'alt' => 'A ilha da cozinha e a porta para o pátio'],
                    ['src' => 'interior/sala-mesa-sofa.jpg', 'alt' => 'Mesa de refeições e sofá, com a porta aberta para o alpendre'],
                    ['src' => 'interior/mesa-refeicoes.jpg', 'alt' => 'A mesa de refeições para oito'],
                    ['src' => 'interior/cozinha-sala.jpg', 'alt' => 'Da cozinha para a sala'],
                    ['src' => 'interior/sala-poltronas.jpg', 'alt' => 'As poltronas da sala'],
                    ['src' => 'interior/lareira-cadeira.jpg', 'alt' => 'A lareira e a cadeira dourada'],
                    ['src' => 'interior/biblioteca-tapete-azul.jpg', 'alt' => 'A biblioteca, com o tapete azul e o sofá'],
                    ['src' => 'interior/biblioteca-sofa.jpg', 'alt' => 'O sofá da biblioteca, junto à lareira'],
                    ['src' => 'interior/lareira-acesa.jpg', 'alt' => 'A lareira acesa, no inverno'],
                    ['src' => 'interior/biblioteca-poltrona-estante.jpg', 'alt' => 'A poltrona da biblioteca e a estante'],
                    ['src' => 'interior/corredor-quartos.jpg', 'alt' => 'O corredor para os quartos'],
                    ['src' => 'interior/corredor-luz.jpg', 'alt' => 'O corredor com a luz do fim do dia'],
                    ['src' => 'interior/corredor-noite.jpg', 'alt' => 'O corredor à noite'],
                    ['src' => 'exterior/casa-oliveira.jpg', 'alt' => 'A casa, a piscina e a oliveira'],
                    ['src' => 'exterior/alpendre-vista-pinheiros.jpg', 'alt' => 'Do alpendre para a piscina e os pinheiros'],
                    ['src' => 'exterior/casa-sobreiros.jpg', 'alt' => 'A casa vista de cima, entre as árvores'],
                    ['src' => 'exterior/casa-tronco-oliveira.jpg', 'alt' => 'A casa e a piscina por entre a oliveira'],
                    ['src' => 'exterior/casa-ceu-rosa.jpg', 'alt' => 'A casa ao entardecer, com o céu cor-de-rosa'],
                    ['src' => 'exterior/por-do-sol.jpg', 'alt' => 'O pôr do sol refletido na piscina'],
                    ['src' => 'exterior/piscina-noite.jpg', 'alt' => 'A piscina iluminada, à noite'],
                    ['src' => 'exterior/pateo-noite.jpg', 'alt' => 'O pátio à noite'],
                    ['src' => 'exterior/alpendre-noite.jpg', 'alt' => 'O alpendre à noite'],
                    ['src' => 'exterior/casa-lua.jpg', 'alt' => 'A casa sob a lua'],
                    ['src' => 'exterior/alpendre-pinheiro.jpg', 'alt' => 'O alpendre e o pinheiro grande'],
                    ['src' => 'exterior/chamine-alentejana.jpg', 'alt' => 'A chaminé alentejana contra o céu azul'],
                    ['src' => 'exterior/casao-pergola.jpg', 'alt' => 'O casão e a pérgula'],
                    ['src' => 'exterior/fachada-lateral-chamine.jpg', 'alt' => 'O branco e o azul da casa, com a chaminé ao fundo'],
                    ['src' => 'exterior/fachada-folhas-entardecer.jpg', 'alt' => 'A casa ao fim da tarde, vista por entre as folhas'],
                    ['src' => 'exterior/chamine-arvore.jpg', 'alt' => 'A chaminé entre as árvores'],
                ],
            ],
            [
                // Álbum «Os Quartos» do Zenfolio (design/fotos/galeria/02-os-quartos/).
                'nome' => 'Os Quartos',
                'fotos' => [
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
                    ['src' => 'quartos/casa-de-banho-pequena.jpg', 'alt' => 'A casa de banho social'],
                ],
            ],
            [
                // Álbum «A Quinta» do Zenfolio, pela mesma ordem (design/fotos/galeria/03-a-quinta/). A 5.ª, a casa ao longe, não está
                // no Zenfolio: é a 34 da pasta do verão, que entrou a 16/11/2026 («sim entram») antes da 35, a que se lhe segue lá.
                'nome' => 'A Quinta',
                'fotos' => [
                    ['src' => 'quinta/casa-pinheiro-terreno.jpg', 'alt' => 'O pinheiro e a casa, vistos do terreno'],
                    ['src' => 'quinta/casa-piscina-campo.jpg', 'alt' => 'A casa e a piscina vistas do campo'],
                    ['src' => 'quinta/piscina-por-do-sol.jpg', 'alt' => 'O céu do pôr do sol refletido na piscina'],
                    ['src' => 'quinta/piscina-alpendre-entardecer.jpg', 'alt' => 'A piscina vista do alpendre, ao entardecer'],
                    ['src' => 'quinta/casa-ao-longe-campo.jpg', 'alt' => 'A casa ao longe, vista do campo, sob o céu azul'],
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

    // ---- 7. Antes de chegar (perguntas) -------------------------------------------------------------
    // {saida_tardia} é trocado pela hora de inc/factos.php → 'saida_tardia'.
    'antes' => [
        'eyebrow' => 'Antes de chegar',
        'titulo' => 'Para se sentirem em casa',
    ],
    'perguntas' => [
        ['A casa é só para nós?', 'Sim. A estadia é sempre de casa inteira: até oito pessoas, quatro quartos e a piscina de 10 × 5 m só para o vosso grupo.'],
        ['Como estão distribuídos os quartos?', 'Dois quartos de casal e dois twin. Se preferirem, um dos twin passa a casal e a casa fica com três quartos de casal e um twin. Há duas casas de banho, uma delas privativa, e ainda um WC social.'],
        ['Podemos ir no inverno?', 'Podem, e vale a pena: há ar condicionado em todas as divisões e lareira na biblioteca.'],
        ['A que horas podemos chegar?', 'A entrada é a partir das 16h e a saída até às 11h. Quando ninguém entra no mesmo dia, a saída pode ficar para as {saida_tardia}, para aproveitarem o dia até ao fim. O Diogo envia as indicações de chegada antes da estadia.'],
        ['Qual é a estadia mínima?', 'Duas noites, quase todo o ano. De 18 de julho a 31 de agosto, sete noites, de sábado a sábado.'],
        ['Os animais também podem vir?', 'Podem, são bem-vindos. Digam-nos só quem vem, para deixarmos tudo combinado.'],
        ['Como podemos pedir as nossas datas?', 'Escolham as datas no calendário e falem connosco por WhatsApp ou email. O pedido só fica confirmado depois de falarem com o Diogo.'],
    ],

    // ---- 8. Quem já ficou (frases curtas, uma de cada vez) ----------------------------------------
    // Cada linha: [frase tal como o hóspede a escreveu, plataforma, mês e ano, true se for tradução]. Sem nomes.
    // Escolha (Diogo, 15/11/2026): as que contam pormenores, mais recentes do que antigas, e as de quem veio de fora.
    'avaliacoes' => [
        'eyebrow' => 'Quem já ficou',
        'citacoes' => [
            ['Rodeada por ovelhas, com um pôr do sol magnífico', 'Airbnb', 'julho de 2026', true],
            ['Cozinha ultra moderna muito bem equipada, camas muito confortáveis também', 'Booking', 'setembro de 2026', false],
            ['Uma casa moderna, rodeada por uma quinta. Foi perfeito', 'Airbnb', 'julho de 2024', true],
            ['A casa foi decorada com grande atenção aos detalhes e está muito bem equipada', 'Airbnb', 'abril de 2023', true],
            ['Os bebés também tiveram todo o conforto necessário', 'Booking', 'março de 2024', false],
            ['Excelente design moderno em combinação com a antiga arquitetura alentejana', 'Airbnb', 'maio de 2024', false],
            ['Foi nosso melhor Natal', 'Airbnb', 'dezembro de 2023', false],
            ['O campo aqui é tão bonito. Vamos voltar de certeza', 'Vrbo', 'janeiro de 2024', true],
            ['A casa superou as nossas expectativas e as fotografias', 'Airbnb', 'outubro de 2023', true],
            ['A piscina é maravilhosa e apanha sol até ao final da tarde', 'Vrbo', 'agosto de 2022', false],
        ],
        // As três notas (Booking, Airbnb, Google) vêm de inc/factos.php → 'notas'. {data} é trocado pelo mês das notas.
        'notas_titulo' => 'As notas de quem já ficou',          // só para quem usa leitor de ecrã
        'nota_escala' => 'em {escala}',
        'rodape' => 'Recebemos hóspedes desde 2022',
        'rodape_notas' => 'notas de {data}',                    // junta-se ao rodapé quando há notas («… · notas de novembro de 2026»)
    ],

    // ---- 9. Contactos (rodapé) ------------------------------------------------------------
    'contactos' => [
        'eyebrow' => 'Falamos?',
        'titulo' => 'Contem-nos os vossos planos',
        'texto' => 'Falem com o Diogo sobre as vossas datas, por WhatsApp ou email',
        'rodape' => 'Monte Casa Branca · Montemor-o-Novo · Alentejo · Registo 126450/AL',
    ],

    // ---- 10. Painel «Verificar disponibilidade» --------------------------------------------
    // {hora} é trocado pela hora de inc/factos.php → 'saida_tardia'.
    'disponibilidade' => [
        'eyebrow' => 'Os vossos dias',
        'titulo' => 'Quando vos apetece vir?',
        'texto' => 'Juntem as pessoas de quem gostam e escolham os dias. Das contas tratamos nós',
        'legenda_livre' => 'Livre',
        'legenda_ocupado' => 'Ocupado',
        'legenda_escolhido' => 'Os vossos dias',
        'nota_calendario' => 'O calendário mostra o que está livre hoje · o Diogo confirma no pedido',
        'nota_exemplo' => 'Calendário de exemplo · a disponibilidade real é confirmada no pedido',
        'nota_sem_calendario' => 'Calendário indisponível de momento · confirmamos as datas no pedido',
        'simular' => 'As contas, sem surpresas',
        'chegada' => 'Chegada',
        'partida' => 'Partida',
        'pessoas' => 'Quantas pessoas vêm?',
        'nota_casa' => 'A casa é só vossa, venham dois ou oito',
        'conta_vazia' => 'Escolham a chegada e a partida para ver quanto fica a estadia',
        'conta_calcular' => 'A fazer as contas…',
        'conta_falha' => 'Não conseguimos fazer as contas agora. Falem connosco por WhatsApp ou email',
        'conta_ocupado' => 'Estes dias já têm dono. Experimentem outros ou falem connosco',
        'linha_estadia' => 'Estadia',
        'linha_limpeza' => 'Limpeza final',
        'linha_limpeza_nota' => 'uma vez por estadia',
        'linha_total' => 'Total da casa',
        'depois_conta' => 'Quatro quartos, piscina e a casa inteira só para o vosso grupo',
        'saida_tardia' => 'No dia da saída, se ninguém entrar a seguir, podem ficar até às {hora} e aproveitar o dia até ao fim',
        'estimativa' => 'Valor calculado pelo site. O Diogo confirma no pedido',
        'pedir_titulo' => 'Gostam destas datas? Falem com o Diogo',
        'pedir' => 'Pedir estas datas',
        'mais_campos' => 'Juntar telefone ou mensagem',   // no telemóvel, o que é opcional abre com um toque
        'nota_preco' => 'Sem reserva automática e sem pagamentos aqui: o Diogo confirma as datas e o valor',
        'tempo' => 'O tempo no Monte',
        'tempo_proximos' => 'Os próximos dias',
        'tempo_estadia' => 'Previsão para os vossos dias',
        'tempo_medias' => 'Ainda é cedo para previsões. Nos últimos anos, estes dias foram assim',
        'tempo_misto' => 'Previsão para os primeiros dias. Para os outros ainda é cedo: mostramos como costumam ser',
        'fonte_tempo' => 'Dados: Open-Meteo',
    ],

    // ---- Barra fixa em baixo ----------------------------------------------------------------
    'dock' => [
        'menu' => 'Menu',
        'contacto' => 'Contacto',
        'disponibilidade' => 'Verificar disponibilidade',
    ],
];
