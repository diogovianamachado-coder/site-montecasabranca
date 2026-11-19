<?php $S = $C['casa']; ?>
<!-- A casa: o cartaz «Por fora · Sem pressa · Por dentro» em escada, como na versão 2 (Diogo, 19/11/2026: «menu em escada»):
     «Por fora» à esquerda, «Sem pressa» ao meio, em itálico e na cor terracota, «Por dentro» à direita; sem setas. As palavras
     entram uma a seguir à outra; cada uma leva ao seu capítulo. Enche o ecrã. -->
<section id="a-casa" class="cartaz" aria-label="<?= e($S['eyebrow']) ?>">
  <div class="contentor">
    <div class="reveal">
      <p class="eyebrow centro"><?= e($S['eyebrow']) ?></p>
      <h2 class="cartaz-linhas">
        <?php foreach ($S['titulo'] as $i => [$t, $h]): ?><a href="<?= e($h) ?>" class="degrau degrau-<?= $i + 1 ?>"><?= e($t) ?></a> <?php endforeach; ?>
      </h2>
      <p class="cartaz-texto"><?= e($S['texto']) ?></p>
    </div>
  </div>
</section>
