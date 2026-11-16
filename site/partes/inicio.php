<?php $I = $C['inicio']; // $CAPA, $capaChave e $capaEstudo vêm do index.php ?>
<!-- Capa: a opção 1 escolhida pelo Diogo a 15/11/2026 (fotografia 1, título no céu, quase sem máscara) -->
<section id="inicio" class="hero hero-<?= e($CAPA['mascara']) ?> hero-titulo-<?= e($CAPA['titulo']) ?>">
  <div class="hero-fundo"><?= foto_img($CAPA['foto'], ['class' => 'hero-foto', 'fetchpriority' => 'high', 'id' => 'hero-foto', 'draggable' => 'false'], false) ?></div>
  <div class="hero-shade" aria-hidden="true"></div>
  <header class="hero-topo contentor">
    <a href="#inicio" class="logo logo-hero" aria-label="<?= e($F['nome']) ?>"></a>
    <nav class="hero-nav" aria-label="Secções">
      <?php foreach ($C['menu_topo'] as [$t, $h]): ?><a href="<?= e($h) ?>"><?= e($t) ?></a><?php endforeach; ?>
    </nav>
  </header>
  <div class="hero-texto contentor">
    <h1 class="hero-titulo"><span class="l1 entrada"><?= e($I['titulo'][0]) ?></span> <span class="l2 entrada"><?= e($I['titulo'][1]) ?></span></h1>
    <p class="hero-sub entrada"><?= e($I['subtitulo']) ?></p>
    <ul class="etiquetas entrada">
      <?php foreach ($I['etiquetas'] as [$ic, $t]): ?>
      <li><?= icone($ic) ?><?= e($t) ?></li>
      <?php endforeach; ?>
    </ul>
    <div class="hero-botoes entrada">
      <a href="<?= e($I['botao'][1]) ?>" class="btn btn-foto"><?= e($I['botao'][0]) ?></a>
      <p class="hero-nota serif"><?= e($I['nota']) ?></p>
    </div>
  </div>
  <a href="#a-casa" class="hero-descer" aria-label="Descer para a casa"><?= icone('baixo') ?></a>
  <?php if ($capaEstudo): // estudo da capa: só no ensaio e só com ?capa= no endereço ?>
  <nav class="estudo-capa" aria-label="Estudo da capa">
    <span>Capa</span>
    <?php foreach ($I['capas'] as $k => $c): ?><a href="?capa=<?= e((string)$k) ?>" title="<?= e($c['nome']) ?>"<?= (string)$k === $capaChave ? ' aria-current="true"' : '' ?>><?= e((string)$k) ?></a><?php endforeach; ?>
  </nav>
  <?php endif; ?>
</section>
