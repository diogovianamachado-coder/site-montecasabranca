// Monte Casa Branca · pedido de datas → pré-reserva na app (porta #191, site_prereserva.php; contrato_portas_v1.md §3).
// O browser nunca fala com a app: o pedido vai ao servidor do site (TanStack server function), que junta o cabeçalho X-Site-Chave
// (segredo só do servidor, variável de ambiente SITE_CHAVE) e chama a app. Sem datas não há pré-reserva: fica uma mensagem simples.
import { deIso, fmtData, fmtIntervalo, euros } from "./datas.ts";
import { FACTOS } from "./factos.ts";
import type { Orcamento } from "./tarifas.ts";

export type Lingua = "pt" | "en";
export type Pedido191 = {
  pedido_id: string; nome: string; email: string; telefone?: string;
  entrada: string; saida: string; pax: number; mensagem?: string;
  preco_mostrado?: number; lingua: Lingua; origem: string;
  segundos_a_preencher?: number; armadilha?: string; confirmo_preco?: boolean;
};
export type Resposta191 =
  | { ok: true; codigo?: string; mensagem?: string }
  | { ok: false; erro: "campos" | "ocupado" | "preco" | "min_noites" | "verao_sabado" | "chave" | "limite" | string; mensagem?: string; campos?: string[]; preco_mostrado?: number; preco_app?: number };

export function uuid(): string {
  const c = globalThis.crypto as Crypto | undefined;
  if (c?.randomUUID) return c.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (ch) => { const r = (Math.random() * 16) | 0; return (ch === "x" ? r : (r & 3) | 8).toString(16); });
}

export function novoPedido(R: Pick<Orcamento, "entrada" | "saida" | "pax" | "total">, dados: { nome: string; email: string; telefone?: string; mensagem?: string; lingua?: Lingua; origem?: string; segundos_a_preencher?: number; armadilha?: string }): Pedido191 {
  return {
    pedido_id: uuid(), nome: dados.nome.trim(), email: dados.email.trim(), telefone: dados.telefone?.trim() || undefined,
    entrada: R.entrada, saida: R.saida, pax: R.pax, mensagem: dados.mensagem?.trim() || undefined,
    preco_mostrado: R.total, lingua: dados.lingua || "pt", origem: dados.origem || "inicio",
    segundos_a_preencher: dados.segundos_a_preencher, armadilha: dados.armadilha || "",
  };
}

export function emailValido(e: string): boolean { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e.trim()); }

/** O texto que vai no WhatsApp/email quando há datas (o mesmo do kit). */
export function textoPedido(R: Pick<Orcamento, "entrada" | "saida" | "noites" | "pax" | "total">, extra: { nome?: string; mensagem?: string } = {}): string {
  let t = "Olá Diogo, gostávamos de ficar no Monte Casa Branca de " + fmtData(deIso(R.entrada)) + " a " + fmtData(deIso(R.saida)) + " (" + R.noites + " noites, " + R.pax + " pessoas).";
  if (R.total) t += " Vi no site o valor de " + euros(R.total) + ".";
  if (extra.nome) t += " Sou " + extra.nome + ".";
  if (extra.mensagem) t += " " + extra.mensagem;
  return t;
}
/** Mensagem simples, sem datas (não é pré-reserva). */
export function textoMensagem(extra: { nome?: string; mensagem?: string } = {}): string {
  let t = "Olá!"; if (extra.nome) t += " Sou " + extra.nome + ".";
  return t + " " + (extra.mensagem || "Gostávamos de saber mais sobre o Monte Casa Branca.");
}
export function ligacaoWhatsApp(texto: string): string { return "https://wa.me/" + FACTOS.whatsapp + "?text=" + encodeURIComponent(texto); }
export function ligacaoEmail(assunto: string, texto: string): string { return "mailto:" + FACTOS.email + "?subject=" + encodeURIComponent(assunto) + "&body=" + encodeURIComponent(texto); }
export function assuntoPedido(R: Pick<Orcamento, "entrada" | "saida">): string { return "Pedido de datas · " + fmtIntervalo(R.entrada, R.saida); }

/**
 * Só no servidor. Envia o pedido à app com a chave; devolve a resposta tal e qual (200 ok; 200/409 com ok:false e o erro; 401 chave; 429 limite).
 * Uso numa server function do TanStack Start:
 *   const enviar = createServerFn({ method: "POST" }).validator(...).handler(({ data }) => enviarPrereserva(process.env.APP_URL!, process.env.SITE_CHAVE!, data))
 */
export async function enviarPrereserva(appUrl: string, chave: string, pedido: Pedido191, fetchImpl: typeof fetch = fetch): Promise<Resposta191> {
  const r = await fetchImpl(appUrl.replace(/\/$/, "") + "/site_prereserva.php", {
    method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json", "X-Site-Chave": chave }, body: JSON.stringify(pedido),
  });
  let corpo: unknown = null;
  try { corpo = await r.json(); } catch { corpo = null; }
  if (corpo && typeof corpo === "object" && "ok" in (corpo as object)) return corpo as Resposta191;
  return { ok: false, erro: "servidor", mensagem: "Não foi possível registar o pedido (" + r.status + "); falem connosco pelo WhatsApp ou email." };
}
