<?php
// Monte Casa Branca · página única. Os textos vêm de conteudo.php; os factos de inc/factos.php.
declare(strict_types=1);
require __DIR__ . '/inc/util.php';

$cfg = mcb_config();
$F = mcb_factos();
$C = mcb_conteudo();
$SITE = rtrim($cfg['SITE_URL'], '/');
$versao = (string)@filemtime(__DIR__ . '/assets/css/site.css');

// Capa: a opção escolhida em conteudo.php. No ensaio (novo.montecasabranca.pt ou o servidor local dos testes), ?capa=N mostra
// as outras opções do estudo da capa (nota 2 do Diogo, 15/11/2026); fora do ensaio o parâmetro é ignorado.
$anfitriao = (string)($_SERVER['HTTP_HOST'] ?? '');
$capaChave = (string)$C['inicio']['capa'];
$capaEstudo = false;
if (preg_match('/^(novo\.|127\.0\.0\.1|localhost)/i', $anfitriao) && isset($_GET['capa']) && is_string($_GET['capa']) && isset($C['inicio']['capas'][$_GET['capa']])) {
    $capaChave = $_GET['capa'];
    $capaEstudo = true;
}
$CAPA = $C['inicio']['capas'][$capaChave];
$capaM = foto_url_m($CAPA['foto']['src']);

// Versão do ensaio (docs/versoes/REGISTO.md): cada publicação em novo.montecasabranca.pt tem um número, escrito em versao.json.
// Aparece em letra pequena no fundo da página, só no ensaio (e no servidor local dos testes); o site a sério não o mostra.
$ENSAIO_VERSAO = null;
if (preg_match('/^(novo\.|127\.0\.0\.1|localhost)/i', $anfitriao)) {
    $v = json_decode((string)@file_get_contents(__DIR__ . '/versao.json'), true);
    if (is_array($v) && isset($v['versao'])) $ENSAIO_VERSAO = ['numero' => (int)$v['versao'], 'data' => (string)($v['data'] ?? '')];
}

// «Antes de chegar»: a hora da saída tardia entra nas respostas (e no FAQPage) a partir dos factos.
$PERGUNTAS = array_map(fn($p) => [$p[0], str_replace('{saida_tardia}', $F['saida_tardia'], $p[1])], $C['perguntas']);

