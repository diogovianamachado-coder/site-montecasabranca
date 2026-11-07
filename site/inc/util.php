<?php
// Monte Casa Branca · utilitários partilhados pelas páginas e pelas APIs.
declare(strict_types=1);

const MCB_RAIZ = __DIR__ . '/..';

/** Configuração: config.php se existir, senão config.exemplo.php. */
function mcb_config(): array
{
    static $cfg = null;
    if ($cfg === null) {
        $f = MCB_RAIZ . '/config.php';
        $cfg = require(is_file($f) ? $f : MCB_RAIZ . '/config.exemplo.php');
    }
    return $cfg;
}

function mcb_factos(): array
{
    static $f = null;
    return $f ??= require MCB_RAIZ . '/inc/factos.php';
}

function mcb_conteudo(): array
{
    static $c = null;
    return $c ??= require MCB_RAIZ . '/conteudo.php';
}

/** Escapar para HTML. */
function e(?string $s): string
{
    return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/** Caminho público de uma fotografia (fotos/<álbum>/<ficheiro>). */
function foto_url(string $src): string
{
    return 'fotos/' . ltrim($src, '/');
}

/** A variante -m (telemóvel), se existir no disco. */
function foto_url_m(string $src): ?string
{
    $m = preg_replace('/\.(jpe?g|png|webp)$/i', '-m.$1', $src);
    return ($m !== $src && is_file(MCB_RAIZ . '/fotos/' . $m)) ? 'fotos/' . $m : null;
}

/**
 * Uma <img> ou <picture> com lazy loading, foco (object-position) e variante móvel.
 * $attrs: atributos extra para a <img> (class, fetchpriority, …).
 */
function foto_img(array $foto, array $attrs = [], bool $lazy = true): string
{
    $src = foto_url($foto['src']);
    $m = foto_url_m($foto['src']);
    $a = ['src' => $src, 'alt' => $foto['alt'] ?? '', 'decoding' => 'async'];
    if ($lazy) $a['loading'] = 'lazy';
    $style = isset($foto['pos']) ? 'object-position:' . $foto['pos'] : '';
    foreach ($attrs as $k => $v) {
        if ($k === 'style') $style = trim($style . ';' . $v, ';');
        else $a[$k] = $v;
    }
    if ($style !== '') $a['style'] = $style;
    $html = '<img';
    foreach ($a as $k => $v) $html .= ' ' . $k . '="' . e((string)$v) . '"';
    $html .= '>';
    if ($m) {
        return '<picture><source media="(max-width: 767px)" srcset="' . e($m) . '">' . $html . '</picture>';
    }
    return $html;
}

/** Dados de uma lista de fotografias para a galeria (JSON no atributo data-galeria). */
function galeria_json(string $nome, array $fotos): string
{
    $lista = array_map(fn($f) => ['src' => foto_url($f['src']), 'alt' => $f['alt'] ?? '', 'pos' => $f['pos'] ?? 'center'], $fotos);
    return e(json_encode(['nome' => $nome, 'fotos' => $lista], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}

/** Ícones SVG (traço, estilo lucide), por nome. */
function icone(string $nome, string $class = 'ico'): string
{
    $p = [
        'pessoas' => '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
        'cama' => '<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/>',
        'ondas' => '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
        'baixo' => '<path d="m6 9 6 6 6-6"/>',
        'esq' => '<path d="m15 18-6-6 6-6"/>',
        'dir' => '<path d="m9 18 6-6-6-6"/>',
        'fechar' => '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
        'menu' => '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
        'whatsapp' => '<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>',
        'email' => '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>',
        'instagram' => '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
        'mapa' => '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
        'mais' => '<path d="M5 12h14"/><path d="M12 5v14"/>',
    ];
    return '<svg class="' . e($class) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' . ($p[$nome] ?? '') . '</svg>';
}

/** Resposta JSON das APIs. */
function json_saida(array $dados, int $codigo = 200, int $cache = 0): never
{
    http_response_code($codigo);
    header('Content-Type: application/json; charset=utf-8');
    header($cache > 0 ? "Cache-Control: public, max-age=$cache" : 'Cache-Control: no-store');
    echo json_encode($dados, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/** GET/POST JSON a um URL (cURL se existir, senão file_get_contents). Devolve [código, corpo-string]. */
function http_json(string $url, ?array $corpo = null, array $cabecalhos = [], int $timeout = 8): array
{
    $cab = array_merge(['Accept: application/json'], $cabecalhos);
    if ($corpo !== null) $cab[] = 'Content-Type: application/json';
    $dados = $corpo !== null ? json_encode($corpo, JSON_UNESCAPED_UNICODE) : null;
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => $timeout, CURLOPT_HTTPHEADER => $cab, CURLOPT_FOLLOWLOCATION => true]);
        if ($dados !== null) { curl_setopt($ch, CURLOPT_POST, true); curl_setopt($ch, CURLOPT_POSTFIELDS, $dados); }
        $r = curl_exec($ch);
        $c = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        curl_close($ch);
        return [$r === false ? 0 : $c, is_string($r) ? $r : ''];
    }
    $ctx = stream_context_create(['http' => ['method' => $dados !== null ? 'POST' : 'GET', 'header' => implode("\r\n", $cab), 'content' => $dados ?? '', 'timeout' => $timeout, 'ignore_errors' => true]]);
    $r = @file_get_contents($url, false, $ctx);
    $c = 0;
    foreach ($http_response_header ?? [] as $h) if (preg_match('#^HTTP/\S+\s+(\d{3})#', $h, $m)) $c = (int)$m[1];
    return [$r === false ? 0 : $c, is_string($r) ? $r : ''];
}

/** Cache simples em ficheiro. */
function cache_ler(string $chave, int $maxIdade): ?string
{
    $f = rtrim(mcb_config()['CACHE_DIR'], '/') . '/' . preg_replace('/[^a-z0-9_-]/i', '_', $chave) . '.json';
    if (is_file($f) && time() - filemtime($f) < $maxIdade) return (string)file_get_contents($f);
    return null;
}

function cache_gravar(string $chave, string $valor): void
{
    $d = rtrim(mcb_config()['CACHE_DIR'], '/');
    if (!is_dir($d)) @mkdir($d, 0775, true);
    @file_put_contents($d . '/' . preg_replace('/[^a-z0-9_-]/i', '_', $chave) . '.json', $valor, LOCK_EX);
}
