<section id="perguntas" class="perguntas contentor-estreito">
  <div class="reveal">
    <h2 class="t-grande">Perguntas frequentes</h2>
    <div class="acordeao">
      <?php foreach ($C['perguntas'] as $i => [$p, $r]): ?>
      <details class="pergunta"<?= $i === 0 ? '' : '' ?>>
        <summary><span><?= e($p) ?></span><?= icone('mais', 'ico ico-mais') ?></summary>
        <div class="resposta"><p><?= e($r) ?></p></div>
      </details>
      <?php endforeach; ?>
    </div>
  </div>
</section>
