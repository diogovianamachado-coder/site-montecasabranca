<?php $G = $C['galeria']; $albuns = array_values(array_filter($G['albuns'], fn($a) => !empty($a['fotos']))); ?>
<!-- Passear pelo Monte: os álbuns do Zenfolio, pela mesma ordem. Cada caixa tem a altura escrita na folha de estilos. -->
<section id="galeria" class="passear" aria-labelledby="t-galeria">
  <div class="contentor">
    <div class="reveal">
      <?php if (!empty($G['eyebrow'])): ?><p class="eyebrow"><?= e($G['eyebrow']) ?></p><?php endif; ?>
      <h2 id="t-galeria" class="passear-titulo"><?= e($G['titulo']) ?></h2>
    </div>
    <div class="separadores" role="tablist" aria-label="Álbuns">
      <?php foreach ($albuns as $i => $al): ?>
      <button type="button" role="tab" id="sep-<?= $i ?>" aria-controls="album-<?= $i ?>" aria-selected="<?= $i === 0 ? 'true' : 'false' ?>" class="separador<?= $i === 0 ? ' ativo' : '' ?>">
        <?= e($al['nome']) ?> <span class="contagem">· <?= count($al['fotos']) ?></span>
      </button>
      <?php endforeach; ?>
    </div>
    <?php foreach ($albuns as $i => $al): ?>
    <ul id="album-<?= $i ?>" role="tabpanel" aria-labelledby="sep-<?= $i ?>" class="album<?= $i === 0 ? '' : ' escondido' ?>" data-galeria="<?= galeria_json($al['nome'], $al['fotos']) ?>">
      <?php foreach ($al['fotos'] as $j => $f): ?>
      <li><button type="button" class="foto-botao abrir-galeria" data-inicio="<?= $j ?>" aria-label="<?= e($f['alt']) ?> · abrir a fotografia"><?= foto_img($f, ['draggable' => 'false']) ?></button></li>
      <?php endforeach; ?>
    </ul>
    <?php endforeach; ?>
  </div>
</section>
