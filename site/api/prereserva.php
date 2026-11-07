<?php
// Pedido de datas: o browser chama este ficheiro (mesmo domínio); este chama a porta #191 da app com a chave X-Site-Chave.
// A chave só existe em config.php, no servidor. Sem app ou sem chave, o pedido não se perde: fica em cache/pedidos.log e o visitante
// recebe a indicação de contactar por WhatsApp/email.
declare(strict_types=1);
require_once __DIR__ . '/../inc/util.php';
require_once __DIR__ . '/../inc/tarifas.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') json_saida(['ok' => false, 'erro' => 'metodo', 'mensagem' => 'Método não permitido.'], 405);

$cfg = mcb_config();
$in = json_decode((string)file_get_contents('php://input'), true);
if (!is_array($in)) json_saida(['ok' => false, 'erro' => 'corpo', 'mensagem' => 'Pedido inválido.'], 400);

$limpa = fn($k, $max) => mb_substr(trim(strip_tags((string)($in[$k] ?? ''))), 0, $max);
$nome = $limpa('nome', 120); $email = $limpa('email', 160); $telefone = $limpa('telefone', 40); $mensagem = $limpa('mensagem', 1500);
$entrada = $limpa('entrada', 10); $saida = $limpa('saida', 10); $pax = max(1, min(20, (int)($in['pax'] ?? 0)));
$armadilha = (string)($in['armadilha'] ?? '');
$segundos = isset($in['segundos_a_preencher']) ? (int)$in['segundos_a_preencher'] : null;
$lingua = (string)($in['lingua'] ?? 'pt');
if (!in_array($lingua, ['pt', 'en'], true)) $lingua = 'pt';
// G: o pedido_id só é aceite se for um UUID; senão gera-se aqui.
$pedidoId = (string)($in['pedido_id'] ?? '');
if (!preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i', $pedidoId)) $pedidoId = sprintf('%08x-%04x-4%03x-%04x-%012x', mt_rand(0, 0xffffffff), mt_rand(0, 0xffff), mt_rand(0, 0xfff), mt_rand(0x8000, 0xbfff), mt_rand(0, 0xffffffffffff));

$faltam = [];
if ($nome === '') $faltam[] = 'nome';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $faltam[] = 'email';
if (!Tarifas::isoValido($entrada) || !Tarifas::isoValido($saida) || $saida <= $entrada) $faltam[] = 'datas';
if ($faltam) json_saida(['ok' => false, 'erro' => 'campos', 'campos' => $faltam, 'mensagem' => 'Faltam dados: ' . implode(', ', $faltam) . '.'], 422);

// Robôs: campo escondido preenchido ou formulário submetido em menos de 5 s → resposta "ok" falsa, nada registado.
if ($armadilha !== '' || ($segundos !== null && $segundos < 5)) json_saida(['ok' => true, 'estado' => 'pedido recebido', 'mensagem' => 'Recebemos o seu pedido.'], 200);

$pedido = [
    'pedido_id' => $pedidoId,
    'nome' => $nome, 'email' => $email, 'telefone' => $telefone ?: null, 'entrada' => $entrada, 'saida' => $saida, 'pax' => $pax,
    'mensagem' => $mensagem ?: null, 'preco_mostrado' => isset($in['preco_mostrado']) ? round((float)$in['preco_mostrado'], 2) : null,
    'lingua' => $lingua,
    'origem' => preg_replace('/[^a-z_-]/', '', (string)($in['origem'] ?? 'site')) ?: 'site',
    'ip' => $_SERVER['REMOTE_ADDR'] ?? '', 'segundos_a_preencher' => $segundos, 'armadilha' => '',
];
if (!empty($in['confirmo_preco'])) $pedido['confirmo_preco'] = true;

$periodo = (new DateTimeImmutable($entrada))->format('j/n') . '–' . (new DateTimeImmutable($saida))->format('j/n/Y');

if (!empty($cfg['SITE_CHAVE'])) {
    [$cod, $corpo] = http_json(rtrim($cfg['APP_URL'], '/') . '/site_prereserva.php', $pedido, ['X-Site-Chave: ' . $cfg['SITE_CHAVE']], 5);
    $j = json_decode($corpo, true);
    if (is_array($j) && array_key_exists('ok', $j)) {
        if ($j['ok']) {
            json_saida(['ok' => true, 'codigo' => $j['codigo'] ?? null, 'estado' => $j['estado'] ?? 'pedido recebido', 'total' => $j['total'] ?? null,
                'mensagem' => $j['mensagem'] ?? "Recebemos o seu pedido para $periodo" . (isset($j['codigo']) ? " (n.º {$j['codigo']})" : '') . '. O Diogo responde em breve por WhatsApp ou email.'], 200);
        }
        $erro = (string)($j['erro'] ?? 'app');
        $msg = match ($erro) {
            'preco'   => 'O valor atualizado para estas datas é ' . Tarifas::euros((float)($j['preco_app'] ?? 0)) . '. Confirmam?',
            'ocupado' => 'Estas datas deixaram de estar livres. Experimentem outras ou falem connosco.',
            'limite'  => 'Recebemos vários pedidos deste endereço; tentem mais tarde ou falem connosco pelo WhatsApp.',
            default   => $j['mensagem'] ?? 'Não foi possível registar o pedido.',
        };
        json_saida(['ok' => false, 'erro' => $erro, 'mensagem' => $msg, 'preco_app' => $j['preco_app'] ?? null, 'preco_mostrado' => $j['preco_mostrado'] ?? null], 200);
    }
}

// Sem app: guardar o pedido localmente (fora do GitHub; cache/ está no .gitignore) e pedir contacto direto.
$linha = json_encode(['quando' => date(DATE_ATOM), 'pedido' => $pedido], JSON_UNESCAPED_UNICODE) . "\n";
$dir = rtrim($cfg['CACHE_DIR'], '/');
if (!is_dir($dir)) @mkdir($dir, 0775, true);
if (!is_file($dir . '/.htaccess')) @file_put_contents($dir . '/.htaccess', "Require all denied\n");
@file_put_contents($dir . '/pedidos.log', $linha, FILE_APPEND | LOCK_EX);
// Avisar o anfitrião por email para o pedido não ficar esquecido (mail() da Amen; se falhar, fica só no log).
$para = mcb_factos()['email'] ?? 'geral@montecasabranca.pt';
$corpoMail = "Pedido pelo site (app sem resposta)\n\nNome: $nome\nEmail: $email\nTelefone: $telefone\nDatas: $entrada → $saida ($pax pessoas)\nValor mostrado: " . ($pedido['preco_mostrado'] ?? '—') . "\nMensagem: $mensagem\n";
@mail($para, "Pedido de datas · $periodo · $nome", $corpoMail, "From: site@" . (parse_url($cfg['SITE_URL'], PHP_URL_HOST) ?: 'montecasabranca.pt') . "\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8");
json_saida(['ok' => false, 'erro' => 'sem_app', 'mensagem' => "Anotámos o pedido para $periodo, mas não foi possível registá-lo na agenda."], 200);
