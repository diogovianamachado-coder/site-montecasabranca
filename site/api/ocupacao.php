<?php
// Porta do site para a ocupação (#189 site_ocupacao.php da app). Cache de 5 minutos; só intervalos, nunca nomes.
declare(strict_types=1);
require_once __DIR__ . '/../inc/util.php';

$cfg = mcb_config();
$de  = preg_match('/^\d{4}-\d{2}$/', $_GET['de'] ?? '')  ? $_GET['de']  : date('Y-m');
$ate = preg_match('/^\d{4}-\d{2}$/', $_GET['ate'] ?? '') ? $_GET['ate'] : date('Y-m', strtotime('+11 months'));
$chave = "ocupacao_{$de}_{$ate}";

if (($c = cache_ler($chave, 300)) !== null) {
    header('X-Cache: hit');
    json_saida(json_decode($c, true) ?: ['ok' => false], 200, 300);
}

[$cod, $corpo] = http_json(rtrim($cfg['APP_URL'], '/') . "/site_ocupacao.php?de=$de&ate=$ate", null, [], 6);
$j = $cod === 200 ? json_decode($corpo, true) : null;

if (is_array($j) && ($j['ok'] ?? false) && isset($j['ocupado'])) {
    $saida = ['ok' => true, 'de' => $j['de'] ?? null, 'ate' => $j['ate'] ?? null, 'ocupado' => array_values(array_map(
        fn($iv) => ['de' => $iv['de'], 'ate' => $iv['ate']], $j['ocupado'])), 'exemplo' => false];
    cache_gravar($chave, json_encode($saida, JSON_UNESCAPED_UNICODE));
    json_saida($saida, 200, 300);
}

// A app não respondeu: calendário vazio (ou de exemplo, só em ensaio). A disponibilidade real confirma-se no pedido.
$exemplo = [];
if (!empty($cfg['OCUPACAO_EXEMPLO'])) {
    $h = new DateTimeImmutable('today');
    foreach ([[10, 3], [24, 7], [45, 2], [70, 7]] as [$d, $n]) {
        $exemplo[] = ['de' => $h->modify("+{$d} days")->format('Y-m-d'), 'ate' => $h->modify('+' . ($d + $n) . ' days')->format('Y-m-d')];
    }
}
json_saida(['ok' => true, 'ocupado' => $exemplo, 'exemplo' => !empty($cfg['OCUPACAO_EXEMPLO']), 'app' => false], 200, 0);
