<?php $A = $C['antes']; // $PERGUNTAS vem do index.php (com a hora da saída tardia já no texto) ?>
<!-- Antes de chegar: como na referência do Diogo (nota 10, 15/11/2026). No computador, duas colunas: à esquerda o sobretítulo e o
     título, à direita as perguntas, com um «+» que passa a «−» ao abrir. No telemóvel, uma coluna. Abre-se uma de cada vez (onde o
     browser já o sabe fazer sozinho). -->
<section id="antes-de-chegar" class="antes fundo-pale" aria-labelledby="t-antes">
  <div class="contentor antes-grelha">
    <div class="antes-cabeca reveal">
      <p class="eyebrow"><?= e($A['eyebrow']) ?></p>
      <h2 id="t-antes" class="antes-titulo"><?= e($A['titulo']) ?></h2>
    </div>
    <div class="acordeao reveal">
      <?php foreach ($PERGUNTAS as [$p, $r]): ?>
      <details class="pergunta" name="antes-de-chegar">
        <summary><span><?= e($p) ?></span><?= icone('mais', 'ico ico-abre') ?></summary>
        <div class="resposta"><p><?= e($r) ?></p></div>
      </details>
      <?php endforeach; ?>
    </div>
  </div>
</section>
