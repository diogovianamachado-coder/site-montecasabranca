<?php $N = $C['n2']; $L = $F['ligacoes']; ?>
<!-- Nacional 2: um só bloco, como na versão 2 (versão 6; Diogo, 19/11/2026: «parecem 3 módulos diferentes … Dar importância às fotos
     e mensagem e ter o programa como acessório mais informativo»; e, sobre o arranjo da versão 2: «Tem mais lógica assim, mas
     enquadra e dimensiona como achares melhor»). O traço fino à esquerda junta tudo: o sobretítulo, o título, a mensagem, a casa ao
     entardecer em destaque (passa devagar ao rolar) e o programa pequeno, com os dias em itálico e o texto ao lado; por fim a estadia
     mínima e a ligação. No computador, a fotografia fica à direita, ao lado do texto e do programa. -->
<section id="nacional2" class="capitulo capitulo-lugar n2" aria-labelledby="t-nacional2">
  <div class="contentor">
    <div class="n2-bloco">
      <div class="n2-texto reveal">
        <p class="eyebrow"><?= e($N['eyebrow']) ?></p>
        <h2 id="t-nacional2" class="n2-titulo"><?= e($N['titulo']) ?></h2>
        <p class="n2-mensagem"><?= e($N['texto']) ?></p>
      </div>
      <figure class="n2-foto" data-mexe data-entra data-galeria="<?= galeria_json($N['titulo'], [$N['foto']]) ?>">
        <button type="button" class="foto-botao abrir-galeria" data-inicio="0" aria-label="<?= e($N['foto']['alt'] . ' · abrir a fotografia') ?>"><span class="foto-mexe"><?= foto_img($N['foto'], ['draggable' => 'false']) ?></span></button>
      </figure><?php // sem legenda por baixo (versão 5: «retirar as micro legendas das fotos»); a descrição fica no alt ?>
      <div class="n2-programa reveal">
        <ol class="programa">
          <?php foreach ($N['programa'] as [$dia, $o]): ?>
          <li><span class="programa-dia"><?= e($dia) ?></span><span class="programa-o"><?= e($o) ?></span></li>
          <?php endforeach; ?>
        </ol>
        <p class="programa-nota"><?= e($N['nota']) ?></p>
        <p class="abertura-ligacao"><a href="<?= e($L[$N['ligacao'][1]]) ?>" target="_blank" rel="noopener noreferrer" class="ligacao-seta"><?= e($N['ligacao'][0]) ?><?= icone('fora') ?></a></p>
      </div>
    </div>
  </div>
</section>
