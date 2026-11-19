<?php $M = $C['montemor']; $E = $M['ecopista']; $L = $F['ligacoes']; ?>
<!-- Montemor-o-Novo: abre com uma fotografia grande e o título por cima (versão 6, como as da versão 1); a seguir o texto e a ligação,
     e as fotografias da vila numa faixa mais pequena do que as da casa (Diogo, 19/11/2026: «nestes separadores de suporte, as fotos
     deveriam ser mais pequenas»). Depois, separada por uma linha, a Ecopista do Montado, com a sua régua pequena: as três fotografias
     da bicicleta, a começar pela do túnel de árvores («precisa de brilho e fotos … uma régua de fotos não tão grande»). -->
<section id="montemor" class="capitulo capitulo-lugar capitulo-com-banda fundo-pale com-linha" aria-labelledby="t-montemor">
  <?php $faixaVila = sem_a_grande($M['fotos'], $M['banda']); // a grande nunca se repete na faixa (versão 7) ?>
  <?= banda($M['banda'], $M['eyebrow'], $M['titulo'], 't-montemor', 'Montemor-o-Novo', $faixaVila, 'banda-media') ?>
  <div class="contentor">
    <div class="reveal abertura abertura-sem-titulo">
      <p class="texto-capitulo"><?= e($M['texto']) ?></p>
      <p class="abertura-ligacao"><a href="<?= e($L[$M['ligacao'][1]]) ?>" target="_blank" rel="noopener noreferrer" class="ligacao-seta"><?= e($M['ligacao'][0]) ?><?= icone('fora') ?></a></p>
    </div>
  </div>
  <?= fila('Montemor-o-Novo', $faixaVila) ?>
  <div class="contentor">
    <div class="reveal sub-bloco ecopista">
      <h3 class="sub-titulo"><?= e($E['titulo']) ?></h3>
      <div class="sub-texto">
        <p class="texto-capitulo"><?= e($E['texto']) ?></p>
        <p class="abertura-ligacao"><a href="<?= e($L[$E['ligacao'][1]]) ?>" target="_blank" rel="noopener noreferrer" class="ligacao-seta"><?= e($E['ligacao'][0]) ?><?= icone('fora') ?></a></p>
      </div>
    </div>
  </div>
  <?= regua_pequena($E['titulo'], $E['fotos']) ?>
</section>
