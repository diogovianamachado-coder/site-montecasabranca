<?php $R = $C['regua']; ?>
<!-- A frase que fecha o dia e, a seguir, a régua de fotografias (pequenas, ao acaso, a rolar: como a galeria das plataformas) -->
<section class="relance" aria-labelledby="regua-titulo">
  <div class="contentor reveal">
    <p class="fecho serif"><?= e($C['fecho']) ?></p>
  </div>
  <div class="contentor relance-cabeca">
    <h2 id="regua-titulo" class="t-pequeno"><?= e($R['titulo']) ?></h2>
    <a href="<?= e($R['ligacao'][1]) ?>" class="ligacao-primaria"><?= e($R['ligacao'][0]) ?></a>
  </div>
  <?= rolo($R['titulo'], $R['fotos'], ['classe' => 'rolo-regua', 'acaso' => true, 'vel' => 26]) ?>
</section>
