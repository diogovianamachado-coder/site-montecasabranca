<?php $A = $C['antes']; // $PERGUNTAS vem do index.php (com a hora da saída tardia já no texto) ?>
<section id="antes-de-chegar" class="perguntas contentor">
  <div class="grelha-12 reveal">
    <div class="col-5">
      <p class="eyebrow"><?= e($A['eyebrow']) ?></p>
      <h2 class="t-grande antes-titulo"><?= e($A['titulo']) ?></h2>
    </div>
    <div class="col-7 acordeao">
      <?php foreach ($PERGUNTAS as [$p, $r]): ?>
      <details class="pergunta">
        <summary><span><?= e($p) ?></span><?= icone('mais', 'ico ico-mais') ?></summary>
        <div class="resposta"><p><?= e($r) ?></p></div>
      </details>
      <?php endforeach; ?>
    </div>
  </div>
</section>
