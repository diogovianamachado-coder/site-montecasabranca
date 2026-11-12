#!/usr/bin/env bash
# Teste do site em PHP (site/): sintaxe, fotografias (todas as referidas existem, pares completos), arranque com uma app de ensaio
# e capturas a 390/1280 (com app e sem app).
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
sed "s|'http://127.0.0.1:8799'|'http://127.0.0.1:8798'|; s|8791|8792|" demo/ferramentas/site/config.ensaio.php > /tmp/site-ensaio-semapp/config.php
mkdir -p /tmp/site-ensaio-cache; php -r '$h=new DateTimeImmutable("today"); $d=[]; foreach(range(0,13) as $i){$d[]=["dia"=>$h->modify("+$i days")->format("Y-m-d"),"codigo"=>[0,1,2,3,61,0,0,2,45,0,1,3,80,0][$i],"max"=>18+$i%5,"min"=>8+$i%4];} file_put_contents("/tmp/site-ensaio-cache/tempo.json", json_encode(["ok"=>true,"dias"=>$d,"fonte"=>"ensaio"]));'
php -S 127.0.0.1:8799 demo/ferramentas/site/app-ensaio.php > /tmp/app-ensaio.log 2>&1 & P1=$!
(cd /tmp/site-ensaio-app && php -S 127.0.0.1:8791 > /tmp/site-app.log 2>&1) & P2=$!
(cd /tmp/site-ensaio-semapp && php -S 127.0.0.1:8792 > /tmp/site-semapp.log 2>&1) & P3=$!
trap 'kill $P1 $P2 $P3 2>/dev/null || true' EXIT
for p in 8791 8792; do curl -sS -o /dev/null --retry 20 --retry-connrefused --retry-delay 1 "http://127.0.0.1:$p/"; done
echo "== portas"; curl -sS "http://127.0.0.1:8791/api/tarifa.php?entrada=2027-05-14&saida=2027-05-17&pax=6" | grep -q '"fonte":"app"' && echo "tarifa via app OK"
curl -sS "http://127.0.0.1:8792/api/tarifa.php?entrada=2027-05-14&saida=2027-05-17&pax=6" | grep -q '"fonte":"site"' && echo "tarifa de recurso OK"
echo "== ensaio: noindex só quando o Host é novo.*"
P=$(curl -sS -H 'Host: novo.montecasabranca.pt' http://127.0.0.1:8791/); grep -q 'name="robots" content="noindex' <<<"$P" || { echo "FALHOU: a página não leva noindex com Host novo.montecasabranca.pt"; exit 1; }
P=$(curl -sS http://127.0.0.1:8791/); if grep -q 'name="robots" content="noindex' <<<"$P"; then echo "FALHOU: noindex fora do ensaio"; exit 1; fi
echo "noindex no ensaio OK · sem noindex na raiz OK"
echo "== capturas"; node demo/ferramentas/site/captura-site.cjs http://127.0.0.1:8791 "$SAIDA" app
node demo/ferramentas/site/captura-site.cjs http://127.0.0.1:8792 "$SAIDA" semapp
echo "== avisos PHP nos registos"; if grep -hE 'Warning|Notice|Fatal|Deprecated' /tmp/site-app.log /tmp/site-semapp.log; then echo "FALHOU: avisos PHP"; exit 1; fi; echo "sem avisos PHP"
