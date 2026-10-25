// Monte Casa Branca · tarifa privada 2026/2027 e a conta da estadia (a mesma regra da app, lib/motor.php → orcamento()).
// Fonte dos números: docs/conteudos/fontes/FACTOS.md §4 e as Tarifas da app. Portado do kit da demo (base.js) a 25/10/2026.
// Na produção o total que o site mostra é uma pré-visualização: a porta #190 (site_tarifa.php) devolve a mesma forma e a #191
// recalcula no pedido. Esta conta serve enquanto a porta não existir e como «espelho» para testes.
import { DIAS_LONGOS, addDias, deIso, diasEntre, euros, hojeLocal, iso, isoValido } from "./datas.ts";

export type Epoca = { nome: string; mes_ini: number; dia_ini: number; mes_fim: number; dia_fim: number; noite: number; min_noites: number; sabado_a_sabado?: boolean };
export type AnoTarifa = { limpeza: number; epocas: Epoca[] };
export type Tarifas = {
  pax_max: number;
  regras: string[];
  mensal?: { valor: number; noites: number; meses: number[] };
  anos: Record<string, AnoTarifa>;
};

const EPOCAS = (inicioVerao: number, verao: number, setembro: number): Epoca[] => [
  { nome: "Inverno", mes_ini: 1, dia_ini: 1, mes_fim: 2, dia_fim: 29, noite: 250, min_noites: 2 },
  { nome: "Primavera", mes_ini: 3, dia_ini: 1, mes_fim: 5, dia_fim: 1, noite: 280, min_noites: 2 },
  { nome: "Maio", mes_ini: 5, dia_ini: 2, mes_fim: 5, dia_fim: 31, noite: 330, min_noites: 2 },
  { nome: "Início do verão", mes_ini: 6, dia_ini: 1, mes_fim: 7, dia_fim: 17, noite: inicioVerao, min_noites: 2 },
  { nome: "Verão", mes_ini: 7, dia_ini: 18, mes_fim: 8, dia_fim: 31, noite: verao, min_noites: 7, sabado_a_sabado: true },
  { nome: "Setembro", mes_ini: 9, dia_ini: 1, mes_fim: 9, dia_fim: 30, noite: setembro, min_noites: 2 },
  { nome: "Outono", mes_ini: 10, dia_ini: 1, mes_fim: 11, dia_fim: 30, noite: 250, min_noites: 2 },
  { nome: "Dezembro", mes_ini: 12, dia_ini: 1, mes_fim: 12, dia_fim: 31, noite: 330, min_noites: 2 },
];

/** Tarifa privada (= a do site; a mais baixa de todos os canais). 2026 presume as datas das épocas de 2027. */
export const TARIFAS: Tarifas = {
  pax_max: 8,
  regras: ["Entrada a partir das 16h", "Saída até às 11h"],
  mensal: { valor: 4000, noites: 28, meses: [11, 12, 1, 2, 3] },
  anos: {
    "2026": { limpeza: 170, epocas: EPOCAS(380, 405, 330) },
    "2027": { limpeza: 180, epocas: EPOCAS(390, 410, 340) },
  },
};

export type EpocaEscolhida = { nome: string; noite: number; min_noites: number; sabado_a_sabado: boolean; ano_tarifa: number; limpeza: number; aviso: string | null };

export function epocaDe(dataIso: string, tarifas: Tarifas = TARIFAS): EpocaEscolhida | null {
  const d = deIso(dataIso), ano = d.getFullYear();
  const anos = Object.keys(tarifas.anos).map(Number).sort((a, b) => a - b);
  let usado = ano, aviso: string | null = null;
  if (!tarifas.anos[ano]) {
    usado = ano < anos[0] ? anos[0] : anos[anos.length - 1];
    aviso = "A tarifa de " + ano + " ainda não está publicada; a estimativa usa a de " + usado + ".";
  }
  const t = tarifas.anos[usado], md = (d.getMonth() + 1) * 100 + d.getDate();
  for (const e of t.epocas) {
    const ini = e.mes_ini * 100 + e.dia_ini, fim = e.mes_fim * 100 + e.dia_fim;
    if (md >= ini && md <= fim) return { nome: e.nome, noite: e.noite, min_noites: e.min_noites, sabado_a_sabado: !!e.sabado_a_sabado, ano_tarifa: usado, limpeza: t.limpeza, aviso };
  }
  return null;
}

export type ErroOrcamento = "datas" | "passado" | "pax" | "sem_tarifa" | "verao_sabado" | "min_noites";
export type Orcamento = {
  ok: boolean; entrada: string; saida: string; pax: number;
  noites?: number; epoca?: string; noite?: number; min_noites?: number;
  dormidas?: number; limpeza?: number; total?: number; mensal?: boolean;
  detalhe?: { dia: string; epoca: string; noite: number }[];
  avisos: string[]; regras: string[];
  erro?: ErroOrcamento; mensagem?: string; calculado_em?: string;
};

function falha(R: Orcamento, erro: ErroOrcamento, mensagem: string): Orcamento { R.ok = false; R.erro = erro; R.mensagem = mensagem; return R; }

