import { describe, it, expect } from "vitest";
import { orcamento, porDoSol, epocaDe } from "@/lib/tarifas";
import { classeTempo, tempoDaEstadia, tempoExemplo } from "@/lib/tempo";
import { noitesOcupadas, intervaloLivre, OCUPACAO_EXEMPLO } from "@/lib/ocupacao";
import { textoPedido, novoPedido, emailValido } from "@/lib/pedido";

const hoje = new Date(2026, 9, 25, 12);

describe("tarifas e regras da casa (FACTOS §4)", () => {
  it("Maio 2027: 3 noites × 330 € + limpeza 180 € = 1 170 €", () => {
    const r = orcamento("2027-05-14", "2027-05-17", 8, { hoje });
    expect(r.ok).toBe(true); expect(r.noites).toBe(3); expect(r.epoca).toBe("Maio"); expect(r.dormidas).toBe(990); expect(r.limpeza).toBe(180); expect(r.total).toBe(1170);
  });
  it("verão: sábado a sábado, 7 noites → 410 × 7 + 180 = 3 050 €", () => {
    const r = orcamento("2027-07-24", "2027-07-31", 6, { hoje });
    expect(r.ok).toBe(true); expect(r.total).toBe(3050);
  });
  it("verão: 4 noites a meio da semana → recusa com verao_sabado", () => {
    const r = orcamento("2027-07-24", "2027-07-28", 6, { hoje });
    expect(r.ok).toBe(false); expect(r.erro).toBe("verao_sabado"); expect(r.min_noites).toBe(7);
  });
  it("inverno: 1 noite → mínimo 2", () => {
    const r = orcamento("2027-02-05", "2027-02-06", 2, { hoje });
    expect(r.ok).toBe(false); expect(r.erro).toBe("min_noites");
  });
  it("janeiro, 28 noites → preço mensal 4 000 € + limpeza", () => {
    const r = orcamento("2027-01-04", "2027-02-01", 4, { hoje });
    expect(r.ok).toBe(true); expect(r.mensal).toBe(true); expect(r.dormidas).toBe(4000); expect(r.total).toBe(4180);
  });
  it("9 pessoas → recusa; data passada → recusa", () => {
    expect(orcamento("2027-05-14", "2027-05-17", 9, { hoje }).erro).toBe("pax");
    expect(orcamento("2026-10-01", "2026-10-03", 2, { hoje }).erro).toBe("passado");
  });
  it("saída ao domingo avisa do pôr do sol", () => {
    const r = orcamento("2027-05-14", "2027-05-16", 8, { hoje });
    expect(r.ok).toBe(true); expect(r.avisos.some((a) => a.includes("pôr do sol"))).toBe(true);
  });
  it("2026 usa a limpeza de 170 €; um ano sem tarifa avisa", () => {
    expect(epocaDe("2026-12-20")?.limpeza).toBe(170);
    expect(epocaDe("2028-05-10")?.aviso).toContain("2028");
  });
  it("pôr do sol em junho fica entre as 20h e as 22h, formato «20h47»", () => {
    const p = porDoSol("2027-06-21");
    expect(p).toMatch(/^\d{2}h\d{2}$/); expect(Number(p.slice(0, 2))).toBeGreaterThanOrEqual(20); expect(Number(p.slice(0, 2))).toBeLessThanOrEqual(22);
  });
});

describe("tempo", () => {
  it("códigos WMO → classes", () => {
    expect(classeTempo(0).classe).toBe("sol"); expect(classeTempo(61).classe).toBe("chuva"); expect(classeTempo(95).classe).toBe("trovoada");
  });
  it("estadia além da previsão usa a média mensal, marcada", () => {
    const prev = tempoExemplo(hoje);
    const r = tempoDaEstadia("2026-11-20", "2026-11-22", prev);
    expect(r.dias).toHaveLength(3); expect(r.dias.every((d) => d.media)).toBe(true);
  });
});

describe("ocupação (porta #189)", () => {
  it("saída exclusiva: 4→6 de dezembro ocupa 4 e 5, não 6", () => {
    const s = noitesOcupadas(OCUPACAO_EXEMPLO);
    expect(s.has("2026-12-04")).toBe(true); expect(s.has("2026-12-05")).toBe(true); expect(s.has("2026-12-06")).toBe(false);
    expect(intervaloLivre("2026-12-06", "2026-12-09", s)).toBe(true); expect(intervaloLivre("2026-12-03", "2026-12-05", s)).toBe(false);
  });
});

describe("pedido (porta #191)", () => {
  it("texto e pedido com os campos do contrato", () => {
    const r = orcamento("2027-05-14", "2027-05-17", 8, { hoje });
    expect(textoPedido(r, { nome: "Ana" })).toContain("14/mai/2027 a 17/mai/2027 (3 noites, 8 pessoas). Vi no site o valor de 1170 €. Sou Ana.");
    const p = novoPedido(r, { nome: "Ana", email: "ana@exemplo.pt", origem: "inicio" });
    expect(p.pedido_id).toMatch(/^[0-9a-f-]{36}$/); expect(p.preco_mostrado).toBe(1170); expect(p.lingua).toBe("pt");
    expect(emailValido("ana@exemplo.pt")).toBe(true); expect(emailValido("ana@")).toBe(false);
  });
});
