<?php $M = $C['montemor']; ?>
<section id="montemor" class="montemor">
  <div class="banda banda-media">
    <?= foto_img($M['foto'], ['class' => 'banda-img']) ?>
    <div class="banda-texto contentor sobre-foto">
      <div class="reveal">
        <p class="eyebrow eyebrow-foto"><?= e($M['eyebrow']) ?></p>
        <h2 class="t-grande"><?= e($M['titulo']) ?></h2>
      </div>
    </div>
  </div>
  <div class="contentor bloco-espaco">
    <div class="grelha-12">
      <div class="col-5 reveal">
        <ul class="distancias">
          <?php foreach ($F['distancias'] as $d): ?>
          <li><span><?= e($d['lugar']) ?></span><span class="suave"><?= e($d['valor']) ?></span></li>
          <?php endforeach; ?>
        </ul>
        <a href="<?= e($F['ligacoes']['maps']) ?>" target="_blank" rel="noopener noreferrer" class="btn btn-contorno primario mt-8"><?= icone('mapa') ?><?= e($M['botao_mapa']) ?></a>
      </div>
      <div class="col-6 col-ini-7 blocos-lugar">
        <?php foreach ($M['blocos'] as $k => $b): ?>
        <div class="reveal<?= $k > 0 ? ' bloco-destacado' : '' ?>"<?= $k > 0 ? ' style="transition-delay:120ms"' : '' ?>>
          <h3 class="t-pequeno"<?= $b['id'] ? ' id="' . e($b['id']) . '"' : '' ?>><?= e($b['titulo']) ?></h3>
          <p class="texto-grande suave"><?= e($b['texto']) ?></p>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>
