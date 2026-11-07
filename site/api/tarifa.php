<?php
// Porta do site para a conta (#190 site_tarifa.php da app). Se a app não responder, calcula com inc/tarifas.php (fonte: "site").
declare(strict_types=1);
require_once __DIR__ . '/../inc/util.php';
require_once __DIR__ . '/../inc/tarifas.php';

$cfg = mcb_config();
$entrada = (string)($_GET['entrada'] ?? '');
$saida   = (string)($_GET['saida'] ?? '');
$pax     = max(1, min(20, (int)($_GET['pax'] ?? 2)));

if (!Tarifas::isoValido($entrada) || !Tarifas::isoValido($saida)) {
    json_saida(['ok' => false, 'erro' => 'datas', 'mensagem' => 'Escolham a data de entrada e a de saída.'], 422);
}

$q = http_build_query(['entrada' => $entrada, 'saida' => $saida, 'pax' => $pax]);
[$cod, $corpo] = http_json(rtrim($cfg['APP_URL'], '/') . "/site_tarifa.php?$q", null, [], 5);
$j = ($cod >= 200 && $cod < 500) ? json_decode($corpo, true) : null;

if (is_array($j) && array_key_exists('ok', $j)) {
    $j['fonte'] = 'app';
    json_saida($j, 200);
}

json_saida(Tarifas::orcamento($entrada, $saida, $pax), 200);
