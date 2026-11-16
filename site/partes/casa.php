<?php $S = $C['casa']; ?>
<!-- A casa: o cartaz «Por fora · Sem pressa · Por dentro». Enche o ecrã; cada palavra leva ao seu capítulo. -->
<section id="a-casa" class="cartaz" aria-label="<?= e($S['eyebrow']) ?>">
  <div class="contentor">
    <div class="reveal">
      <p class="eyebrow"><?= e($S['eyebrow']) ?></p>
      <h2 class="cartaz-linhas">
        <?php foreach ($S['titulo'] as [$t, $h]): ?>
        <a href="<?= e($h) ?>"><span><?= e($t) ?></span><?= icone('fora', 'ico ico-seta') ?></a>
        <?php endforeach; ?>
      </h2>
      <p class="cartaz-texto"><?= e($S['texto']) ?></p>
    </div>
  </div>
</section>
