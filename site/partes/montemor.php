<?php $M = $C['montemor']; $E = $M['ecopista']; $L = $F['ligacoes']; ?>
<!-- Montemor-o-Novo: capítulo com abertura própria (sobretítulo, título, texto e ligação), as fotografias da vila em sequência e,
     separada por uma linha, a Ecopista do Montado. O fundo pálido e a linha de cima separam-no do fecho da casa. -->
<section id="montemor" class="capitulo capitulo-lugar fundo-pale com-linha" aria-labelledby="t-montemor">
  <div class="contentor">
    <div class="reveal abertura">
      <p class="eyebrow"><?= e($M['eyebrow']) ?></p>
      <h2 id="t-montemor" class="abertura-titulo"><?= e($M['titulo']) ?></h2>
      <div class="abertura-lado">
        <p class="texto-capitulo"><?= e($M['texto']) ?></p>
        <p class="abertura-ligacao"><a href="<?= e($L[$M['ligacao'][1]]) ?>" target="_blank" rel="noopener noreferrer" class="ligacao-seta"><?= e($M['ligacao'][0]) ?><?= icone('fora') ?></a></p>
      </div>
    </div>
  </div>
  <?= sequencia('Montemor-o-Novo', $M['fotos']) ?>
  <div class="contentor">
    <div class="reveal sub-bloco">
      <h3 class="sub-titulo"><?= e($E['titulo']) ?></h3>
      <div class="sub-texto">
        <p class="texto-capitulo"><?= e($E['texto']) ?></p>
        <p class="abertura-ligacao"><a href="<?= e($L[$E['ligacao'][1]]) ?>" target="_blank" rel="noopener noreferrer" class="ligacao-seta"><?= e($E['ligacao'][0]) ?><?= icone('fora') ?></a></p>
      </div>
    </div>
  </div>
</section>
