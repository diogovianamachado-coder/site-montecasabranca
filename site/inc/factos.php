<?php
// Monte Casa Branca · factos ✓ do FACTOS.md (docs/conteudos/fontes/FACTOS.md do repositório) e ligações oficiais.
// «Reguengo» só na morada postal (decisão do Diogo, 25/10/2026). Portado de lovable/src/lib/factos.ts.
declare(strict_types=1);

return [
    'nome' => 'Monte Casa Branca',
    'firma' => 'Ângulos Castiços, Unipessoal Lda',
    'registo_al' => '126450/AL',
    'morada' => [
        'rua' => 'Fazenda da Casa Branca, Caminho 3',
        'localidade' => 'Reguengo',
        'codigo_postal' => '7050-352',
        'concelho' => 'Montemor-o-Novo',
        'regiao' => 'Alentejo',
        'pais' => 'PT',
    ],
    'coordenadas' => ['lat' => 38.6142917, 'lon' => -8.211253],
    'telefone' => '+351 962 802 626',
    'whatsapp' => '351962802626',
    'email' => 'geral@montecasabranca.pt',
    'instagram_handle' => '@monte_casa_branca',
    'capacidade' => 8,
    'quartos' => 4,
    'casas_de_banho' => 2,            // completas; uma delas privativa
    'wc_social' => 1,                 // mais uma casa de banho social (Diogo, 15/11/2026)
    'area_m2' => 270,
    'piscina' => '10 × 5 m',
    'check_in' => '16:00',
    'check_out' => '11:00',
    // Saída tardia: quando ninguém entra no dia da saída, a casa fica disponível até ao fim da tarde. A hora é a que o Diogo usa
    // desde o Linktree («late checkout 5/6pm») e repetiu a 15/11/2026 («até às 17/18h», sem falar no pôr do sol). Se ele fixar uma
    // só hora, muda-se aqui e vale para as perguntas e para o painel das datas.
    'saida_tardia' => '17h/18h',
    'distancias' => [
        ['lugar' => 'Centro de Montemor-o-Novo', 'valor' => '3 km'],
        ['lugar' => 'Évora', 'valor' => '25 min'],
        ['lugar' => 'Lisboa', 'valor' => '1 h'],
        ['lugar' => 'Comporta', 'valor' => '50 min'],
        ['lugar' => 'Alqueva', 'valor' => '1 h'],
    ],
    'ligacoes' => [
        'airbnb' => 'https://www.airbnb.com/h/monte-casa-branca-montemornovo-evora',
        'booking' => 'https://www.booking.com/Share-KoMvpm',
        'vrbo' => 'https://www.vrbo.com/pt-pt/arrendamento-ferias/p11082917?uni_id=6114185',
        'instagram' => 'https://www.instagram.com/monte_casa_branca/',
        'whatsapp' => 'https://wa.me/351962802626',
        'email' => 'mailto:geral@montecasabranca.pt',
        // Mapa: abre a ficha «Monte Casa Branca» do Google (procura pelo nome, centrada nas coordenadas da casa), não o alfinete das
        // coordenadas (Diogo, 15/11/2026). Quando ele der a ligação de «Partilhar» da ficha, troca-se por essa.
        'maps' => 'https://www.google.com/maps/search/Monte+Casa+Branca/@38.6142917,-8.211253,16z',
        'visit_montemor' => 'https://www.visitmontemornovo.com/',
        // Ecopista do Montado (antiga linha de comboio Montemor-o-Novo – Torre da Gadanha): página das Infraestruturas de Portugal,
        // com descrição, fotografias e o percurso. A confirmar por olho pelo Diogo (a rede da sessão não abre o endereço).
        'ecopista' => 'https://www.infraestruturasdeportugal.pt/pt-pt/node/66',
        // Montemor-o-Novo na Rota da Estrada Nacional 2 (endereço dado pelo Diogo a 15/11/2026: «acho que era esta»; por confirmar).
        'rota_n2' => 'https://www.rotan2.pt/entity/219',
    ],
];
