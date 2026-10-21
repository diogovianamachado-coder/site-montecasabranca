/* GERADO por demo/ferramentas/demo.py a partir de demo/base/dados/*.json. Não editar à mão. */
window.MCB_DADOS = {
 "clima-medias": {
  "exemplo": true,
  "meses": [
   {
    "codigo": 3,
    "max": 14,
    "mes": 1,
    "min": 6
   },
   {
    "codigo": 2,
    "max": 15,
    "mes": 2,
    "min": 6
   },
   {
    "codigo": 2,
    "max": 18,
    "mes": 3,
    "min": 8
   },
   {
    "codigo": 1,
    "max": 20,
    "mes": 4,
    "min": 9
   },
   {
    "codigo": 0,
    "max": 24,
    "mes": 5,
    "min": 12
   },
   {
    "codigo": 0,
    "max": 29,
    "mes": 6,
    "min": 15
   },
   {
    "codigo": 0,
    "max": 33,
    "mes": 7,
    "min": 17
   },
   {
    "codigo": 0,
    "max": 33,
    "mes": 8,
    "min": 17
   },
   {
    "codigo": 0,
    "max": 29,
    "mes": 9,
    "min": 15
   },
   {
    "codigo": 1,
    "max": 23,
    "mes": 10,
    "min": 12
   },
   {
    "codigo": 2,
    "max": 18,
    "mes": 11,
    "min": 9
   },
   {
    "codigo": 3,
    "max": 14,
    "mes": 12,
    "min": 6
   }
  ],
  "nota": "Médias mensais APROXIMADAS (normais de Évora), só para a demo mostrar o estado «média histórica» nas datas a mais de 16 dias. Antes da produção substituem-se pelo cálculo real a partir do arquivo do Open-Meteo (últimos 10 anos, coordenadas da casa). Nunca se apresentam como previsão."
 },
 "factos": {
  "capacidade": 8,
  "coordenadas": {
   "lat": 38.6142917,
   "lon": -8.211253
  },
  "email": "geral@montecasabranca.pt",
  "fonte": "docs/conteudos/fontes/FACTOS.md (só linhas com ✓); o kit lê daqui os contactos e as coordenadas",
  "instagram": "@monte_casa_branca",
  "instagram_url": "https://www.instagram.com/monte_casa_branca/",
  "localidade": "Reguengo, Montemor-o-Novo",
  "maps": "https://www.google.com/maps?q=38.6142917,-8.211253",
  "nome": "Monte Casa Branca",
  "piscina": "10 × 5 m",
  "quartos": 4,
  "registo_al": "126450/AL",
  "telefone_mostrar": "+351 962 802 626",
  "whatsapp": "351962802626"
 },
 "ocupacao": {
  "ate": "2027-10-01",
  "de": "2026-10-01",
  "exemplo": true,
  "gerado_em": "2026-10-21T22:00:00+01:00",
  "nota": "Ocupação INVENTADA para a demo (nunca reservas reais). Forma igual à resposta da porta #189 site_ocupacao.php: intervalos com saída exclusiva (a noite de 7 → 8 ocupa só o dia 7). Na produção troca-se este ficheiro pelo endereço da porta em MCB_BASE_CONFIG.ocupacao.",
  "ocupado": [
   {
    "ate": "2026-11-02",
    "de": "2026-10-30"
   },
   {
    "ate": "2026-12-06",
    "de": "2026-12-04"
   },
   {
    "ate": "2026-12-28",
    "de": "2026-12-23"
   },
   {
    "ate": "2027-01-02",
    "de": "2026-12-30"
   },
   {
    "ate": "2027-02-15",
    "de": "2027-02-12"
   },
   {
    "ate": "2027-03-29",
    "de": "2027-03-26"
   },
   {
    "ate": "2027-04-06",
    "de": "2027-04-02"
   },
   {
    "ate": "2027-05-10",
    "de": "2027-05-07"
   },
   {
    "ate": "2027-06-14",
    "de": "2027-06-11"
   },
   {
    "ate": "2027-07-10",
    "de": "2027-07-03"
   },
   {
    "ate": "2027-08-14",
    "de": "2027-07-24"
   },
   {
    "ate": "2027-08-28",
    "de": "2027-08-21"
   },
   {
    "ate": "2027-09-13",
    "de": "2027-09-10"
   }
  ],
  "ok": true
 },
 "tarifas": {
  "anos": {
   "2026": {
    "epocas": [
     {
      "dia_fim": 29,
      "dia_ini": 1,
      "mes_fim": 2,
      "mes_ini": 1,
      "min_noites": 2,
      "noite": 250,
      "nome": "Inverno"
     },
     {
      "dia_fim": 1,
      "dia_ini": 1,
      "mes_fim": 5,
      "mes_ini": 3,
      "min_noites": 2,
      "noite": 280,
      "nome": "Primavera"
     },
     {
      "dia_fim": 31,
      "dia_ini": 2,
      "mes_fim": 5,
      "mes_ini": 5,
      "min_noites": 2,
      "noite": 330,
      "nome": "Maio"
     },
     {
      "dia_fim": 17,
      "dia_ini": 1,
      "mes_fim": 7,
      "mes_ini": 6,
      "min_noites": 2,
      "noite": 380,
      "nome": "Início do verão"
     },
     {
      "dia_fim": 31,
      "dia_ini": 18,
      "mes_fim": 8,
      "mes_ini": 7,
      "min_noites": 7,
      "noite": 405,
      "nome": "Verão",
      "sabado_a_sabado": true
     },
     {
      "dia_fim": 30,
      "dia_ini": 1,
      "mes_fim": 9,
      "mes_ini": 9,
      "min_noites": 2,
      "noite": 330,
      "nome": "Setembro"
     },
     {
      "dia_fim": 30,
      "dia_ini": 1,
      "mes_fim": 11,
      "mes_ini": 10,
      "min_noites": 2,
      "noite": 250,
      "nome": "Outono"
     },
     {
      "dia_fim": 31,
      "dia_ini": 1,
      "mes_fim": 12,
      "mes_ini": 12,
      "min_noites": 2,
      "noite": 330,
      "nome": "Dezembro"
     }
    ],
    "limpeza": 170
   },
   "2027": {
    "epocas": [
     {
      "dia_fim": 29,
      "dia_ini": 1,
      "mes_fim": 2,
      "mes_ini": 1,
      "min_noites": 2,
      "noite": 250,
      "nome": "Inverno"
     },
     {
      "dia_fim": 1,
      "dia_ini": 1,
      "mes_fim": 5,
      "mes_ini": 3,
      "min_noites": 2,
      "noite": 280,
      "nome": "Primavera"
     },
     {
      "dia_fim": 31,
      "dia_ini": 2,
      "mes_fim": 5,
      "mes_ini": 5,
      "min_noites": 2,
      "noite": 330,
      "nome": "Maio"
     },
     {
      "dia_fim": 17,
      "dia_ini": 1,
      "mes_fim": 7,
      "mes_ini": 6,
      "min_noites": 2,
      "noite": 390,
      "nome": "Início do verão"
     },
     {
      "dia_fim": 31,
      "dia_ini": 18,
      "mes_fim": 8,
      "mes_ini": 7,
      "min_noites": 7,
      "noite": 410,
      "nome": "Verão",
      "sabado_a_sabado": true
     },
     {
      "dia_fim": 30,
      "dia_ini": 1,
      "mes_fim": 9,
      "mes_ini": 9,
      "min_noites": 2,
      "noite": 340,
      "nome": "Setembro"
     },
     {
      "dia_fim": 30,
      "dia_ini": 1,
      "mes_fim": 11,
      "mes_ini": 10,
      "min_noites": 2,
      "noite": 250,
      "nome": "Outono"
     },
     {
      "dia_fim": 31,
      "dia_ini": 1,
      "mes_fim": 12,
      "mes_ini": 12,
      "min_noites": 2,
      "noite": 330,
      "nome": "Dezembro"
     }
    ],
    "limpeza": 180
   }
  },
  "exemplo": true,
  "fonte": "docs/conteudos/fontes/FACTOS.md §4 (tarifa privada = a do site) e Tarifas da app; forma da resposta da porta #190 (contrato_portas_v1.md)",
  "mensal": {
   "meses": [
    11,
    12,
    1,
    2,
    3
   ],
   "noites": 28,
   "nota": "4 000 € por 28 noites + limpeza, de novembro a março («Considera os 4 000 € e avança», 4/10)",
   "valor": 4000
  },
  "nota": "A conta do site é uma pré-visualização; na produção a app confirma o total no pedido (#191 recalcula). As datas das épocas de 2026 presumem-se iguais às de 2027.",
  "pax_max": 8,
  "regras": [
   "Entrada a partir das 16h",
   "Saída até às 11h"
  ]
 },
 "tempo-exemplo": {
  "dias": [
   {
    "chuva": 0,
    "codigo": 0,
    "max": 22,
    "min": 11
   },
   {
    "chuva": 5,
    "codigo": 1,
    "max": 21,
    "min": 10
   },
   {
    "chuva": 20,
    "codigo": 2,
    "max": 20,
    "min": 11
   },
   {
    "chuva": 80,
    "codigo": 61,
    "max": 17,
    "min": 10
   },
   {
    "chuva": 55,
    "codigo": 80,
    "max": 18,
    "min": 9
   },
   {
    "chuva": 10,
    "codigo": 1,
    "max": 20,
    "min": 8
   },
   {
    "chuva": 0,
    "codigo": 0,
    "max": 22,
    "min": 9
   },
   {
    "chuva": 0,
    "codigo": 0,
    "max": 23,
    "min": 10
   },
   {
    "chuva": 15,
    "codigo": 2,
    "max": 21,
    "min": 11
   },
   {
    "chuva": 30,
    "codigo": 3,
    "max": 19,
    "min": 11
   },
   {
    "chuva": 70,
    "codigo": 61,
    "max": 17,
    "min": 10
   },
   {
    "chuva": 10,
    "codigo": 1,
    "max": 19,
    "min": 9
   },
   {
    "chuva": 0,
    "codigo": 0,
    "max": 21,
    "min": 8
   },
   {
    "chuva": 0,
    "codigo": 0,
    "max": 22,
    "min": 9
   },
   {
    "chuva": 5,
    "codigo": 1,
    "max": 21,
    "min": 10
   },
   {
    "chuva": 20,
    "codigo": 2,
    "max": 20,
    "min": 10
   }
  ],
  "exemplo": true,
  "nota": "Semana de exemplo para quando não há rede (capturas automáticas, ficheiro aberto sem ligação). Os dias contam a partir de hoje. Inclui um dia de chuva para se ver o estado."
 }
};
