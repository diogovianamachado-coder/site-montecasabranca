<?php $A = $C['avaliacoes']; $cit = $A['citacao'] ?? $F['avaliacao_airbnb_2023']; ?>
<section id="avaliacoes" class="avaliacoes fundo-areia">
  <div class="contentor-estreito reveal">
    <p class="eyebrow centro"><?= e($A['eyebrow']) ?></p>
    <figure class="citacao">
      <span aria-hidden="true" class="aspas serif">“</span>
      <blockquote class="serif" id="avaliacao-texto"><?= e($cit) ?></blockquote>
      <figcaption id="avaliacao-assinatura"><?= e($A['assinatura']) ?></figcaption>
    </figure>
    <p class="avaliacoes-rodape"><?= e($A['rodape']) ?></p>
  </div>
</section>
