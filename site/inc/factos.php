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
    // Saída tardia: quando ninguém entra no dia da saída, a casa fica disponível até ao fim da tarde, sem falar no pôr do sol.
    // A hora é uma só: 18h (Diogo, 15/11/2026, à pergunta «17h/18h ou uma só hora?»). Muda-se aqui e vale para as perguntas
    // e para o painel das datas.
    'saida_tardia' => '18h',
    // As notas nas plataformas, para a infografia de «Quem já ficou» (Diogo, 15/11/2026: «uma infografia ligeira com essas 3 notas:
    // booking, airbnb e google»). Booking 10 e Google 5,0: capturas dele de 15/11. Airbnb 4,95 com 21 avaliações: captura dele da
    // aplicação de anfitrião, na mesma noite («Airbnb está certo»). Só as notas: sem ligações («não quero links para as plataformas»)
    // e sem o número de avaliações («não precisas dizer o número de avaliações»; os números estão no FACTOS.md, secção 11).
    // Quando uma nota mudar, muda-se aqui (e a data). Não vão para os dados estruturados (schema.org): são notas de terceiros.
    'notas' => [
        'data' => 'novembro de 2026',
        'lista' => [
            ['plataforma' => 'Booking', 'nota' => '10', 'escala' => '10'],
            ['plataforma' => 'Airbnb', 'nota' => '4,95', 'escala' => '5'],
            ['plataforma' => 'Google', 'nota' => '5,0', 'escala' => '5'],
        ],
    ],
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
