<?php $M = $C['momentos']; // os três momentos da casa: por fora, sem pressa, por dentro ?>

<!-- 1. Por fora: fotografias a toda a largura, com o texto por cima -->
<section id="<?= e($M[0]['id']) ?>" class="banda banda-rolo" aria-labelledby="t-<?= e($M[0]['id']) ?>">
  <?= rolo($M[0]['eyebrow'], $M[0]['fotos'], ['principal' => true, 'legendas' => true, 'classe' => 'rolo-banda']) ?>
  <div class="banda-texto contentor sobre-foto">
    <div class="reveal">
      <p class="eyebrow eyebrow-foto"><?= e($M[0]['eyebrow']) ?></p>
      <h2 id="t-<?= e($M[0]['id']) ?>" class="t-grande"><?= e($M[0]['titulo']) ?></h2>
      <p class="texto-grande"><?= e($M[0]['texto']) ?></p>
    </div>
  </div>
</section>

<!-- 2. Sem pressa: fotografias à esquerda, texto à direita -->
<section id="<?= e($M[1]['id']) ?>" class="bloco-espaco momento" aria-labelledby="t-<?= e($M[1]['id']) ?>">
  <div class="contentor grelha-12 alinhar-centro">
    <div class="momento-fotos reveal">
      <?= rolo($M[1]['eyebrow'], $M[1]['fotos'], ['principal' => true, 'legendas' => true, 'classe' => 'rolo-momento']) ?>
    </div>
    <div class="momento-texto reveal" style="transition-delay:120ms">
      <p class="eyebrow"><?= e($M[1]['eyebrow']) ?></p>
      <h2 id="t-<?= e($M[1]['id']) ?>" class="t-medio"><?= e($M[1]['titulo']) ?></h2>
      <p class="texto-grande suave"><?= e($M[1]['texto']) ?></p>
    </div>
  </div>
</section>

<!-- 3. Por dentro: texto à esquerda, fotografias à direita (fundo pálido) -->
<section id="<?= e($M[2]['id']) ?>" class="fundo-pale bloco-espaco momento momento-inverso" aria-labelledby="t-<?= e($M[2]['id']) ?>">
  <div class="contentor grelha-12 alinhar-centro">
    <div class="momento-fotos reveal" style="transition-delay:120ms">
      <?= rolo($M[2]['eyebrow'], $M[2]['fotos'], ['principal' => true, 'legendas' => true, 'classe' => 'rolo-momento']) ?>
    </div>
    <div class="momento-texto reveal">
      <p class="eyebrow"><?= e($M[2]['eyebrow']) ?></p>
      <h2 id="t-<?= e($M[2]['id']) ?>" class="t-medio"><?= e($M[2]['titulo']) ?></h2>
      <p class="texto-grande suave"><?= e($M[2]['texto']) ?></p>
      <?php if (!empty($M[2]['nota'])): ?><p class="nota-pequena"><?= e($M[2]['nota']) ?></p><?php endif; ?>
    </div>
  </div>
</section>
