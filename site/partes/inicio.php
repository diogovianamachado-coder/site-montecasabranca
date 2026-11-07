<?php $I = $C['inicio']; ?>
<section id="inicio" class="hero">
  <?= foto_img($I['foto'], ['class' => 'hero-foto', 'fetchpriority' => 'high', 'id' => 'hero-foto'], false) ?>
  <div class="hero-shade"></div>
  <header class="hero-topo contentor">
    <a href="#inicio" class="logo logo-hero" aria-label="<?= e($F['nome']) ?>"></a>
    <nav class="hero-nav" aria-label="Secções">
      <?php foreach (array_slice($C['menu'], 0, 5) as [$t, $h]): ?><a href="<?= e($h) ?>"><?= e($t) ?></a><?php endforeach; ?>
    </nav>
  </header>
  <div class="hero-texto contentor">
    <h1 class="entrada"><?= e($I['titulo'][0]) ?><br><?= e($I['titulo'][1]) ?></h1>
    <p class="hero-sub entrada"><?= e($I['subtitulo']) ?></p>
    <ul class="etiquetas entrada">
      <?php foreach ($I['etiquetas'] as [$ic, $t]): ?>
      <li><?= icone($ic) ?><?= e($t) ?></li>
      <?php endforeach; ?>
    </ul>
    <div class="hero-botoes entrada">
      <a href="<?= e($I['botao'][1]) ?>" class="btn btn-foto"><?= e($I['botao'][0]) ?></a>
    </div>
    <p class="hero-nota serif"><?= e($I['nota']) ?></p>
  </div>
  <a href="#casa" class="hero-descer" aria-label="Descer para a secção seguinte"><?= icone('baixo') ?></a>
</section>
