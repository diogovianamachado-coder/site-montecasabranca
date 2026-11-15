<?php $K = $C['contactos']; $m = $F['morada']; ?>
<footer id="contactos" class="contactos">
  <div class="contentor">
    <div class="reveal">
      <p class="eyebrow eyebrow-foto"><?= e($K['eyebrow']) ?></p>
      <h2 class="t-grande contactos-titulo"><?= e($K['titulo']) ?></h2>
      <p class="contactos-texto"><?= e($K['texto']) ?></p>
      <ul class="contactos-lista">
        <li><a href="<?= e($F['ligacoes']['whatsapp']) ?>" target="_blank" rel="noopener noreferrer"><?= icone('whatsapp') ?><?= e($F['telefone']) ?></a></li>
        <li><a href="mailto:<?= e($F['email']) ?>"><?= icone('email') ?><?= e($F['email']) ?></a></li>
        <li><a href="<?= e($F['ligacoes']['instagram']) ?>" target="_blank" rel="noopener noreferrer"><?= icone('instagram') ?><?= e($F['instagram_handle']) ?></a></li>
      </ul>
    </div>
    <div class="contactos-rodape">
      <a href="#inicio" class="logo logo-rodape" aria-label="<?= e($F['nome']) ?>"></a>
      <div class="contactos-linhas">
        <p class="rodape-linha"><?= e($K['rodape']) ?></p>
        <!-- Identificação legal e morada completa (o único sítio da página onde aparece), em letra pequena; e as três plataformas -->
        <p class="legal"><?= e($F['firma']) ?> · <?= e($m['rua']) ?>, <?= e($m['localidade']) ?>, <?= e($m['codigo_postal']) ?> <?= e($m['concelho']) ?>
          · <a href="<?= e($F['ligacoes']['airbnb']) ?>" target="_blank" rel="noopener noreferrer">Airbnb</a> · <a href="<?= e($F['ligacoes']['booking']) ?>" target="_blank" rel="noopener noreferrer">Booking</a> · <a href="<?= e($F['ligacoes']['vrbo']) ?>" target="_blank" rel="noopener noreferrer">Vrbo</a></p>
        <?php if (!empty($ENSAIO_VERSAO)): // só no ensaio: o número da versão publicada (docs/versoes/REGISTO.md)
          $dv = DateTimeImmutable::createFromFormat('!Y-m-d', $ENSAIO_VERSAO['data']); ?>
        <p class="legal versao-ensaio" id="versao-ensaio">Ensaio · versão <?= (int)$ENSAIO_VERSAO['numero'] ?><?= $dv ? ' · ' . e($dv->format('d/m/Y')) : '' ?></p>
        <?php endif; ?>
      </div>
    </div>
  </div>
</footer>
