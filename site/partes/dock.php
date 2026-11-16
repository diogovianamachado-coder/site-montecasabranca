<?php $Dk = $C['dock']; $Dp = $C['disponibilidade']; ?>
<!-- Barra fixa em baixo (aparece depois da capa): Menu · Contacto · Verificar disponibilidade -->
<div class="dock" id="dock" aria-hidden="true">
  <div class="dock-interior">
    <button type="button" class="dock-menu" id="abrir-menu" aria-label="Abrir menu"><?= icone('menu') ?><?= e($Dk['menu']) ?></button>
    <a href="<?= e($F['ligacoes']['whatsapp']) ?>" target="_blank" rel="noopener noreferrer" class="dock-contacto" aria-label="Falar no WhatsApp"><?= icone('whatsapp') ?><span><?= e($Dk['contacto']) ?></span></a>
    <button type="button" class="btn btn-primario dock-datas" id="abrir-disponibilidade"><?= e($Dk['disponibilidade']) ?></button>
  </div>
</div>

<!-- Menu de ecrã inteiro. Não mexe na rolagem da página: cobre-a por inteiro e rola por dentro (site.css, «Menu»). -->
<div class="menu-ecra" id="menu" hidden role="dialog" aria-modal="true" aria-label="Menu">
  <div class="menu-dentro">
    <div class="menu-topo">
      <a href="#inicio" class="logo logo-menu" aria-label="<?= e($F['nome']) ?>"></a>
      <button type="button" class="btn-redondo" data-fechar="menu" aria-label="Fechar menu"><?= icone('fechar') ?></button>
    </div>
    <nav class="menu-lista" aria-label="Menu">
      <?php foreach ($C['menu'] as $item): ?>
      <div class="menu-item">
        <a href="<?= e($item[1]) ?>" class="menu-ligacao serif"><?= e($item[0]) ?></a>
        <?php if (!empty($item['sub'])): ?>
        <p class="menu-sub"><?php foreach ($item['sub'] as [$t, $h]): ?><a href="<?= e($h) ?>"><?= e($t) ?></a><?php endforeach; ?></p>
        <?php endif; ?>
      </div>
      <?php endforeach; ?>
    </nav>
    <div class="menu-rodape">
      <a href="<?= e($F['ligacoes']['whatsapp']) ?>" target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <a href="mailto:<?= e($F['email']) ?>"><?= e($F['email']) ?></a>
    </div>
  </div>
</div>

