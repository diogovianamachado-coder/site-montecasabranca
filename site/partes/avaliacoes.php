<?php $A = $C['avaliacoes']; $NOTAS = $F['notas'] ?? ['lista' => [], 'data' => ''];   // «$N» é da Nacional 2, em montemor.php ?>
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
    <?php if ($NOTAS['lista']): // as três notas (inc/factos.php → 'notas'): um anel que se enche até à nota, a plataforma e em quantas opiniões assenta.
      // Só as notas: não abrem os anúncios nem levam a lado nenhum (Diogo, 15/11/2026: «não quero links para as plataformas»). ?>
    <ul class="notas" aria-label="<?= e($A['notas_titulo']) ?>">
      <?php foreach ($NOTAS['lista'] as $n): $escala = str_replace('{escala}', $n['escala'], $A['nota_escala']);
        $parte = min(100, max(0, round(100 * (float)str_replace(',', '.', $n['nota']) / (float)$n['escala'], 1))); ?>
      <li class="nota">
        <span class="nota-anel">
          <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><circle class="nota-trilho" cx="50" cy="50" r="46"/><circle class="nota-arco" cx="50" cy="50" r="46" pathLength="100" stroke-dasharray="<?= e((string)$parte) ?> 100"/></svg>
          <span class="nota-valor serif"><?= e($n['nota']) ?></span>
          <span class="nota-escala"><?= e($escala) ?></span>
        </span>
        <span class="nota-onde"><?= e($n['plataforma']) ?></span>
        <span class="nota-base"><?= e($n['base']) ?></span>
      </li>
      <?php endforeach; ?>
    </ul>
    <?php endif; ?>
    <p class="avaliacoes-rodape"><?= e($A['rodape'] . ($NOTAS['lista'] && $NOTAS['data'] !== '' ? ' · ' . str_replace('{data}', $NOTAS['data'], $A['rodape_notas']) : '')) ?></p>
  </div>
</section>
