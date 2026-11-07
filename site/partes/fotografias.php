<?php $G = $C['fotografias']; $albuns = array_values(array_filter($G['albuns'], fn($a) => !empty($a['fotos']))); ?>
<section id="fotografias" class="fotografias contentor">
  <h2 class="t-grande"><?= e($G['titulo']) ?></h2>
  <div class="separadores" role="tablist" aria-label="Álbuns">
    <?php foreach ($albuns as $i => $al): ?>
    <button type="button" role="tab" id="sep-<?= $i ?>" aria-controls="album-<?= $i ?>" aria-selected="<?= $i === 0 ? 'true' : 'false' ?>" class="separador<?= $i === 0 ? ' ativo' : '' ?>">
      <?= e($al['nome']) ?> <span class="contagem">· <?= count($al['fotos']) ?></span>
    </button>
    <?php endforeach; ?>
  </div>
  <?php foreach ($albuns as $i => $al): ?>
  <ul id="album-<?= $i ?>" role="tabpanel" aria-labelledby="sep-<?= $i ?>" class="album<?= $i === 0 ? '' : ' escondido' ?>">
    <?php foreach ($al['fotos'] as $j => $f): ?>
    <li>
      <button type="button" class="zoom abrir-galeria foto-4-3" data-galeria="<?= galeria_json($al['nome'], $al['fotos']) ?>" data-inicio="<?= $j ?>" aria-label="<?= e($f['alt']) ?> · abrir galeria">
        <?= foto_img($f) ?>
      </button>
    </li>
    <?php endforeach; ?>
  </ul>
  <?php endforeach; ?>
</section>
