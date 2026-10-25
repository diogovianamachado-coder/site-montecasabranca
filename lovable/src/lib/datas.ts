// Monte Casa Branca · datas e formatos (pt-PT). Portado do kit da demo (demo/base/kit/base.js) a 25/10/2026.
// Todas as datas são «dias» ISO (AAAA-MM-DD) e os objetos Date ficam ao meio-dia local, para a mudança de hora não comer um dia.

export const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"] as const;
export const DIAS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"] as const;
export const DIAS_LONGOS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"] as const;

export function pad(n: number): string { return (n < 10 ? "0" : "") + n; }
export function deIso(s: string): Date { const p = String(s || "").split("-"); return new Date(+p[0], +p[1] - 1, +p[2], 12, 0, 0); }
export function iso(d: Date): string { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
export function isoValido(s: string): boolean { return /^\d{4}-\d{2}-\d{2}$/.test(String(s || "")) && !isNaN(deIso(s).getTime()); }
export function addDias(d: Date, n: number): Date { const x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }
export function hojeLocal(): Date { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0); }
export function diasEntre(a: string, b: string): number { return Math.round((deIso(b).getTime() - deIso(a).getTime()) / 86400000); }
export function fmtData(d: Date): string { return d.getDate() + "/" + MESES[d.getMonth()] + "/" + d.getFullYear(); }
export function fmtIntervalo(entrada: string, saida: string): string {
  const e = deIso(entrada), s = deIso(saida);
  if (e.getFullYear() === s.getFullYear() && e.getMonth() === s.getMonth()) return e.getDate() + "–" + s.getDate() + " de " + MESES[e.getMonth()] + " de " + e.getFullYear();
  return fmtData(e) + " – " + fmtData(s);
}
export function euros(v: number): string {
  return v.toLocaleString("pt-PT", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " €";
}
