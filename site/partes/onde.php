<?php $O = $C['onde']; ?>
<!-- Onde estamos: as distâncias e o mapa, numa faixa própria (cor de oliva), a fechar os dois capítulos do lugar -->
<section id="onde" class="onde" aria-labelledby="t-onde">
  <div class="contentor">
    <div class="reveal onde-grelha">
      <h2 id="t-onde" class="onde-titulo"><?= e($O['titulo']) ?></h2>
      <div class="onde-lado">
        <ul class="distancias">
          <?php foreach ($F['distancias'] as $d): ?>
          <li><span><?= e($d['lugar']) ?></span><span><?= e($d['valor']) ?></span></li>
          <?php endforeach; ?>
        </ul>
        <a href="<?= e($F['ligacoes']['maps']) ?>" target="_blank" rel="noopener noreferrer" class="btn btn-foto onde-botao"><?= icone('mapa') ?><?= e($O['botao_mapa']) ?></a>
      </div>
    </div>
  </div>
</section>
