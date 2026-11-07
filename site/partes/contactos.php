<?php $K = $C['contactos']; $m = $F['morada']; ?>
<footer id="contactos" class="contactos">
  <div class="contentor">
    <div class="reveal">
      <h2 class="t-medio"><?= e($K['titulo']) ?></h2>
      <p class="contactos-texto"><?= e($K['texto']) ?></p>
      <ul class="contactos-lista">
        <li><a href="<?= e($F['ligacoes']['whatsapp']) ?>" target="_blank" rel="noopener noreferrer"><?= icone('whatsapp') ?><?= e($F['telefone']) ?></a></li>
        <li><a href="mailto:<?= e($F['email']) ?>"><?= icone('email') ?><?= e($F['email']) ?></a></li>
        <li><a href="<?= e($F['ligacoes']['instagram']) ?>" target="_blank" rel="noopener noreferrer"><?= icone('instagram') ?><?= e($F['instagram_handle']) ?></a></li>
      </ul>
    </div>
    <div class="contactos-rodape">
      <a href="#inicio" class="logo logo-rodape" aria-label="<?= e($F['nome']) ?>"></a>
      <p class="legal"><?= e($F['nome']) ?> · <?= e($m['rua']) ?>, <?= e($m['localidade']) ?>, <?= e($m['codigo_postal']) ?> <?= e($m['concelho']) ?> · Registo <?= e($F['registo_al']) ?> · © <?= e($F['nome']) ?>
        · <a href="<?= e($F['ligacoes']['airbnb']) ?>" target="_blank" rel="noopener noreferrer">Airbnb</a> · <a href="<?= e($F['ligacoes']['booking']) ?>" target="_blank" rel="noopener noreferrer">Booking</a> · <a href="<?= e($F['ligacoes']['vrbo']) ?>" target="_blank" rel="noopener noreferrer">Vrbo</a></p>
    </div>
  </div>
</footer>