// JSON-LD (VacationRental + FAQPage), portado de lovable/src/lib/seo.ts
$imagens = [$SITE . '/' . foto_url($C['imagem_partilha'])];
foreach ($C['galeria']['albuns'] as $al) {
    if (!empty($al['sem_schema'])) continue;   // Montemor-o-Novo não são fotografias da casa
    foreach (array_slice($al['fotos'], 0, 3) as $f) $imagens[] = $SITE . '/' . foto_url($f['src']);
}
$imagens = array_values(array_unique($imagens));
$m = $F['morada'];
$jsonld = [
    ['@context' => 'https://schema.org', '@type' => ['VacationRental', 'LodgingBusiness'],
        'name' => $F['nome'], 'url' => $SITE . '/', 'image' => $imagens, 'description' => $C['descricao'],
        'telephone' => $F['telefone'], 'email' => $F['email'],
        'address' => ['@type' => 'PostalAddress', 'streetAddress' => $m['rua'], 'addressLocality' => $m['localidade'] . ', ' . $m['concelho'], 'postalCode' => $m['codigo_postal'], 'addressRegion' => $m['regiao'], 'addressCountry' => $m['pais']],
        'geo' => ['@type' => 'GeoCoordinates', 'latitude' => $F['coordenadas']['lat'], 'longitude' => $F['coordenadas']['lon']],
        'checkinTime' => $F['check_in'], 'checkoutTime' => $F['check_out'],
        'numberOfRooms' => $F['quartos'], 'numberOfBedrooms' => $F['quartos'],
        'numberOfBathroomsTotal' => $F['casas_de_banho'] + $F['wc_social'], 'numberOfFullBathrooms' => $F['casas_de_banho'], 'numberOfPartialBathrooms' => $F['wc_social'],
        'occupancy' => ['@type' => 'QuantitativeValue', 'maxValue' => $F['capacidade']],
        'floorSize' => ['@type' => 'QuantitativeValue', 'value' => $F['area_m2'], 'unitCode' => 'MTK'],
        'petsAllowed' => true,
        'amenityFeature' => array_map(fn($n) => ['@type' => 'LocationFeatureSpecification', 'name' => $n, 'value' => true],
            ['Piscina exterior ' . $F['piscina'], 'Ar condicionado em todas as divisões', 'Lareira na biblioteca', 'Cozinha equipada', 'Estacionamento']),
        'identifier' => ['@type' => 'PropertyValue', 'name' => 'Registo de alojamento local', 'value' => $F['registo_al']],
        'sameAs' => [$F['ligacoes']['airbnb'], $F['ligacoes']['booking'], $F['ligacoes']['vrbo'], $F['ligacoes']['instagram']],
        'inLanguage' => 'pt-PT'],
    ['@context' => 'https://schema.org', '@type' => 'FAQPage',
        'mainEntity' => array_map(fn($p) => ['@type' => 'Question', 'name' => $p[0], 'acceptedAnswer' => ['@type' => 'Answer', 'text' => $p[1]]], $PERGUNTAS)],
];
?>
<!doctype html>
<html lang="pt-PT">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<?php if (preg_match('/^novo\./i', $anfitriao)): // ensaio em novo.montecasabranca.pt: fora dos motores de busca ?>
<meta name="robots" content="noindex, nofollow">
<?php endif; ?>
<title><?= e($C['titulo']) ?></title>
<meta name="description" content="<?= e($C['descricao']) ?>">
<link rel="canonical" href="<?= e($SITE) ?>/">
<meta property="og:type" content="website">
<meta property="og:title" content="<?= e($C['titulo']) ?>">
<meta property="og:description" content="<?= e($C['descricao']) ?>">
<meta property="og:image" content="<?= e($SITE . '/' . foto_url($C['imagem_partilha'])) ?>">
<meta property="og:url" content="<?= e($SITE) ?>/">
<meta property="og:locale" content="pt_PT">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#f5f1ea">
<link rel="icon" href="assets/img/favicon.ico?v=2" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon-32.png?v=2">
<link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicon-16.png?v=2">
<link rel="icon" type="image/png" sizes="192x192" href="assets/img/icone-192.png?v=2">
<link rel="apple-touch-icon" sizes="180x180" href="assets/img/apple-touch-icon.png?v=2">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Source+Sans+3:wght@300;400;600&display=swap">
<link rel="stylesheet" href="assets/css/site.css?v=<?= e($versao) ?>">
<?php if ($capaM): // a fotografia da capa: a variante de telemóvel até 767 px, a grande daí para cima ?>
<link rel="preload" as="image" href="<?= e($capaM) ?>" media="(max-width: 767px)" fetchpriority="high">
<link rel="preload" as="image" href="<?= e(foto_url($CAPA['foto']['src'])) ?>" media="(min-width: 768px)" fetchpriority="high">
<?php else: ?>
<link rel="preload" as="image" href="<?= e(foto_url($CAPA['foto']['src'])) ?>" fetchpriority="high">
<?php endif; ?>
<?php foreach ($jsonld as $j): ?>
<script type="application/ld+json"><?= json_encode($j, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP) ?></script>
<?php endforeach; ?>
</head>
<body>
<a class="saltar" href="#a-casa">Saltar para o conteúdo</a>

<?php require __DIR__ . '/partes/inicio.php'; ?>
<main>
<?php
// A ordem da página é a do menu de cima: a casa (os três momentos e a régua) · Montemor-o-Novo e a Nacional 2 · galeria ·
// antes de chegar · quem já ficou. Os contactos fecham a página.
require __DIR__ . '/partes/casa.php';
require __DIR__ . '/partes/momentos.php';
require __DIR__ . '/partes/regua.php';
require __DIR__ . '/partes/montemor.php';
require __DIR__ . '/partes/galeria.php';
require __DIR__ . '/partes/antes.php';
require __DIR__ . '/partes/avaliacoes.php';
?>
</main>
<?php
require __DIR__ . '/partes/contactos.php';
require __DIR__ . '/partes/dock.php';
?>

<script src="assets/js/site.js?v=<?= e($versao) ?>" defer></script>
</body>
</html>
