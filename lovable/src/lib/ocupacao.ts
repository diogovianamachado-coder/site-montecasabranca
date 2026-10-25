// Monte Casa Branca · ocupação na forma da porta #189 (site_ocupacao.php; contrato_portas_v1.md §1).
// Intervalos com saída exclusiva: a noite de 7 → 8 ocupa só o dia 7. Só Confirmadas e uso próprio; «Por confirmar» não bloqueia.
import { addDias, deIso, iso } from "./datas.ts";

export type Intervalo = { de: string; ate: string };
export type Ocupacao = { ok: boolean; de: string; ate: string; ocupado: Intervalo[]; gerado_em?: string; exemplo?: boolean };

export function noitesOcupadas(o: Pick<Ocupacao, "ocupado">): Set<string> {
  const set = new Set<string>();
  for (const iv of o.ocupado || []) { let d = deIso(iv.de); const fim = deIso(iv.ate); while (d < fim) { set.add(iso(d)); d = addDias(d, 1); } }
  return set;
}

/** Verdadeiro se nenhuma noite de `entrada` até à véspera de `saida` está ocupada. */
export function intervaloLivre(entrada: string, saida: string, ocupadas: Set<string>): boolean {
  let d = deIso(entrada); const fim = deIso(saida);
  while (d < fim) { if (ocupadas.has(iso(d))) return false; d = addDias(d, 1); }
  return true;
}

/** Lê a porta #189. `base` = "https://app.montecasabranca.pt". `de`/`ate` em AAAA-MM (meses inclusivos, máximo 18). */
export async function lerOcupacao(base: string, de?: string, ate?: string, fetchImpl: typeof fetch = fetch): Promise<Ocupacao> {
  const q = de && ate ? "?de=" + encodeURIComponent(de) + "&ate=" + encodeURIComponent(ate) : "";
  const r = await fetchImpl(base.replace(/\/$/, "") + "/site_ocupacao.php" + q, { headers: { Accept: "application/json" } });
  if (!r.ok) throw new Error("site_ocupacao " + r.status);
  return (await r.json()) as Ocupacao;
}

/** Ocupação INVENTADA para a demo, nunca reservas reais (demo/base/dados/ocupacao.json). */
export const OCUPACAO_EXEMPLO: Ocupacao = {
  ok: true, exemplo: true, de: "2026-10-01", ate: "2027-10-01",
  ocupado: [
    { de: "2026-10-30", ate: "2026-11-02" }, { de: "2026-12-04", ate: "2026-12-06" }, { de: "2026-12-23", ate: "2026-12-28" }, { de: "2026-12-30", ate: "2027-01-02" },
    { de: "2027-02-12", ate: "2027-02-15" }, { de: "2027-03-26", ate: "2027-03-29" }, { de: "2027-04-02", ate: "2027-04-06" }, { de: "2027-05-07", ate: "2027-05-10" },
  ],
};
