<?php
// Previsão do tempo na casa (Open-Meteo, sem chave), 14 dias, cache de 1 hora. Devolve só o que o painel precisa.
declare(strict_types=1);
require_once __DIR__ . '/../inc/util.php';

$f = mcb_factos();
$lat = $f['coordenadas']['lat'] ?? 38.6142917;
$lon = $f['coordenadas']['lon'] ?? -8.211253;

if (($c = cache_ler('tempo', 3600)) !== null) json_saida(json_decode($c, true) ?: ['ok' => false], 200, 1800);

$url = 'https://api.open-meteo.com/v1/forecast?' . http_build_query([
    'latitude' => $lat, 'longitude' => $lon, 'daily' => 'weather_code,temperature_2m_max,temperature_2m_min',
    'timezone' => 'Europe/Lisbon', 'forecast_days' => 14,
]);
[$cod, $corpo] = http_json($url, null, [], 6);
$j = $cod === 200 ? json_decode($corpo, true) : null;
if (!is_array($j) || empty($j['daily']['time'])) json_saida(['ok' => false, 'dias' => []], 200, 0);

$dias = [];
foreach ($j['daily']['time'] as $i => $dia) {
    $dias[] = ['dia' => $dia, 'codigo' => (int)$j['daily']['weather_code'][$i], 'max' => (int)round($j['daily']['temperature_2m_max'][$i]), 'min' => (int)round($j['daily']['temperature_2m_min'][$i])];
}
$saida = ['ok' => true, 'dias' => $dias, 'fonte' => 'Open-Meteo', 'atualizado' => date(DATE_ATOM)];
cache_gravar('tempo', json_encode($saida, JSON_UNESCAPED_UNICODE));
json_saida($saida, 200, 1800);
