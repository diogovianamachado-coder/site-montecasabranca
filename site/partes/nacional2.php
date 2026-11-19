<?php $N = $C['n2']; $L = $F['ligacoes']; ?>
<!-- Nacional 2: capítulo próprio, com o mesmo peso do de Montemor (abertura igual), a casa ao entardecer e o programa de duas noites -->
<section id="nacional2" class="capitulo capitulo-lugar" aria-labelledby="t-nacional2">
  <div class="contentor">
    <div class="reveal abertura">
      <p class="eyebrow"><?= e($N['eyebrow']) ?></p>
      <h2 id="t-nacional2" class="abertura-titulo"><?= e($N['titulo']) ?></h2>
      <div class="abertura-lado">
        <p class="texto-capitulo"><?= e($N['texto']) ?></p>
      </div>
    </div>
    <figure class="foto-larga" data-entra>
      <div class="foto-larga-caixa"><?= foto_img($N['foto'], ['draggable' => 'false']) ?></div>
    </figure><?php // sem a legenda por baixo (versão 5, 19/11/2026: «retirar as micro legendas das fotos»); a descrição fica no alt ?>
    <div class="reveal">
      <ol class="programa">
        <?php foreach ($N['programa'] as [$dia, $o]): ?>
        <li><h3><?= e($dia) ?></h3><p><?= e($o) ?></p></li>
        <?php endforeach; ?>
      </ol>
      <div class="programa-rodape">
        <p class="nota-capitulo"><?= e($N['nota']) ?></p>
        <a href="<?= e($L[$N['ligacao'][1]]) ?>" target="_blank" rel="noopener noreferrer" class="ligacao-seta"><?= e($N['ligacao'][0]) ?><?= icone('fora') ?></a>
      </div>
    </div>
  </div>
</section>