<!-- Painel «Verificar disponibilidade». O véu (o escuro por trás) é um irmão do painel: apanha os toques fora dele. -->
<div class="painel-fundo" id="disponibilidade" hidden>
  <div class="painel-veu" data-fechar="disponibilidade" aria-hidden="true"></div>
  <div class="painel" role="dialog" aria-modal="true" aria-labelledby="disp-titulo">
    <div class="painel-cabeca">
      <div>
        <p class="eyebrow"><?= e($Dp['eyebrow']) ?></p>
        <h2 id="disp-titulo" class="painel-titulo"><?= e($Dp['titulo']) ?></h2>
      </div>
      <button type="button" class="btn-redondo" data-fechar="disponibilidade" aria-label="Fechar"><?= icone('fechar') ?></button>
    </div>
    <p class="painel-texto"><?= e($Dp['texto']) ?></p>

    <div class="calendario" id="calendario">
      <div class="calendario-nav">
        <button type="button" class="btn-redondo btn-seta" id="cal-antes" aria-label="Meses anteriores"><?= icone('esq') ?></button>
        <button type="button" class="btn-redondo btn-seta" id="cal-depois" aria-label="Meses seguintes"><?= icone('dir') ?></button>
      </div>
      <div class="meses" id="meses" aria-live="polite"></div>
      <p class="legenda"><span><i class="q q-livre"></i><?= e($Dp['legenda_livre']) ?></span><span><i class="q q-ocupado"></i><?= e($Dp['legenda_ocupado']) ?></span><span><i class="q q-escolhido"></i><?= e($Dp['legenda_escolhido']) ?></span></p>
      <p class="nota-pequena" id="cal-nota"><?= e($Dp['nota_calendario']) ?></p>
    </div>

    <div class="simulador">
      <h3 class="painel-subtitulo"><?= e($Dp['simular']) ?></h3>
      <form id="form-simular" class="campos" autocomplete="off">
        <label><?= e($Dp['chegada']) ?><input type="date" name="entrada" id="entrada" required></label>
        <label><?= e($Dp['partida']) ?><input type="date" name="saida" id="saida" required></label>
        <label class="largo"><?= e($Dp['pessoas']) ?>
          <select name="pax" id="pax"><?php for ($i = 1; $i <= $F['capacidade']; $i++): ?><option value="<?= $i ?>"<?= $i === 4 ? ' selected' : '' ?>><?= $i ?></option><?php endfor; ?></select>
        </label>
      </form>
      <p class="nota-pequena nota-casa"><?= e($Dp['nota_casa']) ?></p>
      <div class="conta" id="conta" aria-live="polite"><p class="conta-msg serif"><?= e($Dp['conta_vazia']) ?></p></div>
      <ul class="avisos" id="avisos"></ul>
    </div>

    <div class="tempo" id="tempo" hidden>
      <div class="tempo-cabeca">
        <h3 class="forte"><?= e($Dp['tempo']) ?></h3>
        <p class="nota-pequena"><?= e($Dp['fonte_tempo']) ?></p>
      </div>
      <p class="tempo-nota" id="tempo-nota"><?= e($Dp['tempo_proximos']) ?></p>
      <ul class="tempo-dias" id="tempo-dias"></ul>
    </div>

    <form id="form-pedido" class="pedido" hidden>
      <h3 class="painel-subtitulo"><?= e($Dp['pedir_titulo']) ?></h3>
      <div class="campos campos-pedido">
        <label>Nome<input type="text" name="nome" required maxlength="120" autocomplete="name"></label>
        <label>Email<input type="email" name="email" required maxlength="160" autocomplete="email" inputmode="email"></label>
        <!-- O que é opcional fica recolhido no telemóvel, para o pedido ser leve: abre com um toque (Diogo, 15/11/2026: «as pessoas
             não querem ver um ecrã inteiro com 3 botões e 4 caixas de texto»). No computador está sempre aberto (site.js e site.css). -->
        <details class="campos-mais largo" id="pedido-mais" open>
          <summary><?= icone('mais', 'ico ico-mais') ?><span><?= e($Dp['mais_campos']) ?></span></summary>
          <div class="campos-mais-dentro">
            <label>Telefone <span class="suave">(opcional)</span><input type="tel" name="telefone" maxlength="40" autocomplete="tel"></label>
            <label>Mensagem <span class="suave">(opcional)</span><textarea name="mensagem" rows="3" maxlength="1000"></textarea></label>
          </div>
        </details>
        <input type="text" name="armadilha" class="armadilha" tabindex="-1" autocomplete="off" aria-hidden="true">
      </div>
      <p class="pedido-estado" id="pedido-estado" aria-live="polite"></p>
      <div class="botoes-pedido">
        <button type="submit" class="btn btn-primario" id="enviar-pedido"><?= e($Dp['pedir']) ?></button>
        <a href="#" class="btn btn-contorno" id="pedido-whatsapp" target="_blank" rel="noopener noreferrer"><?= icone('whatsapp') ?>WhatsApp</a>
        <a href="#" class="btn btn-contorno" id="pedido-email"><?= icone('email') ?>Email</a>
      </div>
    </form>

    <p class="nota-pequena painel-nota"><?= e($Dp['nota_preco']) ?></p>
  </div>
</div>

<!-- Fotografia em ecrã inteiro -->
<div class="galeria" id="galeria-ecra" hidden role="dialog" aria-modal="true" aria-label="Fotografia">
  <div class="galeria-topo">
    <p class="galeria-contador" id="galeria-contador"></p>
    <button type="button" class="btn-redondo claro" data-fechar="galeria-ecra" aria-label="Fechar"><?= icone('fechar') ?></button>
  </div>
  <div class="galeria-corpo"><img id="galeria-img" alt="" draggable="false"></div>
  <div class="galeria-pe">
    <button type="button" class="btn-redondo claro" id="galeria-antes" aria-label="Fotografia anterior"><?= icone('esq') ?></button>
    <p class="galeria-legenda" id="galeria-legenda"></p>
    <button type="button" class="btn-redondo claro" id="galeria-depois" aria-label="Próxima fotografia"><?= icone('dir') ?></button>
  </div>
</div>

<!-- Textos do painel para o site.js (vêm do conteudo.php) -->
<script type="application/json" id="textos"><?= json_encode(array_merge($Dp, ['hora_saida_tardia' => $F['saida_tardia']]), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP) ?></script>
