<?php
// Tempo de ENSAIO para os testes e para as capturas das versões: a máquina dos testes não chega ao Open-Meteo, por isso a cache do site
// é semeada com 16 dias de «previsão» (tempo.json) e com as «médias dos últimos anos» por dia do ano (clima.json).
// Uso: php demo/ferramentas/site/semear-tempo.php <pasta da cache>
declare(strict_types=1);
$C = $argv[1] ?? '';
if ($C === '') { fwrite(STDERR, "uso: semear-tempo.php <pasta da cache>\n"); exit(2); }
if (!is_dir($C)) mkdir($C, 0775, true);
foreach (glob($C . '/*.json') ?: [] as $f) unlink($f);
$h = new DateTimeImmutable('today'); $d = [];
foreach (range(0, 15) as $i) {
    $d[] = ['dia' => $h->modify("+$i days")->format('Y-m-d'), 'codigo' => [0, 1, 2, 3, 61, 0, 0, 2, 45, 0, 1, 3, 80, 0, 95, 2][$i], 'max' => 18 + $i % 5, 'min' => 8 + $i % 4];
}
file_put_contents("$C/tempo.json", json_encode(['ok' => true, 'dias' => $d, 'fonte' => 'ensaio']));
$c = [];
for ($x = new DateTimeImmutable('2024-01-01'); $x->format('Y') === '2024'; $x = $x->modify('+1 day')) {
    $n = (int)$x->format('z'); $t = 17 + 11 * sin(($n - 110) / 366 * 2 * M_PI);
    $c[$x->format('m-d')] = ['codigo' => [0, 2, 3, 61, 80][$n % 5], 'max' => (int)round($t + 6), 'min' => (int)round($t - 5)];
}
file_put_contents("$C/clima.json", json_encode(['dias' => $c, 'anos' => 'ensaio']));
