<?php
// Monte Casa Branca · configuração do servidor.
// Copiar para config.php (NÃO vai para o GitHub; está no .gitignore) e preencher.
declare(strict_types=1);

return [
    // Endereço público do site (sem barra final). Usado no SEO (canonical, sitemap, JSON-LD).
    'SITE_URL' => 'https://montecasabranca.pt',

    // A app de reservas (portas #189–#192, contrato_portas_v1.md). Sem barra final.
    'APP_URL' => 'https://app.montecasabranca.pt',

    // Chave da porta #191 (site_prereserva.php). Só vive aqui, nunca no browser.
    'SITE_CHAVE' => '',

    // Quando a app não responde, o site usa a tarifa local (inc/tarifas.php) e a ocupação de exemplo.
    // true = mostrar a ocupação de exemplo quando a app falha (só para ensaio; em produção deixar false).
    'OCUPACAO_EXEMPLO' => false,

    // Pasta de cache (tem de ser gravável pelo PHP). Guarda a ocupação (5 min) e o tempo (1 h).
    'CACHE_DIR' => __DIR__ . '/cache',

    // Idioma por omissão.
    'LINGUA' => 'pt',
];
