<?php
// Monte Casa Branca · página única. Os textos vêm de conteudo.php; os factos de inc/factos.php.
declare(strict_types=1);
require __DIR__ . '/inc/util.php';

$cfg = mcb_config();
$F = mcb_factos();
$C = mcb_conteudo();
$SITE = rtrim($cfg['SITE_URL'], '/');
$versao = (string)@filemtime(__DIR__ . '/assets/css/site.css');

// JSON-LD (VacationRental + FAQPage), portado de lovable/src/lib/seo.ts
$imagens = [];
foreach ($C['fotografias']['albuns'] as $al) foreach (array_slice($al['fotos'], 0, 3) as $f) $imagens[] = $SITE . '/' . foto_url($f['src']);
$m = $F['morada'];
$jsonld = [
    ['@context' => 'https://schema.org', '@type' => ['VacationRental', 'LodgingBusiness'],
        'name' => $F['nome'], 'url' => $SITE . '/', 'image' => $imagens, 'description' => $C['descricao'],
        'telephone' => $F['telefone'], 'email' => $F['email'],
        'address' => ['@type' => 'PostalAddress', 'streetAddress' => $m['rua'], 'addressLocality' => $m['localidade'] . ', ' . $m['concelho'], 'postalCode' => $m['codigo_postal'], 'addressRegion' => $m['regiao'], 'addressCountry' => $m['pais']],
        'geo' => ['@type' => 'GeoCoordinates', 'latitude' => $F['coordenadas']['lat'], 'longitude' => $F['coordenadas']['lon']],
        'checkinTime' => $F['check_in'], 'checkoutTime' => $F['check_out'],
        'numberOfRooms' => $F['quartos'], 'numberOfBathroomsTotal' => $F['casas_de_banho'],
        'occupancy' => ['@type' => 'QuantitativeValue', 'maxValue' => $F['capacidade']],
        'floorSize' => ['@type' => 'QuantitativeValue', 'value' => $F['area_m2'], 'unitCode' => 'MTK'],
        'petsAllowed' => true,
        'amenityFeature' => array_map(fn($n) => ['@type' => 'LocationFeatureSpecification', 'name' => $n, 'value' => true],
            ['Piscina exterior ' . $F['piscina'], 'Ar condicionado em todas as divisões', 'Lareira na biblioteca', 'Cozinha equipada', 'Estacionamento']),
        'identifier' => ['@type' => 'PropertyValue', 'name' => 'Registo de alojamento local', 'value' => $F['registo_al']],
        'sameAs' => [$F['ligacoes']['airbnb'], $F['ligacoes']['booking'], $F['ligacoes']['vrbo'], $F['ligacoes']['instagram']],
        'inLanguage' => 'pt-PT'],
    ['@context' => 'https://schema.org', '@type' => 'FAQPage',
        'mainEntity' => array_map(fn($p) => ['@type' => 'Question', 'name' => $p[0], 'acceptedAnswer' => ['@type' => 'Answer', 'text' => $p[1]]], $C['perguntas'])],
];
?>
<!doctype html>
<html lang="pt-PT">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<?php if (preg_match('/^novo\./i', (string)($_SERVER['HTTP_HOST'] ?? ''))): // ensaio em novo.montecasabranca.pt: fora dos motores de busca ?>
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
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Source+Sans+3:wght@300;400;600&display=swap">
<link rel="stylesheet" href="assets/css/site.css?v=<?= e($versao) ?>">
<link rel="preload" as="image" href="<?= e(foto_url($C['inicio']['foto']['src'])) ?>" fetchpriority="high">
<?php foreach ($jsonld as $j): ?>
<script type="application/ld+json"><?= json_encode($j, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP) ?></script>
<?php endforeach; ?>
</head>
<body>
<a class="saltar" href="#casa">Saltar para o conteúdo</a>

<?php require __DIR__ . '/partes/inicio.php'; ?>
<main>
<?php
require __DIR__ . '/partes/casa.php';
require __DIR__ . '/partes/descobrir.php';
require __DIR__ . '/partes/relance.php';
require __DIR__ . '/partes/avaliacoes.php';
require __DIR__ . '/partes/perguntas.php';
require __DIR__ . '/partes/fotografias.php';
require __DIR__ . '/partes/montemor.php';
?>
</main>
<?php
require __DIR__ . '/partes/contactos.php';
require __DIR__ . '/partes/dock.php';
?>

<script src="assets/js/site.js?v=<?= e($versao) ?>" defer></script>
</body>
</html>
