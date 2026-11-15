<?php $S = $C['casa']; ?>
<!-- A casa: a mensagem «Por fora · Sem pressa · Por dentro»; cada palavra leva ao seu momento -->
<section id="a-casa" class="manifesto contentor">
  <div class="reveal">
    <p class="eyebrow centro"><?= e($S['eyebrow']) ?></p>
    <h2 class="manifesto-titulo trio">
      <?php foreach ($S['titulo'] as $i => [$t, $h]): ?><a href="<?= e($h) ?>" class="trio-<?= $i + 1 ?>"><?= e($t) ?></a> <?php endforeach; ?>
    </h2>
    <p class="manifesto-texto"><?= e($S['texto']) ?></p>
  </div>
</section>
