<?php
// O tempo na casa (Open-Meteo, sem chave e sem dados do visitante). Dois modos:
//   · sem parâmetros: a previsão dos próximos 16 dias (cache de 1 hora);
//   · ?de=AAAA-MM-DD&ate=AAAA-MM-DD: os dias de uma estadia. Para os dias que a previsão já alcança, a previsão ('tipo' => 'previsao');
//     para os outros, a média dos últimos cinco anos nesses mesmos dias ('tipo' => 'media'), tirada do arquivo histórico do
//     Open-Meteo e guardada 30 dias. Se o serviço falhar, a lista vem vazia e o painel esconde o bloco.
declare(strict_types=1);
require_once __DIR__ . '/../inc/util.php';

$f = mcb_factos();
$LAT = $f['coordenadas']['lat'] ?? 38.6142917;
$LON = $f['coordenadas']['lon'] ?? -8.211253;

/** A previsão (lista de dias) ou null. */
function tempo_previsao(float $lat, float $lon): ?array
{
    if (($c = cache_ler('tempo', 3600)) !== null) {
        $j = json_decode($c, true);
        if (is_array($j) && !empty($j['dias'])) return $j['dias'];
    }
    $url = 'https://api.open-meteo.com/v1/forecast?' . http_build_query([
        'latitude' => $lat, 'longitude' => $lon, 'daily' => 'weather_code,temperature_2m_max,temperature_2m_min',
        'timezone' => 'Europe/Lisbon', 'forecast_days' => 16,
    ]);
    [$cod, $corpo] = http_json($url, null, [], 6);
    $j = $cod === 200 ? json_decode($corpo, true) : null;
    if (!is_array($j) || empty($j['daily']['time'])) return null;
    $dias = [];
    foreach ($j['daily']['time'] as $i => $dia) {
        if (!isset($j['daily']['temperature_2m_max'][$i], $j['daily']['temperature_2m_min'][$i])) continue;
        $dias[] = ['dia' => $dia, 'codigo' => (int)($j['daily']['weather_code'][$i] ?? 0), 'max' => (int)round($j['daily']['temperature_2m_max'][$i]), 'min' => (int)round($j['daily']['temperature_2m_min'][$i])];
    }
    if (!$dias) return null;
    cache_gravar('tempo', json_encode(['ok' => true, 'dias' => $dias, 'fonte' => 'Open-Meteo', 'atualizado' => date(DATE_ATOM)], JSON_UNESCAPED_UNICODE));
    return $dias;
}

/**
 * Como costumam ser os dias do ano: por «MM-DD», a máxima e a mínima médias e um código de tempo que represente o dia.
 * Contas: os últimos cinco anos completos; cada dia é a média desse dia e dos três de cada lado (35 registos), para não depender de um
 * dia de sorte. O código: chuva se choveu (1 mm ou mais) em metade dos registos; aguaceiros se choveu em 30 %; senão sol, sol com
 * nuvens ou nublado, pelo que foi mais frequente. Devolve null se o arquivo não responder e não houver cópia guardada.
 */
