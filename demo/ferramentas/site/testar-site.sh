#!/usr/bin/env bash
# Teste do site em PHP (site/): sintaxe, fotografias (todas as referidas existem, sem repetidas, com descrição), arranque com uma app de
# ensaio e cenário com capturas a 390/1280 (com app e sem app): ligações internas, fotografias a rolar, painel das datas, tempo, pedido.
# Uso: bash demo/ferramentas/site/testar-site.sh [pasta-saída]   (precisa de php 8.1+, node 22 e playwright instalado)
set -euo pipefail
RAIZ="$(cd "$(dirname "$0")/../../.." && pwd)"; SAIDA="${1:-$RAIZ/demo/_saida/capturas-site}"; mkdir -p "$SAIDA"
cd "$RAIZ"
echo "== sintaxe"; ERROS=0; while IFS= read -r -d '' f; do php -l "$f" > /dev/null 2>&1 || { php -l "$f"; ERROS=$((ERROS+1)); }; done < <(find site -name '*.php' -print0)
[ "$ERROS" -eq 0 ] || { echo "FALHOU: $ERROS ficheiro(s) PHP com erros de sintaxe"; exit 1; }
node --check site/assets/js/site.js && echo "site.js OK · $(find site -name '*.php' | wc -l) PHP OK"
echo "== fotografias"; php demo/ferramentas/site/conferir-fotos.php
if python3 -c "import PIL" 2>/dev/null; then python3 demo/ferramentas/fotos/para_o_site.py --conferir; else echo "(sem Pillow nesta máquina: a comparação de site/fotos com a galeria fica para o computador de quem monta)"; fi
echo "== servidores"; rm -rf /tmp/site-ensaio-app /tmp/site-ensaio-semapp; cp -r site /tmp/site-ensaio-app; cp -r site /tmp/site-ensaio-semapp
cp demo/ferramentas/site/config.ensaio.php /tmp/site-ensaio-app/config.php
sed "s|'http://127.0.0.1:8799'|'http://127.0.0.1:8798'|; s|8791|8792|; s|site-ensaio-cache|site-ensaio-cache-semapp|" demo/ferramentas/site/config.ensaio.php > /tmp/site-ensaio-semapp/config.php
# O tempo de ensaio (a máquina dos testes não chega ao Open-Meteo): 16 dias de «previsão» e as «médias dos últimos anos» por dia do ano.
# Cada servidor (com app, sem app) tem a sua pasta de cache, para um não ler o que o outro guardou.
for C in /tmp/site-ensaio-cache /tmp/site-ensaio-cache-semapp; do
  mkdir -p "$C"; rm -f "$C"/*.json
  CACHE="$C" php -r '$C=getenv("CACHE"); $h=new DateTimeImmutable("today"); $d=[]; foreach(range(0,15) as $i){$d[]=["dia"=>$h->modify("+$i days")->format("Y-m-d"),"codigo"=>[0,1,2,3,61,0,0,2,45,0,1,3,80,0,95,2][$i],"max"=>18+$i%5,"min"=>8+$i%4];} file_put_contents("$C/tempo.json", json_encode(["ok"=>true,"dias"=>$d,"fonte"=>"ensaio"]));
  $c=[]; for($x=new DateTimeImmutable("2024-01-01"); $x->format("Y")==="2024"; $x=$x->modify("+1 day")){ $n=(int)$x->format("z"); $t=17+11*sin(($n-110)/366*2*M_PI); $c[$x->format("m-d")]=["codigo"=>[0,2,3,61,80][$n%5],"max"=>(int)round($t+6),"min"=>(int)round($t-5)]; } file_put_contents("$C/clima.json", json_encode(["dias"=>$c,"anos"=>"ensaio"]));'
done
php -S 127.0.0.1:8799 demo/ferramentas/site/app-ensaio.php > /tmp/app-ensaio.log 2>&1 & P1=$!
(cd /tmp/site-ensaio-app && php -S 127.0.0.1:8791 > /tmp/site-app.log 2>&1) & P2=$!
(cd /tmp/site-ensaio-semapp && php -S 127.0.0.1:8792 > /tmp/site-semapp.log 2>&1) & P3=$!
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
echo "== estudo da capa: ?capa= só no ensaio"
P=$(curl -sS -H 'Host: novo.montecasabranca.pt' 'http://127.0.0.1:8791/?capa=3'); grep -q 'class="estudo-capa"' <<<"$P" && grep -q 'piscina-chapeu-sol' <<<"$P" || { echo "FALHOU: ?capa=3 não mostrou a opção 3 no ensaio"; exit 1; }
P=$(curl -sS -H 'Host: montecasabranca.pt' 'http://127.0.0.1:8791/?capa=3'); if grep -q 'class="estudo-capa"' <<<"$P"; then echo "FALHOU: o estudo da capa apareceu fora do ensaio"; exit 1; fi
echo "estudo da capa no ensaio OK · ignorado fora do ensaio OK"
echo "== capturas"; node demo/ferramentas/site/captura-site.cjs http://127.0.0.1:8791 "$SAIDA" app
node demo/ferramentas/site/captura-site.cjs http://127.0.0.1:8792 "$SAIDA" semapp
echo "== avisos PHP nos registos"; if grep -hE 'Warning|Notice|Fatal|Deprecated' /tmp/site-app.log /tmp/site-semapp.log; then echo "FALHOU: avisos PHP"; exit 1; fi; echo "sem avisos PHP"
