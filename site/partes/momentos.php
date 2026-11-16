<?php $M = $C['momentos']; // os três capítulos da casa: por fora, sem pressa, por dentro
// Cada capítulo abre com respiração própria (sobretítulo, a palavra em grande, a frase e o texto) e só depois vêm as fotografias,
// uma de cada vez, em sequência. O do meio tem o fundo pálido, para os três não se colarem uns aos outros.
// As fotografias ficam fora do «revelar ao rolar»: estão sempre à vista, não dependem de JavaScript. ?>
<?php foreach ($M as $i => $m): ?>

<section id="<?= e($m['id']) ?>" class="capitulo<?= $i === 1 ? ' fundo-pale' : '' ?>" aria-labelledby="t-<?= e($m['id']) ?>">
  <div class="contentor">
    <div class="reveal">
      <p class="eyebrow"><?= e($C['casa']['eyebrow']) ?></p>
      <h2 id="t-<?= e($m['id']) ?>" class="capitulo-palavra"><?= e($m['palavra']) ?></h2>
      <div class="capitulo-grelha">
        <p class="capitulo-frase serif"><?= e($m['frase']) ?></p>
        <div class="capitulo-texto">
          <p class="texto-capitulo"><?= e($m['texto']) ?></p>
          <?php if (!empty($m['nota'])): ?><p class="nota-capitulo"><?= e($m['nota']) ?></p><?php endif; ?>
        </div>
      </div>
    </div>
  </div>
  <?= sequencia($m['palavra'], $m['fotos']) ?>
</section>
<?php endforeach; ?>
