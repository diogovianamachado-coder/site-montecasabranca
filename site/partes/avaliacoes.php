<?php $A = $C['avaliacoes']; ?>
<!-- Quem já ficou: uma frase curta de cada vez (rodam sozinhas; um toque passa à seguinte). Todas estão no HTML. -->
<section id="avaliacoes" class="avaliacoes fundo-areia">
  <div class="contentor-estreito reveal">
    <p class="eyebrow centro"><?= e($A['eyebrow']) ?></p>
    <ul class="citacoes" id="citacoes">
      <?php foreach ($A['citacoes'] as $i => [$texto, $plataforma, $quando, $traduzida]): ?>
      <li class="citacao<?= $i === 0 ? ' ativa' : '' ?>">
        <blockquote class="serif"><?= e($texto) ?></blockquote>
        <p class="citacao-origem">Opinião no <?= e($plataforma) ?> · <?= e($quando) ?><?= $traduzida ? ' · tradução' : '' ?></p>
      </li>
      <?php endforeach; ?>
    </ul>
    <p class="avaliacoes-rodape"><?= e($A['rodape']) ?></p>
  </div>
</section>
