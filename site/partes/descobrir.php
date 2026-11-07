<?php $D = $C['descobrir']; $E = $D['espacos']; ?>
<section id="descobrir" class="descobrir">

  <!-- 1. Piscina e exterior: fotografia a toda a largura -->
  <div class="banda">
    <button type="button" class="banda-foto abrir-galeria" data-galeria="<?= galeria_json($E[0]['nome'], $E[0]['fotos']) ?>" aria-label="Abrir galeria: <?= e($E[0]['nome']) ?>">
      <?= foto_img($E[0]['fotos'][0], ['class' => 'banda-img']) ?>
    </button>
    <div class="banda-texto contentor sobre-foto">
      <div class="reveal">
        <p class="eyebrow eyebrow-foto"><?= e($D['eyebrow']) ?></p>
        <h2 class="t-grande"><?= e($E[0]['titulo'] ?? $E[0]['nome']) ?></h2>
        <p class="texto-grande"><?= e($E[0]['texto']) ?></p>
      </div>
    </div>
  </div>

  <!-- 2. Alpendre -->
  <div class="contentor bloco-espaco">
    <div class="grelha-12 alinhar-centro">
      <div class="col-8 reveal">
        <button type="button" class="zoom abrir-galeria foto-3-2" data-galeria="<?= galeria_json($E[1]['nome'], $E[1]['fotos']) ?>" aria-label="<?= e($E[1]['fotos'][0]['alt']) ?> · abrir galeria">
          <?= foto_img($E[1]['fotos'][0]) ?>
        </button>
      </div>
      <div class="col-4 reveal" style="transition-delay:120ms">
        <h3 class="t-medio"><?= e($E[1]['nome']) ?></h3>
        <p class="texto-grande suave"><?= e($E[1]['texto']) ?></p>
      </div>
    </div>
  </div>

  <!-- 3. Sala e cozinha (fundo pálido) -->
  <div class="fundo-pale bloco-espaco">
    <div class="contentor">
      <div class="grelha-12 alinhar-fim">
        <div class="col-4 reveal">
          <h3 class="t-medio"><?= e($E[2]['nome']) ?></h3>
          <p class="texto-grande suave"><?= e($E[2]['texto']) ?></p>
          <?php if (!empty($E[2]['nota'])): ?><p class="nota-pequena"><?= e($E[2]['nota']) ?></p><?php endif; ?>
        </div>
        <div class="col-8 reveal" style="transition-delay:120ms">
          <button type="button" class="zoom abrir-galeria foto-3-2" data-galeria="<?= galeria_json($E[2]['nome'], $E[2]['fotos']) ?>" aria-label="<?= e($E[2]['fotos'][0]['alt']) ?> · abrir galeria">
            <?= foto_img($E[2]['fotos'][0]) ?>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- 4. Quartos e banho -->
  <div class="contentor bloco-espaco">
    <div class="grelha-12 alinhar-centro">
      <div class="col-7 col-ini-6 ordem-2 reveal">
        <button type="button" class="zoom abrir-galeria foto-4-3" data-galeria="<?= galeria_json($E[3]['nome'], $E[3]['fotos']) ?>" aria-label="<?= e($E[3]['fotos'][0]['alt']) ?> · abrir galeria">
          <?= foto_img($E[3]['fotos'][0]) ?>
        </button>
      </div>
      <div class="col-4 ordem-1 reveal" style="transition-delay:120ms">
        <h3 class="t-medio"><?= e($E[3]['nome']) ?></h3>
        <p class="texto-grande suave"><?= e($E[3]['texto']) ?></p>
      </div>
    </div>
    <div class="reveal">
      <p class="fecho serif"><?= e($D['fecho']) ?></p>
    </div>
  </div>
</section>
