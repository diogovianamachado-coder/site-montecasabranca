<?php $R = $C['relance']; ?>
<section class="relance" aria-labelledby="relance-titulo">
  <div class="contentor relance-cabeca">
    <h2 id="relance-titulo" class="t-medio"><?= e($R['titulo']) ?></h2>
    <a href="<?= e($R['ligacao'][1]) ?>" class="ligacao-primaria"><?= e($R['ligacao'][0]) ?></a>
  </div>
  <ul class="regua" aria-label="Melhores fotografias, deslizar para ver mais">
    <?php foreach ($R['fotos'] as $i => $f): ?>
    <li class="<?= $i % 2 === 0 ? 'regua-larga' : 'regua-estreita' ?>">
      <button type="button" class="zoom abrir-galeria" data-galeria="<?= galeria_json($R['titulo'], $R['fotos']) ?>" data-inicio="<?= $i ?>" aria-label="<?= e($f['alt']) ?> · abrir em tamanho completo">
        <?= foto_img($f) ?>
      </button>
    </li>
    <?php endforeach; ?>
  </ul>
</section>
