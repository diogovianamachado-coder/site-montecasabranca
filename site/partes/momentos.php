<?php $M = $C['momentos']; $nM = count($M); // os três momentos da casa: por fora, sem pressa, por dentro
// A palavra de cada momento é o seu título, grande e com o mesmo desenho do cartaz «Por fora · Sem pressa · Por dentro» (Diogo,
// 15/11/2026: «esta mensagem é forte; deveria ficar mais visível e enquadrável no ecrã com alguma estilização»). Por cima, «1 / 3»
// e um traço; por baixo, a frase do momento e o texto. Cada momento ocupa um ecrã (assets/css/site.css → «Os três momentos»).
$palavra = function (array $m, int $i) use ($nM): string {
    return '<p class="momento-num" aria-hidden="true">' . ($i + 1) . ' / ' . $nM . '</p>'
        . '<h2 id="t-' . e($m['id']) . '" class="palavra palavra-' . ($i + 1) . '">' . e($m['eyebrow']) . '</h2>';
};
?>

<!-- 1. Por fora: fotografias a toda a largura, com a palavra e o texto por cima -->
<section id="<?= e($M[0]['id']) ?>" class="banda banda-rolo banda-momento" aria-labelledby="t-<?= e($M[0]['id']) ?>">
  <?= rolo($M[0]['eyebrow'], $M[0]['fotos'], ['principal' => true, 'legendas' => true, 'classe' => 'rolo-banda']) ?>
  <div class="banda-texto contentor sobre-foto">
    <div class="reveal">
      <?= $palavra($M[0], 0) ?>
      <h3 class="momento-frase"><?= e($M[0]['titulo']) ?></h3>
      <p class="texto-grande"><?= e($M[0]['texto']) ?></p>
    </div>
  </div>
</section>

<?php foreach ([1, 2] as $i): $m = $M[$i]; // 2. Sem pressa: fotografias à esquerda · 3. Por dentro: fotografias à direita, fundo pálido ?>
<section id="<?= e($m['id']) ?>" class="momento<?= $i === 2 ? ' momento-inverso fundo-pale' : '' ?>" aria-labelledby="t-<?= e($m['id']) ?>">
  <div class="contentor momento-grelha">
    <header class="momento-palavra reveal"><?= $palavra($m, $i) ?></header>
    <div class="momento-fotos reveal" style="transition-delay:80ms">
      <?= rolo($m['eyebrow'], $m['fotos'], ['principal' => true, 'legendas' => true, 'classe' => 'rolo-momento']) ?>
    </div>
    <div class="momento-texto reveal" style="transition-delay:160ms">
      <h3 class="momento-frase"><?= e($m['titulo']) ?></h3>
      <p class="texto-grande suave"><?= e($m['texto']) ?></p>
      <?php if (!empty($m['nota'])): ?><p class="nota-pequena"><?= e($m['nota']) ?></p><?php endif; ?>
    </div>
  </div>
</section>
<?php endforeach; ?>
