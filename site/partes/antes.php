<?php $A = $C['antes']; // $PERGUNTAS vem do index.php (com a hora da saída tardia já no texto) ?>
<!-- Antes de chegar: as perguntas, numa coluna estreita. Abre-se uma de cada vez (onde o browser já o sabe fazer sozinho). -->
<section id="antes-de-chegar" class="antes fundo-pale" aria-labelledby="t-antes">
  <div class="contentor contentor-leitura">
    <div class="reveal">
      <p class="eyebrow"><?= e($A['eyebrow']) ?></p>
      <h2 id="t-antes" class="antes-titulo"><?= e($A['titulo']) ?></h2>
    </div>
    <div class="acordeao">
      <?php foreach ($PERGUNTAS as [$p, $r]): ?>
      <details class="pergunta" name="antes-de-chegar">
        <summary><span class="serif"><?= e($p) ?></span><?= icone('baixo', 'ico ico-abre') ?></summary>
        <div class="resposta"><p><?= e($r) ?></p></div>
      </details>
      <?php endforeach; ?>
    </div>
  </div>
</section>