function tempo_clima(float $lat, float $lon): ?array
{
    $f = rtrim(mcb_config()['CACHE_DIR'], '/') . '/clima.json';
    $guardado = is_file($f) ? json_decode((string)file_get_contents($f), true) : null;
    if (is_array($guardado) && !empty($guardado['dias']) && time() - filemtime($f) < 30 * 86400) return $guardado['dias'];

    $ano = (int)date('Y');
    $url = 'https://archive-api.open-meteo.com/v1/archive?' . http_build_query([
        'latitude' => $lat, 'longitude' => $lon, 'start_date' => ($ano - 5) . '-01-01', 'end_date' => ($ano - 1) . '-12-31',
        'daily' => 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum', 'timezone' => 'Europe/Lisbon',
    ]);
    [$cod, $corpo] = http_json($url, null, [], 12);
    $j = $cod === 200 ? json_decode($corpo, true) : null;
    if (!is_array($j) || empty($j['daily']['time'])) return (is_array($guardado) && !empty($guardado['dias'])) ? $guardado['dias'] : null;   // cópia antiga, se houver

    $porDia = [];   // 'MM-DD' => lista de [max, min, chuva, código]
    foreach ($j['daily']['time'] as $i => $dia) {
        $mx = $j['daily']['temperature_2m_max'][$i] ?? null; $mn = $j['daily']['temperature_2m_min'][$i] ?? null;
        if ($mx === null || $mn === null) continue;
        $porDia[substr($dia, 5)][] = [(float)$mx, (float)$mn, (float)($j['daily']['precipitation_sum'][$i] ?? 0), (int)($j['daily']['weather_code'][$i] ?? 0)];
    }
    $chaves = [];
    for ($d = new DateTimeImmutable('2024-01-01'); $d->format('Y') === '2024'; $d = $d->modify('+1 day')) $chaves[] = $d->format('m-d');   // 2024 é bissexto: 366 dias
    $n = count($chaves);
    $dias = [];
    foreach ($chaves as $k => $chave) {
        $reg = [];
        for ($o = -3; $o <= 3; $o++) foreach ($porDia[$chaves[($k + $o + $n) % $n]] ?? [] as $r) $reg[] = $r;
        if (!$reg) continue;
        $t = count($reg);
        $chuva = count(array_filter($reg, fn($r) => $r[2] >= 1.0)) / $t;
        $limpo = count(array_filter($reg, fn($r) => $r[3] <= 1)) / $t;
        $encoberto = count(array_filter($reg, fn($r) => $r[3] === 3)) / $t;
        $codigo = $chuva >= 0.5 ? 61 : ($chuva >= 0.3 ? 80 : ($limpo >= 0.5 ? 0 : ($encoberto >= 0.5 ? 3 : 2)));
        $dias[$chave] = ['codigo' => $codigo, 'max' => (int)round(array_sum(array_column($reg, 0)) / $t), 'min' => (int)round(array_sum(array_column($reg, 1)) / $t)];
    }
    if (!$dias) return null;
    $d = rtrim(mcb_config()['CACHE_DIR'], '/');
    if (!is_dir($d)) @mkdir($d, 0775, true);
    @file_put_contents($f, json_encode(['dias' => $dias, 'anos' => ($ano - 5) . '–' . ($ano - 1), 'feito' => date(DATE_ATOM)], JSON_UNESCAPED_UNICODE), LOCK_EX);
    return $dias;
}

$de = (string)($_GET['de'] ?? ''); $ate = (string)($_GET['ate'] ?? '');
$valida = fn(string $s): bool => (bool)preg_match('/^(\d{4})-(\d{2})-(\d{2})$/', $s, $m) && checkdate((int)$m[2], (int)$m[3], (int)$m[1]);

// Sem datas: os próximos dias.
if ($de === '' && $ate === '') {
    $p = tempo_previsao($LAT, $LON);
    if (!$p) json_saida(['ok' => false, 'dias' => []], 200, 0);
    json_saida(['ok' => true, 'dias' => $p, 'fonte' => 'Open-Meteo'], 200, 1800);
}

// Com datas: os dias da estadia (da chegada à partida; no máximo 21).
if (!$valida($de) || !$valida($ate) || $ate < $de) json_saida(['ok' => false, 'erro' => 'datas', 'dias' => []], 422);
$previsao = [];
foreach (tempo_previsao($LAT, $LON) ?? [] as $p) $previsao[$p['dia']] = $p;
$clima = null; $climaPedido = false;
$dias = []; $medias = 0;
$d = new DateTimeImmutable($de . ' 12:00:00'); $fim = new DateTimeImmutable($ate . ' 12:00:00');
for ($i = 0; $d <= $fim && $i < 21; $i++, $d = $d->modify('+1 day')) {
    $dia = $d->format('Y-m-d');
    if (isset($previsao[$dia])) { $dias[] = $previsao[$dia] + ['tipo' => 'previsao']; continue; }
    if (!$climaPedido) { $clima = tempo_clima($LAT, $LON); $climaPedido = true; }
    $c = $clima[$d->format('m-d')] ?? null;
    if ($c) { $dias[] = ['dia' => $dia, 'codigo' => $c['codigo'], 'max' => $c['max'], 'min' => $c['min'], 'tipo' => 'media']; $medias++; }
}
if (!$dias) json_saida(['ok' => false, 'dias' => []], 200, 0);
json_saida(['ok' => true, 'dias' => $dias, 'modo' => $medias === 0 ? 'previsao' : ($medias === count($dias) ? 'media' : 'misto'), 'fonte' => 'Open-Meteo'], 200, 1800);
