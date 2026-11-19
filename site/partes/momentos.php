<?php $M = $C['momentos']; // os três capítulos da casa: por fora, sem pressa, por dentro
// Cada capítulo abre com uma fotografia grande, de lado a lado, com o sobretítulo e a palavra escritos por cima (versão 6: as
// fotografias «com vida» da versão 1; Diogo, 18/11/2026). A fotografia entra a acender e passa devagar por trás ao rolar. Depois, a
// frase e o texto; e as outras fotografias, a deslizar sozinhas, que entram uma a uma. O capítulo do meio tem o fundo pálido.
// As fotografias ficam fora do «revelar ao rolar»: estão sempre à vista, não dependem de JavaScript. ?>
<?php foreach ($M as $i => $m): ?>

<section id="<?= e($m['id']) ?>" class="capitulo capitulo-com-banda<?= $i === 1 ? ' fundo-pale' : '' ?>" aria-labelledby="t-<?= e($m['id']) ?>">
  <?= banda($m['banda'], $C['casa']['eyebrow'], $m['palavra'], 't-' . $m['id'], $m['palavra'], $m['fotos']) ?>
  <div class="contentor">
    <div class="reveal capitulo-grelha">
      <p class="capitulo-frase serif"><?= e($m['frase']) ?></p>
      <div class="capitulo-texto">
        <p class="texto-capitulo"><?= e($m['texto']) ?></p>
        <?php if (!empty($m['nota'])): ?><p class="nota-capitulo"><?= e($m['nota']) ?></p><?php endif; ?>
      </div>
    </div>
  </div>
  <?= sequencia($m['palavra'], $m['fotos']) ?>
</section>
<?php endforeach; ?>
