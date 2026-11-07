<?php
// Avaliações publicadas (#192 site_avaliacoes.php da app). Cache de 1 hora. Sem app → lista vazia (o site mantém a citação do conteudo.php).
declare(strict_types=1);
require_once __DIR__ . '/../inc/util.php';

$cfg = mcb_config();
$lingua = (string)($_GET['lingua'] ?? 'pt');
if (!in_array($lingua, ['pt', 'en'], true)) $lingua = 'pt';
$n = max(1, min(12, (int)($_GET['n'] ?? 6)));
$chave = "avaliacoes_{$lingua}_{$n}";

if (($c = cache_ler($chave, 3600)) !== null) json_saida(json_decode($c, true) ?: ['ok' => false], 200, 1800);

[$cod, $corpo] = http_json(rtrim($cfg['APP_URL'], '/') . "/site_avaliacoes.php?lingua=$lingua&n=$n", null, [], 6);
$j = $cod === 200 ? json_decode($corpo, true) : null;
if (is_array($j) && ($j['ok'] ?? false)) {
    $saida = ['ok' => true, 'media' => $j['media'] ?? null, 'n' => $j['n'] ?? null, 'avaliacoes' => array_values(array_map(
        fn($a) => ['nota' => $a['nota'] ?? null, 'texto' => $a['texto'] ?? '', 'nome' => $a['nome'] ?? '', 'pais' => $a['pais'] ?? '', 'mes' => $a['mes'] ?? ''],
        $j['avaliacoes'] ?? []))];
    cache_gravar($chave, json_encode($saida, JSON_UNESCAPED_UNICODE));
    json_saida($saida, 200, 1800);
}
json_saida(['ok' => true, 'avaliacoes' => [], 'app' => false], 200, 0);
