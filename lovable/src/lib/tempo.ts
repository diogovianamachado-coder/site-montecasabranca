// Monte Casa Branca · o tempo em Montemor-o-Novo pelo Open-Meteo (só as coordenadas da casa; nenhum dado do visitante).
// Portado do kit da demo a 25/10/2026. Previsão até 16 dias; depois, média mensal com rótulo «média histórica», nunca como previsão.
import { addDias, deIso, iso } from "./datas.ts";
import { CASA } from "./tarifas.ts";

export type DiaTempo = { dia: string; codigo: number; max: number; min: number; chuva: number | null; media?: boolean };
export type ClasseTempo = "sol" | "pouco-nublado" | "nublado" | "nevoeiro" | "chuvisco" | "chuva" | "neve" | "aguaceiros" | "trovoada";

const WMO: [number, number, ClasseTempo, string][] = [
  [0, 0, "sol", "céu limpo"], [1, 2, "pouco-nublado", "pouco nublado"], [3, 3, "nublado", "nublado"], [45, 48, "nevoeiro", "nevoeiro"],
  [51, 57, "chuvisco", "chuvisco"], [61, 67, "chuva", "chuva"], [71, 77, "neve", "neve"], [80, 82, "aguaceiros", "aguaceiros"],
  [85, 86, "neve", "neve"], [95, 99, "trovoada", "trovoada"],
];
export const ICONES: Record<ClasseTempo, string> = { sol: "☀", "pouco-nublado": "🌤", nublado: "☁", nevoeiro: "🌫", chuvisco: "🌦", chuva: "🌧", neve: "❄", aguaceiros: "🌦", trovoada: "⛈" };

export function classeTempo(codigo: number): { classe: ClasseTempo; texto: string; icone: string } {
  for (const [a, b, classe, texto] of WMO) if (codigo >= a && codigo <= b) return { classe, texto, icone: ICONES[classe] };
  return { classe: "nublado", texto: "nublado", icone: ICONES.nublado };
}

/** Previsão diária do Open-Meteo (licença: a linha «Dados: Open-Meteo» é obrigatória na página). */
export async function previsao(opts: { lat?: number; lon?: number; dias?: number; fetchImpl?: typeof fetch } = {}): Promise<{ dias: DiaTempo[]; fonte: "open-meteo" }> {
  const lat = opts.lat ?? CASA.lat, lon = opts.lon ?? CASA.lon, n = Math.min(16, Math.max(1, opts.dias ?? 16));
  const f = opts.fetchImpl || fetch;
  const url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FLisbon&forecast_days=" + n;
  const r = await f(url);
  if (!r.ok) throw new Error("open-meteo " + r.status);
  const j = await r.json() as { daily: { time: string[]; weather_code: number[]; temperature_2m_max: number[]; temperature_2m_min: number[]; precipitation_probability_max: (number | null)[] } };
  const dias: DiaTempo[] = j.daily.time.map((dia, i) => ({
    dia, codigo: j.daily.weather_code[i], max: Math.round(j.daily.temperature_2m_max[i]), min: Math.round(j.daily.temperature_2m_min[i]),
    chuva: j.daily.precipitation_probability_max[i] ?? null,
  }));
  return { dias, fonte: "open-meteo" };
}

/** Médias mensais APROXIMADAS (normais de Évora) só para o estado «média histórica»; antes da produção, calcular do arquivo do Open-Meteo. */
export const CLIMA_MEDIAS: { mes: number; codigo: number; max: number; min: number }[] = [
  { mes: 1, codigo: 3, max: 14, min: 6 }, { mes: 2, codigo: 2, max: 15, min: 6 }, { mes: 3, codigo: 2, max: 18, min: 8 }, { mes: 4, codigo: 1, max: 20, min: 9 },
  { mes: 5, codigo: 0, max: 24, min: 12 }, { mes: 6, codigo: 0, max: 29, min: 15 }, { mes: 7, codigo: 0, max: 33, min: 17 }, { mes: 8, codigo: 0, max: 33, min: 17 },
  { mes: 9, codigo: 0, max: 29, min: 15 }, { mes: 10, codigo: 1, max: 23, min: 12 }, { mes: 11, codigo: 2, max: 18, min: 9 }, { mes: 12, codigo: 3, max: 15, min: 7 },
];

/** O tempo por dia da estadia: previsão quando há; senão a média do mês, marcada `media: true`. */
export function tempoDaEstadia(entrada: string, saida: string, prev: DiaTempo[], clima = CLIMA_MEDIAS): { dias: DiaTempo[]; semDados: number } {
  const porDia: Record<string, DiaTempo> = {}; prev.forEach((d) => { porDia[d.dia] = d; });
  const fim = deIso(saida), dias: DiaTempo[] = []; let d = deIso(entrada), semDados = 0;
  while (d <= fim) {
    const k = iso(d), p = porDia[k], m = clima[d.getMonth()];
    if (p) dias.push({ ...p, media: false });
    else if (m) dias.push({ dia: k, codigo: m.codigo, max: m.max, min: m.min, chuva: null, media: true });
    else semDados++;
    d = addDias(d, 1);
  }
  return { dias, semDados };
}

/** Semana de exemplo (capturas automáticas, sem rede). Conta a partir de `hoje`. Inclui chuva para se ver o estado. */
export function tempoExemplo(hoje: Date): DiaTempo[] {
  const ex = [[0, 22, 11, 0], [1, 21, 10, 5], [2, 20, 11, 20], [61, 17, 10, 80], [80, 18, 9, 55], [1, 20, 8, 10], [0, 22, 9, 0], [0, 23, 10, 0], [2, 21, 11, 15], [3, 19, 11, 30], [61, 17, 10, 70], [1, 19, 9, 10], [0, 21, 9, 0], [0, 22, 10, 0], [2, 20, 10, 20], [1, 21, 9, 5]];
  return ex.map(([codigo, max, min, chuva], i) => ({ dia: iso(addDias(hoje, i)), codigo, max, min, chuva }));
}