/** A conta do site: mesma forma da resposta da porta #190 (contrato_portas_v1.md §2). `opts.hoje` serve para os testes. */
export function orcamento(entrada: string, saida: string, pax: number, opts: { tarifas?: Tarifas; hoje?: Date } = {}): Orcamento {
  const tarifas = opts.tarifas || TARIFAS, hoje = opts.hoje || hojeLocal();
  const R: Orcamento = { ok: false, entrada, saida, pax, avisos: [], regras: tarifas.regras || [] };
  if (!isoValido(entrada) || !isoValido(saida)) return falha(R, "datas", "Escolham a data de entrada e a de saída.");
  const n = diasEntre(entrada, saida);
  if (n <= 0) return falha(R, "datas", "A saída tem de ser depois da entrada.");
  if (n > 60) return falha(R, "datas", "Para estadias com mais de 60 noites, falem connosco.");
  if (deIso(entrada) < hoje) return falha(R, "passado", "A data de entrada já passou.");
  pax = Math.floor(Number(pax)) || 0;
  R.pax = pax;
  if (pax < 1 || pax > tarifas.pax_max) return falha(R, "pax", "A casa recebe até " + tarifas.pax_max + " pessoas.");
  R.noites = n;
  const ep0 = epocaDe(entrada, tarifas);
  if (!ep0) return falha(R, "sem_tarifa", "Não temos tarifa para estas datas; falem connosco.");
  if (ep0.aviso) R.avisos.push(ep0.aviso);
  const mensal = tarifas.mensal, mesesMensal = mensal?.meses || [];
  let dormidas = 0, verao = false, mensalPossivel = !!mensal, dia = deIso(entrada);
  const detalhe: { dia: string; epoca: string; noite: number }[] = [];
  for (let i = 0; i < n; i++) {
    const ep = epocaDe(iso(dia), tarifas) || ep0;
    dormidas += ep.noite; detalhe.push({ dia: iso(dia), epoca: ep.nome, noite: ep.noite });
    if (ep.sabado_a_sabado) verao = true;
    if (mesesMensal.indexOf(dia.getMonth() + 1) < 0) mensalPossivel = false;
    dia = addDias(dia, 1);
  }
  R.epoca = ep0.nome; R.noite = ep0.noite; R.min_noites = ep0.min_noites; R.detalhe = detalhe;
  if (verao) {
    const e = deIso(entrada).getDay(), s = deIso(saida).getDay();
    if (n < 7 || e !== 6 || s !== 6) { R.min_noites = 7; return falha(R, "verao_sabado", "No verão (18 de julho a 31 de agosto) as estadias são de sábado a sábado, 7 noites ou mais."); }
  } else if (n < ep0.min_noites) {
    return falha(R, "min_noites", "Nesta época o mínimo são " + ep0.min_noites + " noites.");
  }
  if (mensal && n >= mensal.noites && mensalPossivel) {
    dormidas = Math.round((mensal.valor / mensal.noites) * n * 100) / 100;
    R.mensal = true;
    R.avisos.push("Estadia longa: aplica-se o preço mensal (" + euros(mensal.valor) + " por " + mensal.noites + " noites) mais a limpeza.");
  }
  R.limpeza = ep0.limpeza; R.dormidas = Math.round(dormidas * 100) / 100; R.total = Math.round((R.dormidas + R.limpeza) * 100) / 100;
  const ds = deIso(saida).getDay();
  if (ds === 0 || ds === 6) R.avisos.push("Saída ao " + DIAS_LONGOS[ds] + ": podem ficar até ao pôr do sol (" + porDoSol(saida) + ")*, a combinar, quando não há entrada nesse dia.");
  R.ok = true; R.calculado_em = new Date().toISOString();
  return R;
}

/** Coordenadas da casa (FACTOS §1). */
export const CASA = { lat: 38.6142917, lon: -8.211253 };

/** Pôr do sol na casa, calculado no browser (S23; algoritmo da NOAA, erro de 1–2 min), em hora de Lisboa, «20h47». */
export function porDoSol(dataIso: string, lat = CASA.lat, lon = CASA.lon): string {
  const d = deIso(dataIso), rad = Math.PI / 180;
  const a = Math.floor((14 - (d.getMonth() + 1)) / 12), y = d.getFullYear() + 4800 - a, m = d.getMonth() + 1 + 12 * a - 3;
  const jdn = d.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  const n = jdn - 2451545 + 0.0008, Jx = n - lon / 360;
  const M = (((357.5291 + 0.98560028 * Jx) % 360) + 360) % 360;
  const C = 1.9148 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 0.0003 * Math.sin(3 * M * rad);
  const L = (M + C + 180 + 102.9372) % 360;
  const Jt = 2451545 + Jx + 0.0053 * Math.sin(M * rad) - 0.0069 * Math.sin(2 * L * rad);
  const dec = Math.asin(Math.sin(L * rad) * Math.sin(23.4397 * rad));
  const cosw = (Math.sin(-0.833 * rad) - Math.sin(lat * rad) * Math.sin(dec)) / (Math.cos(lat * rad) * Math.cos(dec));
  if (cosw > 1 || cosw < -1) return "—";
  const w = Math.acos(cosw) / rad, Jset = Jt + w / 360;
  const instante = new Date((Jset - 2440587.5) * 86400000);
  try {
    return new Intl.DateTimeFormat("pt-PT", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Lisbon" }).format(instante).replace(":", "h");
  } catch {
    return String(instante.getHours()).padStart(2, "0") + "h" + String(instante.getMinutes()).padStart(2, "0");
  }
}
