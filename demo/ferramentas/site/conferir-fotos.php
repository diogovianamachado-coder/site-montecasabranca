<?php
// Confere as fotografias do site (site/conteudo.php contra site/fotos/). Uso: php demo/ferramentas/site/conferir-fotos.php
// Falha (sai com 1) se: uma fotografia referida não existe · a mesma fotografia aparece duas vezes no mesmo álbum, na mesma sequência
// ou em dois sítios de destaque da página (fotografias grandes, capítulos, fila do fecho, Montemor, ecopista, Nacional 2) · uma
// fotografia não tem descrição (alt) ·
// uma sequência tem uma fotografia sem legenda · falta a variante de telemóvel (-m) de uma fotografia referida.
// Avisa (sem falhar) dos ficheiros que ninguém usa.
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

/** Um conjunto de fotografias (álbum, sequência ou fila): sem repetidas, todas com descrição; $legendas = todas com legenda. */
$conferir = function (string $nome, array $fotos, bool $legendas = false) use (&$erros): void {
    $vistas = [];
    foreach ($fotos as $f) {
        if (isset($vistas[$f['src']])) $erros[] = "«{$nome}»: {$f['src']} aparece duas vezes";
        $vistas[$f['src']] = true;
        if (trim((string)($f['alt'] ?? '')) === '') $erros[] = "«{$nome}»: {$f['src']} sem descrição (alt)";
        if ($legendas && trim((string)($f['legenda'] ?? '')) === '') $erros[] = "«{$nome}»: {$f['src']} sem legenda";
    }
    printf("  %-34s %3d\n", $nome, count($fotos));
};
foreach ($C['galeria']['albuns'] as $al) $conferir('álbum ' . $al['nome'], $al['fotos']);
foreach ($C['momentos'] as $m) $conferir('capítulo ' . $m['palavra'], $m['fotos'], true);
$conferir('fila do fecho', $C['regua']['fotos']);
$conferir('sequência de Montemor-o-Novo', $C['montemor']['fotos'], true);
$conferir('régua da ecopista', $C['montemor']['ecopista']['fotos'] ?? [], true);
// As fotografias grandes que abrem os capítulos e Montemor (versão 6): cada uma com descrição.
foreach ($C['momentos'] as $m) if (empty($m['banda']['src']) || trim((string)($m['banda']['alt'] ?? '')) === '') $erros[] = "capítulo {$m['palavra']}: falta a fotografia grande ou a sua descrição";
if (empty($C['montemor']['banda']['src']) || trim((string)($C['montemor']['banda']['alt'] ?? '')) === '') $erros[] = 'Montemor-o-Novo: falta a fotografia grande ou a sua descrição';
if (trim((string)($C['n2']['foto']['legenda'] ?? '')) === '') $erros[] = 'Nacional 2: a fotografia do capítulo não tem legenda';
// Os sítios de destaque (fora da galeria): a mesma fotografia não aparece em dois.
$destaque = [];
$juntar = function (string $onde, array $fotos) use (&$destaque, &$erros): void {
    foreach ($fotos as $f) {
        if (isset($destaque[$f['src']])) $erros[] = "{$f['src']} aparece em dois sítios de destaque: {$destaque[$f['src']]} e $onde";
        $destaque[$f['src']] = $onde;
    }
};
foreach ($C['momentos'] as $m) { $juntar('fotografia grande de ' . $m['palavra'], [$m['banda']]); $juntar('capítulo ' . $m['palavra'], $m['fotos']); }
$juntar('fila do fecho', $C['regua']['fotos']);
$juntar('fotografia grande de Montemor-o-Novo', [$C['montemor']['banda']]);
$juntar('Montemor-o-Novo', $C['montemor']['fotos']);
$juntar('ecopista', $C['montemor']['ecopista']['fotos'] ?? []);
$juntar('Nacional 2', [$C['n2']['foto']]);
foreach (array_keys($referidas) as $src) {
    $m = preg_replace('/\.(jpe?g|png|webp)$/i', '-m.$1', $src);
    if (is_file("$raiz/fotos/$src") && !is_file("$raiz/fotos/$m")) $erros[] = "falta a variante de telemóvel: fotos/$m";
}
foreach ($C['inicio']['capas'] as $k => $c) if (!is_file("$raiz/fotos/" . $c['foto']['src'])) $erros[] = "capa $k: falta fotos/{$c['foto']['src']}";

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
