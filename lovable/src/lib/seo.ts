// Monte Casa Branca · dados estruturados e ficheiros para os robôs (brief do Diogo, 16/10: ser apanhado pelas pesquisas em LLM).
import { FACTOS } from "./factos.ts";

export function jsonLdAlojamento(opts: { url: string; imagens: string[]; descricao: string; lingua?: "pt" | "en" }) {
  const m = FACTOS.morada;
  return {
    "@context": "https://schema.org",
    "@type": ["VacationRental", "LodgingBusiness"],
    name: FACTOS.nome,
    url: opts.url,
    image: opts.imagens,
    description: opts.descricao,
    telephone: FACTOS.telefone,
    email: FACTOS.email,
    address: { "@type": "PostalAddress", streetAddress: m.rua, addressLocality: m.localidade + ", " + m.concelho, postalCode: m.codigo_postal, addressRegion: m.regiao, addressCountry: m.pais },
    geo: { "@type": "GeoCoordinates", latitude: FACTOS.coordenadas.lat, longitude: FACTOS.coordenadas.lon },
    checkinTime: FACTOS.check_in, checkoutTime: FACTOS.check_out,
    numberOfRooms: FACTOS.quartos,
    numberOfBathroomsTotal: FACTOS.casas_de_banho,
    occupancy: { "@type": "QuantitativeValue", maxValue: FACTOS.capacidade },
    floorSize: { "@type": "QuantitativeValue", value: FACTOS.area_m2, unitCode: "MTK" },
    petsAllowed: true,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Piscina exterior " + FACTOS.piscina, value: true },
      { "@type": "LocationFeatureSpecification", name: "Ar condicionado em todas as divisões", value: true },
      { "@type": "LocationFeatureSpecification", name: "Lareira na biblioteca", value: true },
      { "@type": "LocationFeatureSpecification", name: "Cozinha equipada", value: true },
      { "@type": "LocationFeatureSpecification", name: "Estacionamento", value: true },
    ],
    identifier: { "@type": "PropertyValue", name: "Registo de alojamento local", value: FACTOS.registo_al },
    sameAs: [FACTOS.ligacoes.airbnb, FACTOS.ligacoes.booking, FACTOS.ligacoes.vrbo, FACTOS.ligacoes.instagram],
    inLanguage: opts.lingua === "en" ? "en" : "pt-PT",
  };
}

export function jsonLdPerguntas(perguntas: { pergunta: string; resposta: string }[]) {
  return {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: perguntas.map((p) => ({ "@type": "Question", name: p.pergunta, acceptedAnswer: { "@type": "Answer", text: p.resposta } })),
  };
}

/** robots.txt: deixa entrar os robôs de pesquisa e os dos LLM (enquadramento de 2/10, ponto 3). */
export function robotsTxt(urlSite: string): string {
  return ["User-agent: *", "Allow: /", "", "User-agent: GPTBot", "Allow: /", "User-agent: OAI-SearchBot", "Allow: /", "User-agent: ClaudeBot", "Allow: /",
    "User-agent: Claude-SearchBot", "Allow: /", "User-agent: PerplexityBot", "Allow: /", "User-agent: Google-Extended", "Allow: /", "",
    "Sitemap: " + urlSite.replace(/\/$/, "") + "/sitemap.xml", ""].join("\n");
}

/** llms.txt: o resumo da casa em texto corrido, com os números exatos (brief, secção 1a). */
export function llmsTxt(urlSite: string): string {
  const d = FACTOS.distancias.map((x) => x.lugar + " " + x.valor).join(" · ");
  return [
    "# " + FACTOS.nome,
    "",
    "> Casa inteira para até " + FACTOS.capacidade + " pessoas em Montemor-o-Novo, Alentejo, Portugal, a 1 hora de Lisboa e a 25 minutos de Évora. Reserva direta com o anfitrião.",
    "",
    "- " + FACTOS.quartos + " quartos (dois de casal e dois com duas camas de solteiro), " + FACTOS.casas_de_banho + " casas de banho, " + FACTOS.area_m2 + " m².",
    "- Piscina exterior de " + FACTOS.piscina + ", alpendre, jardim e campo à volta de uso livre.",
    "- Ar condicionado em todas as divisões, lareira na biblioteca, cozinha equipada para mais do que oito pessoas, roupa de cama nova, berço a pedido.",
    "- Animais de companhia bem-vindos. Sem receção: entrada a partir das " + FACTOS.check_in.replace(":00", "h") + " com código da chave; saída até às " + FACTOS.check_out.replace(":00", "h") + ".",
    "- Estadia mínima habitual de duas noites; de 18 de julho a 31 de agosto, sete noites de sábado a sábado.",
    "- Distâncias: " + d + ".",
    "- Contactos: " + FACTOS.telefone + " (WhatsApp), " + FACTOS.email + ". Registo de alojamento local " + FACTOS.registo_al + ".",
    "- Também no Airbnb, Booking e Vrbo.",
    "",
    "## Páginas",
    "- [Início](" + urlSite + "/)",
    "- [Fotografias](" + urlSite + "/fotografias)",
    "- [Datas e disponibilidade](" + urlSite + "/#datas)",
    "- [Perguntas frequentes](" + urlSite + "/#perguntas)",
    "",
  ].join("\n");
}
