#!/usr/bin/env bash
# Fotografa uma versão do site, parte a parte, para o registo de versões (docs/versoes/REGISTO.md).
#
# Uso:  bash demo/ferramentas/site/versao/fotografar.sh <N> [<ref do git>] [<pasta de saída>]
#   <N>            o número da versão (1, 2, …); as capturas vão para docs/versoes/v<N>/
#   <ref do git>   a etiqueta ou o commit dessa versão (ex.: novo-v1); sem ref, fotografa a pasta site/ tal como está agora
#   <pasta>        outra pasta de saída (para experiências)
# Precisa de php 8.1+, node e playwright (os mesmos do testar-site.sh). Não toca no servidor: monta a versão numa pasta temporária
# e fotografa-a no computador (1280) e no telemóvel (390).
#
# A versão é montada como está hoje em novo.montecasabranca.pt: sem as portas da app (#189–#192 ainda não existem), com o calendário
# de exemplo e a conta feita pelo próprio site. É isso que o Diogo vê no ensaio, e é isso que tem de ficar fotografado.
# O tempo é o de ensaio (semear-tempo.php), porque a máquina das capturas não chega ao Open-Meteo.
set -euo pipefail
RAIZ="$(cd "$(dirname "$0")/../../../.." && pwd)"; cd "$RAIZ"
N="${1:?falta o número da versão}"; REF="${2:-}"; SAIDA="${3:-$RAIZ/docs/versoes/v$N}"
[[ "$N" =~ ^[0-9]+$ ]] || { echo "o número da versão tem de ser um inteiro"; exit 2; }
PORTA=8795; TMP="$(mktemp -d)"; CACHE="$TMP/cache-ensaio"
if [ -n "$REF" ]; then git archive "$REF" site | tar -x -C "$TMP"; echo "versão $N = $REF ($(git rev-parse --short "$REF^{commit}"))"; else cp -r site "$TMP/site"; echo "versão $N = a pasta site/ tal como está agora"; fi
cat > "$TMP/site/config.php" <<PHP
<?php
// Configuração das capturas de uma versão: como no ensaio em novo.montecasabranca.pt (sem as portas da app; calendário de exemplo).
declare(strict_types=1);
return ['SITE_URL' => 'http://127.0.0.1:$PORTA', 'APP_URL' => 'http://127.0.0.1:8798', 'SITE_CHAVE' => '',
    'OCUPACAO_EXEMPLO' => true, 'CACHE_DIR' => '$CACHE', 'LINGUA' => 'pt'];
PHP
php demo/ferramentas/site/semear-tempo.php "$CACHE"
if curl -s -o /dev/null --max-time 2 "http://127.0.0.1:$PORTA/"; then echo "a porta $PORTA já está ocupada por outro servidor: pára-o e volta a correr"; exit 1; fi
php -S "127.0.0.1:$PORTA" -t "$TMP/site" > "$TMP/site.log" 2>&1 & SERVIDOR=$!      # sem subshell: o número guardado é o do próprio php
trap 'kill "$SERVIDOR" 2>/dev/null || true; rm -rf "$TMP"' EXIT
curl -s -o /dev/null --retry 20 --retry-connrefused --retry-delay 1 "http://127.0.0.1:$PORTA/"
PAGINA="$(curl -s "http://127.0.0.1:$PORTA/")"   # para uma variável: com pipefail, «curl | grep -q» falhava por o grep fechar o cano cedo
grep -q 'Monte Casa Branca' <<<"$PAGINA" || { echo "a página desta versão não abriu:"; tail -5 "$TMP/site.log"; exit 1; }
mkdir -p "$SAIDA"; find "$SAIDA" -maxdepth 1 -type f \( -name '*.jpg' -o -name 'indice.json' \) -delete   # só as capturas anteriores desta versão
node demo/ferramentas/site/versao/fotografar.cjs "http://127.0.0.1:$PORTA" "$SAIDA"
if grep -hE 'Warning|Notice|Fatal|Deprecated' "$TMP/site.log"; then echo "(avisos PHP no registo desta versão: ver acima)"; fi
# A página inteira serve só para se ver a ordem das partes: fica em miniatura.
python3 demo/ferramentas/site/versao/miniatura.py "$SAIDA/00-pagina-inteira-1280.jpg" || true
du -sh "$SAIDA" | sed 's/^/tamanho das capturas: /'
