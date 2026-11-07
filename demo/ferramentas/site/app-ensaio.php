<?php
// App de ensaio para o workflow «Capturas» e para testes locais: responde às quatro portas pela forma do contrato_portas_v1.md.
// Servir com: php -S 127.0.0.1:8799 demo/ferramentas/site/app-ensaio.php · pedido com email «preco@» → 409 preco; «limite@» → 429; entrada 2027-03-05 → 409 ocupado.
declare(strict_types=1);
require __DIR__ . '/../../../site/inc/tarifas.php';
$rota = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
header('Content-Type: application/json; charset=utf-8');
function out(array $d, int $c = 200): never { http_response_code($c); echo json_encode($d, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); exit; }
@file_put_contents(sys_get_temp_dir() . '/app-ensaio-chamadas.log', date('c') . ' ' . $_SERVER['REQUEST_METHOD'] . ' ' . $_SERVER['REQUEST_URI'] . ' chave=' . ($_SERVER['HTTP_X_SITE_CHAVE'] ?? '-') . "\n", FILE_APPEND);
if ($rota === '/site_ocupacao.php') {
    $de = $_GET['de'] ?? date('Y-m'); $ate = $_GET['ate'] ?? date('Y-m', strtotime('+11 months'));
    if (!preg_match('/^\d{4}-\d{2}$/', $de) || !preg_match('/^\d{4}-\d{2}$/', $ate)) out(['ok' => false, 'erro' => 'intervalo', 'mensagem' => 'Intervalo inválido'], 400);
    $h = new DateTimeImmutable('today');
    out(['ok' => true, 'de' => "$de-01", 'ate' => (new DateTimeImmutable("$ate-01"))->modify('+1 month')->format('Y-m-d'),
        'ocupado' => [['de' => $h->modify('+12 days')->format('Y-m-d'), 'ate' => $h->modify('+15 days')->format('Y-m-d')], ['de' => '2027-03-05', 'ate' => '2027-03-08'], ['de' => '2027-04-02', 'ate' => '2027-04-09']],
        'gerado_em' => date(DATE_ATOM), 'stub' => true]);
}
if ($rota === '/site_tarifa.php') {
    $e = $_GET['entrada'] ?? ''; $s = $_GET['saida'] ?? ''; $p = (int)($_GET['pax'] ?? 1);
    if (!Tarifas::isoValido($e) || !Tarifas::isoValido($s)) out(['ok' => false, 'erro' => 'datas', 'mensagem' => 'Datas inválidas'], 400);
    $R = Tarifas::orcamento($e, $s, $p); unset($R['fonte']); $R['stub'] = true; out($R);
}
if ($rota === '/site_prereserva.php') {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(['ok' => false, 'erro' => 'metodo'], 405);
    if (($_SERVER['HTTP_X_SITE_CHAVE'] ?? '') !== 'chave-de-ensaio') out(['ok' => false, 'erro' => 'chave', 'mensagem' => 'Chave inválida'], 401);
    $in = json_decode((string)file_get_contents('php://input'), true) ?: [];
    @file_put_contents(sys_get_temp_dir() . '/app-ensaio-pedidos.log', json_encode($in, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND);
    foreach (['nome', 'email', 'entrada', 'saida', 'pax', 'pedido_id'] as $k) if (empty($in[$k])) out(['ok' => false, 'erro' => 'campos', 'campos' => [$k]], 422);
    if (!empty($in['armadilha']) || (isset($in['segundos_a_preencher']) && $in['segundos_a_preencher'] < 5)) out(['ok' => true, 'estado' => 'pedido recebido']);
    if (str_contains($in['email'], 'preco') && empty($in['confirmo_preco'])) { $R0 = Tarifas::orcamento($in['entrada'], $in['saida'], (int)$in['pax']); out(['ok' => false, 'erro' => 'preco', 'preco_mostrado' => $in['preco_mostrado'] ?? null, 'preco_app' => ($R0['total'] ?? 0) + 10], 409); }
    if (str_contains($in['email'], 'limite')) out(['ok' => false, 'erro' => 'limite', 'mensagem' => 'Demasiados pedidos'], 429);
    if ($in['entrada'] === '2027-03-05') out(['ok' => false, 'erro' => 'ocupado', 'mensagem' => 'Datas ocupadas'], 409);
    $R = Tarifas::orcamento($in['entrada'], $in['saida'], (int)$in['pax']);
    if ($R['ok'] && empty($in['confirmo_preco']) && isset($in['preco_mostrado']) && abs((float)$in['preco_mostrado'] - $R['total']) > 0.009)
        out(['ok' => false, 'erro' => 'preco', 'preco_mostrado' => $in['preco_mostrado'], 'preco_app' => $R['total']], 409);
    out(['ok' => true, 'codigo' => '2027_03', 'estado' => 'pedido recebido', 'total' => $R['total'] ?? null, 'mensagem' => 'Recebemos o seu pedido (ensaio).'], 201);
}
if ($rota === '/site_avaliacoes.php') {
    out(['ok' => true, 'media' => 4.9, 'n' => 12, 'avaliacoes' => [
        ['nota' => 5, 'texto' => 'Casa impecável, piscina ótima e um silêncio raro. Voltamos de certeza.', 'nome' => 'Marie', 'pais' => 'FR', 'mes' => '2026-08', 'lingua' => 'pt'],
        ['nota' => 5, 'texto' => 'Perfeita para oito amigos: cozinha a sério e o alpendre ao fim do dia.', 'nome' => 'João', 'pais' => 'PT', 'mes' => '2026-05', 'lingua' => 'pt']]]);
}
out(['ok' => false, 'erro' => 'rota'], 404);
