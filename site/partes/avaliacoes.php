<?php $A = $C['avaliacoes']; $NOTAS = $F['notas'] ?? ['lista' => [], 'data' => '']; ?>
<!-- Quem já ficou: uma frase curta de cada vez (rodam sozinhas; um toque passa à seguinte). Todas estão no HTML.
     Por baixo, duas setas e um traço por frase, como nas histórias do Instagram: o da frase à vista enche-se enquanto ela está no
     ecrã, e diz que há mais e quando vem a seguinte (versão 6; Diogo, 18/11/2026: «temos de arranjar uma forma dos clientes saberem
     que há mais avaliações … e que quem visita pode ver mais»; desenhou uma seta para cada lado). As setas e o dedo para o lado
     passam a frase. Sem números (o Diogo não quer o número de avaliações à vista). -->
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
      <div class="citacoes-passar" id="citacoes-passar">
        <button type="button" class="citacoes-seta" data-passo="-1" aria-label="<?= e($A['anterior']) ?>" aria-controls="citacoes"><?= icone('esq') ?></button>
        <ol class="citacoes-tracos" aria-hidden="true"><?php foreach ($A['citacoes'] as $i => $c): ?><li<?= $i === 0 ? ' class="ativo"' : '' ?>><span></span></li><?php endforeach; ?></ol>
        <button type="button" class="citacoes-seta" data-passo="1" aria-label="<?= e($A['seguinte']) ?>" aria-controls="citacoes"><?= icone('dir') ?></button>
      </div>
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
    <p class="avaliacoes-rodape"><?= e($A['rodape']) ?></p>
  </div>
</section>
