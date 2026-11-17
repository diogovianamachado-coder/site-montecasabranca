<?php $A = $C['avaliacoes']; $NOTAS = $F['notas'] ?? ['lista' => [], 'data' => '']; ?>
<!-- Quem já ficou: uma frase curta de cada vez (rodam sozinhas; um toque passa à seguinte). Todas estão no HTML.
     Sem contagem («02 / 10») por baixo: o Diogo não quer números de avaliações à vista (15/11/2026) e a nota 13 pede ligeireza. -->
<section id="avaliacoes" class="avaliacoes" aria-labelledby="t-avaliacoes">
  <div class="contentor contentor-largo">
    <div class="reveal">
      <h2 id="t-avaliacoes" class="eyebrow centro"><?= e($A['eyebrow']) ?></h2>
      <ul class="citacoes" id="citacoes">
        <?php foreach ($A['citacoes'] as $i => [$texto, $plataforma, $quando, $traduzida]): ?>
        <li class="citacao<?= $i === 0 ? ' ativa' : '' ?>">
          <blockquote class="serif"><?= e($texto) ?></blockquote>
          <p class="citacao-origem"><?= e($plataforma) ?> · <?= e($quando) ?><?= $traduzida ? ' · tradução' : '' ?></p>
        </li>
        <?php endforeach; ?>
      </ul>
    </div>
    <?php if ($NOTAS['lista']): // as três notas (inc/factos.php → 'notas'): um anel fino que se enche até à nota e o nome da plataforma.
      // Só a nota, a escala e o nome: sem ligações e sem o número de avaliações (Diogo, 15/11/2026). ?>
    <ul class="notas reveal" aria-label="<?= e($A['notas_titulo']) ?>">
      <?php $volta = 2 * M_PI * 46;   // o perímetro do anel (raio 46): o arco vai escrito nesta medida (e o intervalo, 600, é maior do que duas voltas)
      foreach ($NOTAS['lista'] as $n): $escala = str_replace('{escala}', $n['escala'], $A['nota_escala']);
        $parte = min(1, max(0, (float)str_replace(',', '.', $n['nota']) / (float)$n['escala'])); ?>
      <li class="nota">
        <span class="nota-anel">
          <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><circle class="nota-trilho" cx="50" cy="50" r="46"/><circle class="nota-arco" cx="50" cy="50" r="46" stroke-dasharray="<?= e(number_format($parte * $volta, 2, '.', '')) ?> 600"/></svg>
          <span class="nota-valor serif"><?= e($n['nota']) ?></span>
          <span class="nota-escala"><?= e($escala) ?></span>
        </span>
        <span class="nota-onde"><?= e($n['plataforma']) ?></span>
      </li>
      <?php endforeach; ?>
    </ul>
    <?php endif; ?>
    <p class="avaliacoes-rodape"><?= e($A['rodape'] . ($NOTAS['lista'] && $NOTAS['data'] !== '' ? ' · ' . str_replace('{data}', $NOTAS['data'], $A['rodape_notas']) : '')) ?></p>
  </div>
</section>
