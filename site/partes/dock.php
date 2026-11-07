<?php $Dk = $C['dock']; $Dp = $C['disponibilidade']; ?>
<!-- Barra fixa em baixo (aparece depois da capa) -->
<div class="dock" id="dock" aria-hidden="true">
  <div class="contentor dock-interior">
    <button type="button" class="dock-menu" id="abrir-menu" aria-label="Abrir menu"><?= icone('menu') ?><?= e($Dk['menu']) ?></button>
    <div class="dock-direita">
      <a href="<?= e($F['ligacoes']['whatsapp']) ?>" target="_blank" rel="noopener noreferrer" class="btn btn-contorno btn-pequeno" aria-label="Falar no WhatsApp"><?= icone('whatsapp') ?><span class="so-largo"><?= e($Dk['contacto']) ?></span></a>
      <button type="button" class="btn btn-primario btn-pequeno" id="abrir-disponibilidade"><?= e($Dk['disponibilidade']) ?></button>
    </div>
  </div>
</div>

<!-- Menu de ecrã inteiro -->
<div class="menu-ecra" id="menu" hidden>
  <div class="contentor menu-topo">
    <a href="#inicio" class="logo logo-menu" aria-label="<?= e($F['nome']) ?>"></a>
    <button type="button" class="btn-redondo" data-fechar="menu" aria-label="Fechar menu"><?= icone('fechar') ?></button>
  </div>
  <nav class="contentor menu-lista" aria-label="Menu">
    <?php foreach ($C['menu'] as [$t, $h]): ?><a href="<?= e($h) ?>" class="serif"><?= e($t) ?></a><?php endforeach; ?>
  </nav>
  <div class="contentor menu-rodape">
    <a href="<?= e($F['ligacoes']['whatsapp']) ?>" target="_blank" rel="noopener noreferrer">WhatsApp</a>
    <a href="mailto:<?= e($F['email']) ?>"><?= e($F['email']) ?></a>
  </div>
</div>

<!-- Painel «Verificar disponibilidade» -->
<div class="painel-fundo" id="disponibilidade" hidden>
  <div class="painel" role="dialog" aria-modal="true" aria-labelledby="disp-titulo">
    <div class="painel-cabeca">
      <div>
        <p class="eyebrow"><?= e($Dp['eyebrow']) ?></p>
        <h2 id="disp-titulo" class="t-medio"><?= e($Dp['titulo']) ?></h2>
      </div>
      <button type="button" class="btn-redondo" data-fechar="disponibilidade" aria-label="Fechar disponibilidade"><?= icone('fechar') ?></button>
    </div>

    <div class="calendario" id="calendario" data-livre="<?= e($Dp['legenda_livre']) ?>" data-ocupado="<?= e($Dp['legenda_ocupado']) ?>">
      <div class="calendario-nav">
        <button type="button" class="btn-redondo" id="cal-antes" aria-label="Meses anteriores"><?= icone('esq') ?></button>
        <button type="button" class="btn-redondo" id="cal-depois" aria-label="Meses seguintes"><?= icone('dir') ?></button>
      </div>
      <div class="meses" id="meses" aria-live="polite"></div>
      <div class="legenda">
        <span class="legenda-itens"><span><i class="q q-livre"></i><?= e($Dp['legenda_livre']) ?></span><span><i class="q q-ocupado"></i><?= e($Dp['legenda_ocupado']) ?></span><span><i class="q q-escolhido"></i>Escolhidas</span></span>
        <span id="cal-nota"><?= e($Dp['nota_calendario']) ?></span>
      </div>
    </div>

    <div class="simulador">
      <h3 class="t-pequeno"><?= e($Dp['simular']) ?></h3>
      <form id="form-simular" class="campos" autocomplete="off">
        <label>Entrada<input type="date" name="entrada" id="entrada" required></label>
        <label>Saída<input type="date" name="saida" id="saida" required></label>
        <label class="largo">Pessoas
          <select name="pax" id="pax"><?php for ($i = 1; $i <= $F['capacidade']; $i++): ?><option value="<?= $i ?>"<?= $i === 4 ? ' selected' : '' ?>><?= $i ?></option><?php endfor; ?></select>
        </label>
      </form>
      <p class="conta serif" id="conta" aria-live="polite">Escolham as datas de entrada e saída.</p>
      <ul class="avisos" id="avisos"></ul>
      <p class="nota-pequena"><?= e($Dp['nota_preco']) ?></p>

      <form id="form-pedido" class="pedido" hidden>
        <h3 class="t-pequeno"><?= e($Dp['pedir']) ?></h3>
        <div class="campos">
          <label>Nome<input type="text" name="nome" required maxlength="120"></label>
          <label>Email<input type="email" name="email" required maxlength="160"></label>
          <label>Telefone <span class="suave">(opcional)</span><input type="tel" name="telefone" maxlength="40"></label>
          <label class="largo">Mensagem <span class="suave">(opcional)</span><textarea name="mensagem" rows="3" maxlength="1000"></textarea></label>
          <input type="text" name="armadilha" class="armadilha" tabindex="-1" autocomplete="off" aria-hidden="true">
        </div>
        <p class="pedido-estado" id="pedido-estado" aria-live="polite"></p>
        <div class="botoes-pedido">
          <button type="submit" class="btn btn-primario" id="enviar-pedido"><?= e($Dp['pedir']) ?></button>
          <a href="#" class="btn btn-contorno" id="pedido-whatsapp" target="_blank" rel="noopener noreferrer"><?= icone('whatsapp') ?>WhatsApp</a>
          <a href="#" class="btn btn-contorno" id="pedido-email"><?= icone('email') ?>Email</a>
        </div>
      </form>
    </div>

    <div class="tempo" id="tempo" hidden>
      <div class="tempo-cabeca">
        <p class="forte"><?= e($Dp['tempo']) ?></p>
        <p class="nota-pequena"><?= e($Dp['fonte_tempo']) ?></p>
      </div>
      <ul class="tempo-dias" id="tempo-dias"></ul>
    </div>
  </div>
</div>

<!-- Galeria (lightbox) -->
<div class="galeria" id="galeria" hidden role="dialog" aria-modal="true" aria-label="Galeria">
  <div class="galeria-topo">
    <p class="galeria-contador" id="galeria-contador"></p>
    <button type="button" class="btn-redondo claro" data-fechar="galeria" aria-label="Fechar galeria"><?= icone('fechar') ?></button>
  </div>
  <div class="galeria-corpo">
    <button type="button" class="btn-redondo claro galeria-seta esq" id="galeria-antes" aria-label="Fotografia anterior"><?= icone('esq') ?></button>
    <img id="galeria-img" alt="">
    <button type="button" class="btn-redondo claro galeria-seta dir" id="galeria-depois" aria-label="Próxima fotografia"><?= icone('dir') ?></button>
  </div>
  <p class="galeria-legenda" id="galeria-legenda"></p>
</div>
