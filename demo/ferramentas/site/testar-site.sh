#!/usr/bin/env bash
# Teste do site em PHP (site/): sintaxe, regras de construção (o que não pode voltar à folha de estilos nem ao JavaScript, por causa do
# iPhone), fotografias (todas as referidas existem, sem repetidas, com descrição), arranque com uma app de ensaio e cenário com capturas
# a 390/1280 (com app e sem app): ligações internas, sequências de fotografias (com os gestos de dedo), painel das datas, tempo, pedido,
# menu; e a geometria da página em cada motor de MOTORES (por omissão só chromium; no GitHub, chromium e webkit).
# Uso: bash demo/ferramentas/site/testar-site.sh [pasta-saída]   (precisa de php 8.1+, node 22 e playwright instalado)
set -euo pipefail
RAIZ="$(cd "$(dirname "$0")/../../.." && pwd)"; SAIDA="${1:-$RAIZ/demo/_saida/capturas-site}"; mkdir -p "$SAIDA"
cd "$RAIZ"
echo "== sintaxe"; ERROS=0; while IFS= read -r -d '' f; do php -l "$f" > /dev/null 2>&1 || { php -l "$f"; ERROS=$((ERROS+1)); }; done < <(find site -name '*.php' -print0)
[ "$ERROS" -eq 0 ] || { echo "FALHOU: $ERROS ficheiro(s) PHP com erros de sintaxe"; exit 1; }
node --check site/assets/js/site.js && echo "site.js OK · $(find site -name '*.php' | wc -l) PHP OK"
# Regras de construção (versão 3, 16/11/2026). No iPhone do Diogo a versão 2 mostrou as fotografias em caixas meio vazias e os menus
# presos, e nenhum teste o viu (nem o motor do Safari dos testes o reproduz). O que as causou não pode voltar sem se dar por isso:
# larguras tiradas de aspect-ratio, unidades de contentor, position: sticky em faixas, desfoques, color-mix (cores translúcidas que os
# browsers mais antigos não desenham), rolagem suave em toda a página, JavaScript a mexer na rolagem a cada instante e o bloqueio da
# rolagem da página no <body>. Os comentários não contam: só as regras.
echo "== regras de construção"
php -r '
$css = preg_replace("#/\\*.*?\\*/#s", "", (string)file_get_contents("site/assets/css/site.css"));
$js = preg_replace("#/\\*.*?\\*/#s", "", (string)file_get_contents("site/assets/js/site.js")); $js = preg_replace("#(?<![:\"\x27])//[^\n]*#", "", $js);
$mau = [];
foreach (["aspect-ratio", "cqw", "container-type", "backdrop-filter", "color-mix("] as $p) if (stripos($css, $p) !== false) $mau[] = "site.css usa «{$p}»";
if (preg_match("#position:\\s*sticky#i", $css)) $mau[] = "site.css usa «position: sticky»";
if (preg_match("#(?<![a-z-])scroll-behavior#i", $css)) $mau[] = "site.css usa «scroll-behavior»";
foreach (["requestAnimationFrame", "sem-scroll", "body.style.overflow", "documentElement.style.overflow"] as $p) if (stripos($js, $p) !== false) $mau[] = "site.js usa «{$p}»";
foreach ($mau as $m) echo "FALHOU: $m\n";
exit($mau ? 1 : 0);' || exit 1
echo "folha de estilos e JavaScript dentro das regras OK"
echo "== fotografias"; php demo/ferramentas/site/conferir-fotos.php
if python3 -c "import PIL" 2>/dev/null; then python3 demo/ferramentas/fotos/para_o_site.py --conferir; else echo "(sem Pillow nesta máquina: a comparação de site/fotos com a galeria fica para o computador de quem monta)"; fi
echo "== servidores"; rm -rf /tmp/site-ensaio-app /tmp/site-ensaio-semapp; cp -r site /tmp/site-ensaio-app; cp -r site /tmp/site-ensaio-semapp
cp demo/ferramentas/site/config.ensaio.php /tmp/site-ensaio-app/config.php
sed "s|'http://127.0.0.1:8799'|'http://127.0.0.1:8798'|; s|8791|8792|; s|site-ensaio-cache|site-ensaio-cache-semapp|" demo/ferramentas/site/config.ensaio.php > /tmp/site-ensaio-semapp/config.php
# O tempo de ensaio (a máquina dos testes não chega ao Open-Meteo): 16 dias de «previsão» e as «médias dos últimos anos» por dia do ano.
# Cada servidor (com app, sem app) tem a sua pasta de cache, para um não ler o que o outro guardou.
for C in /tmp/site-ensaio-cache /tmp/site-ensaio-cache-semapp; do php demo/ferramentas/site/semear-tempo.php "$C"; done
php -S 127.0.0.1:8799 demo/ferramentas/site/app-ensaio.php > /tmp/app-ensaio.log 2>&1 & P1=$!
# Sem subshell («-t pasta» em vez de «cd pasta»): assim $! é o próprio php e o trap do fim pára-o mesmo (antes ficava a correr).
php -S 127.0.0.1:8791 -t /tmp/site-ensaio-app > /tmp/site-app.log 2>&1 & P2=$!
php -S 127.0.0.1:8792 -t /tmp/site-ensaio-semapp > /tmp/site-semapp.log 2>&1 & P3=$!
trap 'kill $P1 $P2 $P3 2>/dev/null || true' EXIT
for p in 8791 8792; do curl -sS -o /dev/null --retry 20 --retry-connrefused --retry-delay 1 "http://127.0.0.1:$p/"; done
echo "== portas"; curl -sS "http://127.0.0.1:8791/api/tarifa.php?entrada=2027-05-14&saida=2027-05-17&pax=6" | grep -q '"fonte":"app"' && echo "tarifa via app OK"
curl -sS "http://127.0.0.1:8792/api/tarifa.php?entrada=2027-05-14&saida=2027-05-17&pax=6" | grep -q '"fonte":"site"' && echo "tarifa de recurso OK"
curl -sS "http://127.0.0.1:8791/api/tempo.php?de=2027-05-14&ate=2027-05-17" | grep -q '"modo":"media"' && echo "tempo de uma estadia distante: médias OK"
curl -sS "http://127.0.0.1:8791/api/tempo.php" | grep -q '"ok":true' && echo "tempo dos próximos dias OK"
echo "== ensaio: noindex só quando o Host é novo.*"
P=$(curl -sS -H 'Host: novo.montecasabranca.pt' http://127.0.0.1:8791/); grep -q 'name="robots" content="noindex' <<<"$P" || { echo "FALHOU: a página não leva noindex com Host novo.montecasabranca.pt"; exit 1; }
P=$(curl -sS http://127.0.0.1:8791/); if grep -q 'name="robots" content="noindex' <<<"$P"; then echo "FALHOU: noindex fora do ensaio"; exit 1; fi
echo "noindex no ensaio OK · sem noindex na raiz OK"
echo "== capa: a opção escolhida, sem estudo à vista"
# O Diogo escolheu a capa 1 (15/11/2026): com uma só opção, ?capa= não faz nada, nem no ensaio. (Com várias opções em conteudo.php,
# o ensaio volta a mostrar os botões do estudo; fora do ensaio nunca.)
for H in novo.montecasabranca.pt montecasabranca.pt; do
  P=$(curl -sS -H "Host: $H" 'http://127.0.0.1:8791/?capa=3')
  if grep -q 'class="estudo-capa"' <<<"$P"; then echo "FALHOU: os botões do estudo da capa apareceram em $H"; exit 1; fi
  grep -q 'hero-titulo-ceu' <<<"$P" && grep -q 'piscina-dia' <<<"$P" || { echo "FALHOU: a capa em $H não é a opção 1 (fotografia 1, título no céu)"; exit 1; }
done
echo "capa 1 no ensaio e fora dele OK · sem botões de estudo OK"
echo "== versão: número, ficha no registo e «Ensaio · versão N» só no ensaio"
N=$(php -r '$v=json_decode((string)file_get_contents("site/versao.json"),true); echo is_array($v)&&isset($v["versao"])&&is_int($v["versao"])?$v["versao"]:"";')
[ -n "$N" ] || { echo "FALHOU: site/versao.json não tem o número da versão"; exit 1; }
grep -q "^### V$N · " docs/versoes/REGISTO.md || { echo "FALHOU: falta a ficha «### V$N · …» em docs/versoes/REGISTO.md"; exit 1; }
php -r '$v=json_decode((string)file_get_contents("docs/versoes/versoes.json"),true); exit(is_array($v)&&isset($v[$argv[1]])?0:1);' "$N" || { echo "FALHOU: a versão $N não está em docs/versoes/versoes.json"; exit 1; }
P=$(curl -sS -H 'Host: novo.montecasabranca.pt' http://127.0.0.1:8791/); grep -q "Ensaio · versão $N" <<<"$P" || { echo "FALHOU: o ensaio não mostra «Ensaio · versão $N»"; exit 1; }
P=$(curl -sS -H 'Host: montecasabranca.pt' http://127.0.0.1:8791/); if grep -q 'versao-ensaio' <<<"$P"; then echo "FALHOU: o número da versão apareceu fora do ensaio"; exit 1; fi
echo "versão $N com ficha no registo OK · à vista só no ensaio OK"
echo "== quem já ficou: as três notas, fora dos dados estruturados"
[ "$(grep -o 'class="nota-anel"' <<<"$P" | wc -l)" = "3" ] || { echo "FALHOU: a página não mostra as três notas (Booking, Airbnb, Google)"; exit 1; }
if grep -q 'aggregateRating' <<<"$P"; then echo "FALHOU: as notas das plataformas não podem ir para os dados estruturados"; exit 1; fi
echo "três notas na página OK · sem aggregateRating OK"
echo "== sem ligações para as plataformas (Diogo, 15/11/2026): nem nas notas, nem no rodapé"
if grep -Eiq '<a [^>]*href="https?://[^"]*(airbnb|booking|vrbo)\.' <<<"$P"; then echo "FALHOU: a página tem uma ligação para uma plataforma (Airbnb, Booking ou Vrbo)"; exit 1; fi
php -r '$p = stream_get_contents(STDIN); if (!preg_match("#<ul class=\"notas[ \"].*?</ul>#s", $p, $m)) exit(2); exit(stripos($m[0], "<a ") === false ? 0 : 1);' <<<"$P" || { echo "FALHOU: as três notas não podem ser ligações (ou a lista das notas não está na página)"; exit 1; }
echo "sem ligações para as plataformas OK"
echo "== capturas"; node demo/ferramentas/site/captura-site.cjs http://127.0.0.1:8791 "$SAIDA" app
node demo/ferramentas/site/captura-site.cjs http://127.0.0.1:8792 "$SAIDA" semapp
# Geometria (16/11/2026): o que o iPhone do Diogo mostrou e os testes em Chromium não viam (fotografias em caixas meio vazias, campos das
# datas a sair do ecrã, menus presos). Corre em cada motor de MOTORES; no GitHub são «chromium webkit» (o WebKit é o motor do Safari e de
# todos os browsers do iPhone). Na máquina da sessão só há Chromium. Corre os motores todos antes de falhar, para se ver cada resultado.
echo "== geometria em: ${MOTORES:-chromium}"; GEO=0
for M in ${MOTORES:-chromium}; do node demo/ferramentas/site/geometria.cjs http://127.0.0.1:8792 "$SAIDA" "$M" || GEO=1; done
echo "== avisos PHP nos registos"; if grep -hE 'Warning|Notice|Fatal|Deprecated' /tmp/site-app.log /tmp/site-semapp.log; then echo "FALHOU: avisos PHP"; exit 1; fi; echo "sem avisos PHP"
[ "$GEO" = "0" ] || { echo "FALHOU: geometria (ver acima em que motor e porquê)"; exit 1; }
