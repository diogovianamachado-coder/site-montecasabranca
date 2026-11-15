<?php $M = $C['montemor']; $N = $M['n2']; $L = $F['ligacoes']; ?>
<section id="montemor" class="montemor">

  <!-- As fotografias de Montemor rolam aqui mesmo, com o título por cima -->
  <div class="banda banda-rolo banda-media">
    <?= rolo('Montemor-o-Novo', $M['fotos'], ['principal' => true, 'legendas' => true, 'classe' => 'rolo-banda']) ?>
    <div class="banda-texto contentor sobre-foto">
      <div class="reveal">
        <p class="eyebrow eyebrow-foto"><?= e($M['eyebrow']) ?></p>
        <h2 class="t-grande"><?= e($M['titulo']) ?></h2>
      </div>
    </div>
  </div>

  <div class="contentor bloco-espaco">
    <div class="grelha-12 lugar">
      <div class="lugar-texto blocos-lugar">

        <div class="reveal">
          <p class="texto-grande lugar-abertura"><?= e($M['texto']) ?></p>
          <p class="ligacoes-fora"><a href="<?= e($L[$M['ligacao'][1]]) ?>" target="_blank" rel="noopener" class="ligacao-fora"><?= e($M['ligacao'][0]) ?><?= icone('fora') ?></a></p>
          <p class="texto-grande suave"><?= e($M['ecopista']['texto']) ?></p>
          <p class="ligacoes-fora"><a href="<?= e($L[$M['ecopista']['ligacao'][1]]) ?>" target="_blank" rel="noopener" class="ligacao-fora"><?= e($M['ecopista']['ligacao'][0]) ?><?= icone('fora') ?></a></p>
        </div>

        <!-- Nacional 2: o programa de duas noites -->
        <div class="reveal bloco-destacado" id="nacional2">
          <p class="eyebrow"><?= e($N['eyebrow']) ?></p>
          <h3 class="t-medio n2-titulo"><?= e($N['titulo']) ?></h3>
          <p class="texto-grande suave"><?= e($N['texto']) ?></p>
          <ol class="programa">
            <?php foreach ($N['programa'] as [$dia, $o]): ?>
            <li><span class="programa-dia"><?= e($dia) ?></span><span><?= e($o) ?></span></li>
            <?php endforeach; ?>
          </ol>
          <p class="nota-pequena"><?= e($N['nota']) ?></p>
          <p class="ligacoes-fora"><a href="<?= e($L[$N['ligacao'][1]]) ?>" target="_blank" rel="noopener" class="ligacao-fora"><?= e($N['ligacao'][0]) ?><?= icone('fora') ?></a></p>
        </div>
      </div>

      <!-- Onde estamos: as distâncias e o mapa -->
      <div class="lugar-onde reveal" id="onde" style="transition-delay:120ms">
        <p class="eyebrow"><?= e($M['onde']['eyebrow']) ?></p>
        <ul class="distancias">
          <?php foreach ($F['distancias'] as $d): ?>
          <li><span><?= e($d['lugar']) ?></span><span class="suave"><?= e($d['valor']) ?></span></li>
          <?php endforeach; ?>
        </ul>
        <a href="<?= e($L['maps']) ?>" target="_blank" rel="noopener" class="btn btn-contorno primario mt-8"><?= icone('mapa') ?><?= e($M['onde']['botao_mapa']) ?></a>
      </div>
    </div>
  </div>
</section>
