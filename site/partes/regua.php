<?php $R = $C['regua']; ?>
<!-- O fecho da casa: a frase grande e, a seguir, «Há mais casa para descobrir», com a fila de fotografias para levar com o dedo -->
<section id="fecho" class="fecho" aria-labelledby="fecho-titulo">
  <div class="contentor">
    <div class="reveal">
      <h2 id="fecho-titulo" class="fecho-frase"><?= e($C['fecho']) ?></h2>
    </div>
    <div class="fecho-cabeca reveal">
      <h3><?= e($R['titulo']) ?></h3>
      <a href="<?= e($R['ligacao'][1]) ?>" class="ligacao-seta"><?= e($R['ligacao'][0]) ?><?= icone('fora') ?></a>
    </div>
  </div>
  <?= fila($R['titulo'], $R['fotos']) ?>
</section>
