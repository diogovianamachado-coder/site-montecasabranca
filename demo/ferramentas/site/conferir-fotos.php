<?php
// Confere as fotografias do site (site/conteudo.php contra site/fotos/). Uso: php demo/ferramentas/site/conferir-fotos.php
// Falha (sai com 1) se: uma fotografia referida não existe · um álbum em pares tem número ímpar de fotografias ou as etiquetas não
// alternam · a mesma fotografia aparece duas vezes no mesmo álbum. Avisa (sem falhar) dos ficheiros que ninguém usa.
declare(strict_types=1);

$raiz = dirname(__DIR__, 3) . '/site';
$C = require $raiz . '/conteudo.php';
$erros = [];
$avisos = [];

$referidas = [];
array_walk_recursive($C, function ($v, $k) use (&$referidas) {
    if ($k === 'src' || $k === 'imagem_partilha') $referidas[(string)$v] = true;
});
foreach (array_keys($referidas) as $src) {
    if (!is_file("$raiz/fotos/$src")) $erros[] = "fotografia referida que não existe: fotos/$src";
}

foreach ($C['fotografias']['albuns'] as $al) {
    $nome = $al['nome'];
    $n = count($al['fotos']);
    $vistas = [];
    foreach ($al['fotos'] as $f) {
        if (isset($vistas[$f['src']])) $erros[] = "álbum «{$nome}»: {$f['src']} aparece duas vezes";
        $vistas[$f['src']] = true;
        if (trim((string)($f['alt'] ?? '')) === '') $erros[] = "álbum «{$nome}»: {$f['src']} sem legenda (alt)";
    }
    if (!empty($al['pares'])) {
        if ($n % 2 !== 0) $erros[] = "álbum «{$nome}» é em pares e tem {$n} fotografias (número ímpar)";
        for ($i = 0; $i + 1 < $n; $i += 2) {
            $a = $al['fotos'][$i]['etiqueta'] ?? '';
            $d = $al['fotos'][$i + 1]['etiqueta'] ?? '';
            if ($a === '' || $d === '' || $a === $d) $erros[] = "álbum «{$nome}»: o par n.º " . ($i / 2 + 1) . " não tem as duas etiquetas (antes, depois)";
        }
    }
    printf("  %-28s %3d%s\n", $nome, $n, !empty($al['pares']) ? '  (' . intdiv($n, 2) . ' pares)' : '');
}

$it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator("$raiz/fotos", FilesystemIterator::SKIP_DOTS));
$ficheiros = 0;
foreach ($it as $f) {
    $rel = substr($f->getPathname(), strlen("$raiz/fotos/"));
    $ficheiros++;
    if (preg_match('/-m\.(jpe?g|png|webp)$/i', $rel)) {
        $base = preg_replace('/-m\.(jpe?g|png|webp)$/i', '.$1', $rel);
        if (!is_file("$raiz/fotos/$base")) $avisos[] = "variante de telemóvel sem fotografia grande: fotos/$rel";
        continue;
    }
    if (!isset($referidas[$rel])) $avisos[] = "ficheiro que nenhuma página usa: fotos/$rel";
}

echo count($referidas) . " fotografias referidas · $ficheiros ficheiros em site/fotos\n";
foreach ($avisos as $a) echo "aviso: $a\n";
foreach ($erros as $e) echo "ERRO: $e\n";
if ($erros) { echo "FALHOU: " . count($erros) . " problema(s) nas fotografias\n"; exit(1); }
echo "fotografias OK\n";
