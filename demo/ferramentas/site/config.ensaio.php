<?php
// Configuração de ENSAIO do site (workflow «Capturas» e testes locais): aponta para a app de ensaio em 127.0.0.1:8799.
// Nunca vai para o servidor. O config.php real nasce de site/config.exemplo.php no servidor (ou pelo deploy, a partir dos secrets).
declare(strict_types=1);
return ['SITE_URL' => 'http://127.0.0.1:8791', 'APP_URL' => getenv('APP_ENSAIO_URL') ?: 'http://127.0.0.1:8799', 'SITE_CHAVE' => 'chave-de-ensaio',
    'OCUPACAO_EXEMPLO' => false, 'CACHE_DIR' => sys_get_temp_dir() . '/site-ensaio-cache', 'LINGUA' => 'pt'];
