import { createFileRoute } from "@tanstack/react-router";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowUpRight,
  BedDouble,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Cloud,
  CloudRain,
  CloudSun,
  Instagram,
  Mail,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Sun,
  Users,
  Waves,
  X,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import logo from "@/assets/logotipo.png.asset.json";
import { CLEANING_FEE, formatEuro, NIGHT_PRICE, nightsBetween, stayTotal } from "@/lib/stay";

const TITLE = "Monte Casa Branca · Casa inteira no Alentejo, Montemor-o-Novo";
const DESC = "Uma casa inteira no Alentejo: 4 quartos, até 8 pessoas, piscina 10 × 5 m. Montemor-o-Novo, a 1 h de Lisboa.";
const PHOTO_BASE = "https://novo.montecasabranca.pt/fotos/";
const HERO_URL = `${PHOTO_BASE}exterior/piscina-dia.jpg`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:image", content: HERO_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: HERO_URL },
    ],
  }),
  component: Index,
});

const WA = "https://wa.me/351962802626";
const EMAIL = "geral@montecasabranca.pt";
const IG = "https://www.instagram.com/monte_casa_branca/";
const MAPS = "https://www.google.com/maps/search/Monte+Casa+Branca/@38.6142917,-8.211253,16z";

const btn = "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-300";
const btnPrimary = `${btn} bg-primary text-primary-foreground hover:brightness-110`;
const btnOutline = `${btn} border border-current hover:bg-foreground/5`;
const btnOutlinePhoto = `${btn} border border-on-photo/80 text-on-photo hover:bg-on-photo/15`;

type Foto = { src: string; alt: string; pos?: string; portrait?: boolean };
const f = (path: string, alt: string, pos = "center", portrait = false): Foto => ({
  src: `${PHOTO_BASE}${path}`,
  alt,
  pos,
  portrait,
});
const mobileSrc = (src: string) => src.replace(/\.jpg$/, "-m.jpg");

const POR_FORA: Foto[] = [
  f("exterior/piscina-agua.jpg", "A piscina, a casa e a luz do Alentejo"),
  f("exterior/piscina-sobreiro.jpg", "Ficar até a luz mudar"),
  f("exterior/casa-oliveira.jpg", "A casa, entre as árvores"),
  f("quinta/ovelhas.jpg", "E, de vez em quando, ovelhas"),
];
const SEM_PRESSA: Foto[] = [
  f("exterior/alpendre-por-do-sol.jpg", "O alpendre, ao fim da tarde"),
  f("exterior/alpendre-mesa-jantar.jpg", "Lugar para todos à mesa"),
  f("exterior/alpendre.jpg", "Dois copos e a tarde inteira"),
  f("exterior/alpendre-dia.jpg", "Almoçar com o campo em frente"),
];
const POR_DENTRO: Foto[] = [
  f("interior/sala-portas.jpg", "O salão, de portas abertas", "50% 40%"),
  f("interior/sala-mesa-sofa.jpg", "À mesa cabem todos"),
  f("interior/cozinha.jpg", "A cozinha, pronta para mais do que oito"),
  f("interior/biblioteca-tapete-azul.jpg", "Livros, lareira e uma tarde inteira"),
  f("quartos/quarto.jpg", "Quatro quartos para descansar"),
];
const DESCOBRIR: Foto[] = [
  f("exterior/piscina-chapeu-sol.jpg", "Piscina e chapéu de sol"),
  f("interior/salao-tecto-madeira.jpg", "O teto de madeira do salão"),
  f("quartos/quarto-casal-comoda.jpg", "Quarto de casal e cómoda"),
  f("exterior/casa-campo-entardecer.jpg", "A casa e o campo ao entardecer"),
  f("interior/cozinha-ilha.jpg", "A ilha da cozinha"),
  f("exterior/por-do-sol.jpg", "O pôr do sol no Monte", "center", true),
  f("quartos/quarto-duas-camas.jpg", "Quarto com duas camas"),
  f("exterior/alpendre-vista-pinheiros.jpg", "Os pinheiros vistos do alpendre"),
  f("interior/sala-poltronas.jpg", "As poltronas da sala"),
  f("exterior/piscina-noite.jpg", "A piscina à noite"),
  f("quinta/olival.jpg", "O olival da quinta"),
  f("interior/lareira-acesa.jpg", "A lareira acesa", "center", true),
  f("exterior/casa-ceu-rosa.jpg", "A casa sob o céu rosa"),
  f("interior/sala-mesa.jpg", "A mesa da sala"),
  f("quinta/cao-campo.jpg", "O cão no campo"),
  f("exterior/casa-tronco-oliveira.jpg", "A casa e o tronco da oliveira"),
  f("interior/biblioteca-sofa.jpg", "O sofá da biblioteca"),
  f("exterior/sombra-arvore-parede.jpg", "A sombra da árvore na parede"),
  f("exterior/casa-lua.jpg", "A casa e a lua"),
];
const MONTEMOR: Foto[] = [
  f("montemor/castelo-ruinas.jpg", "O castelo, lá no alto"),
  f("montemor/vila-muralha.jpg", "A vila, vista da muralha"),
  f("montemor/rua-branca-azul.jpg", "Ruas de cal e barras azuis"),
  f("montemor/caminho-arvores-bicicleta.jpg", "De bicicleta, à sombra"),
  f("montemor/igreja-fachada.jpg", "Branco, azul e azulejo"),
  f("montemor/estacao-paiao.jpg", "A antiga estação do Paião, na ecopista"),
  f("montemor/castelo-porta-vista.jpg", "Uma porta para a planície"),
  f("montemor/janela-flores.jpg", "Janelas com flores"),
  f("montemor/montado-bicicleta.jpg", "O montado, logo ali"),
  f("montemor/miradouro-candeeiros.jpg", "Parar no miradouro"),
];
const ALBUNS: { nome: string; fotos: Foto[] }[] = [
  {
    nome: "O Monte",
    fotos: [
      f("exterior/casa-campo-entardecer.jpg", "A casa e o campo ao entardecer"),
      f("exterior/piscina-pinheiro-manha.jpg", "A piscina e o pinheiro, de manhã"),
      f("exterior/alpendre-por-do-sol.jpg", "O alpendre, ao fim da tarde"),
      f("exterior/piscina-chapeu-sol.jpg", "Piscina e chapéu de sol"),
      f("exterior/piscina-dia.jpg", "A piscina e a casa durante o dia"),
      f("interior/sala-portas.jpg", "O salão, de portas abertas"),
      f("interior/cozinha.jpg", "A cozinha, pronta para mais do que oito"),
      f("interior/biblioteca-tapete-azul.jpg", "Livros, lareira e uma tarde inteira"),
    ],
  },
  {
    nome: "Os Quartos",
    fotos: [
      f("quartos/quarto-2.jpg", "Um dos quatro quartos"),
      f("quartos/quarto-casal-comoda.jpg", "Quarto de casal e cómoda"),
      f("quartos/quarto-duas-camas.jpg", "Quarto com duas camas"),
      f("quartos/quarto-amarelo.jpg", "O quarto amarelo"),
      f("quartos/casa-de-banho.jpg", "Uma das casas de banho"),
      f("quartos/casa-de-banho-marmore.jpg", "Casa de banho em mármore", "center", true),
    ],
  },
  {
    nome: "A Quinta",
    fotos: [
      f("quinta/casa-pinheiro-terreno.jpg", "A casa, o pinheiro e o terreno"),
      f("quinta/casa-piscina-campo.jpg", "A casa e a piscina no campo"),
      f("quinta/piscina-por-do-sol.jpg", "A piscina ao pôr do sol"),
      f("quinta/casa-ao-longe-campo.jpg", "A casa ao longe, no campo"),
      f("quinta/ovelhas.jpg", "E, de vez em quando, ovelhas"),
      f("quinta/olival.jpg", "O olival da quinta"),
    ],
  },
  {
    nome: "Montemor-o-Novo",
    fotos: [
      f("montemor/castelo-ruinas.jpg", "O castelo, lá no alto"),
      f("montemor/vila-muralha.jpg", "A vila, vista da muralha"),
      f("montemor/rua-branca-azul.jpg", "Ruas de cal e barras azuis"),
      f("montemor/igreja-fachada.jpg", "Branco, azul e azulejo"),
      f("montemor/estacao-paiao.jpg", "A antiga estação do Paião, na ecopista"),
      f("montemor/miradouro-candeeiros.jpg", "Parar no miradouro"),
    ],
  },
];

function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Monte Casa Branca"
      className={`logo-mask block aspect-[837/298] ${className}`}
      style={{ maskImage: `url(${logo.url})`, WebkitMaskImage: `url(${logo.url})` }}
    />
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        el.classList.add("is-in");
        io.disconnect();
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [locked]);
}

function PhotoImage({ foto, className = "", eager = false, sizes }: { foto: Foto; className?: string; eager?: boolean; sizes?: string }) {
  return (
    <picture className="block h-full w-full">
      <source media="(max-width: 767px)" srcSet={mobileSrc(foto.src)} />
      <img
        src={foto.src}
        alt={foto.alt}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
        draggable={false}
        className={`h-full w-full object-cover ${className}`}
        style={{ objectPosition: foto.pos ?? "center" }}
      />
    </picture>
  );
}

function GaleriaOverlay({ nome, fotos, onClose, start = 0 }: { nome: string; fotos: Foto[]; onClose: () => void; start?: number }) {
  const [idx, setIdx] = useState(start);
  const touchX = useRef<number | null>(null);
  const foto = fotos[idx] ?? fotos[0];
  const next = useCallback(() => setIdx((i) => (i + 1) % fotos.length), [fotos.length]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + fotos.length) % fotos.length), [fotos.length]);
  useBodyLock(true);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, next, prev]);
  return (
    <div
      className="fixed inset-0 z-50 flex h-[100svh] flex-col bg-foreground/95 text-on-photo animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`Galeria: ${nome}`}
      onTouchStart={(event) => { touchX.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => {
        if (touchX.current == null) return;
        const distance = (event.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
        if (Math.abs(distance) > 45) (distance < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      <div className="flex shrink-0 items-center justify-between gap-4 p-5 md:px-8">
        <p className="text-xs tracking-[0.16em] uppercase opacity-80 md:text-sm">{nome} · {idx + 1} / {fotos.length}</p>
        <button autoFocus onClick={onClose} aria-label="Fechar galeria" className="shrink-0 rounded-full border border-on-photo/40 p-2 hover:bg-on-photo/15">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-14 pb-4 md:px-20">
        {fotos.length > 1 && (
          <>
            <button onClick={prev} aria-label="Fotografia anterior" className="absolute left-3 z-10 rounded-full border border-on-photo/40 p-2 hover:bg-on-photo/15 md:left-6">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={next} aria-label="Próxima fotografia" className="absolute right-3 z-10 rounded-full border border-on-photo/40 p-2 hover:bg-on-photo/15 md:right-6">
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
        {foto && <PhotoImage foto={foto} className="object-contain" sizes="100vw" />}
      </div>
      <p className="shrink-0 px-6 pb-6 text-center text-sm opacity-85 md:text-base">{foto?.alt}</p>
    </div>
  );
}

function Sequencia({ nome, fotos, onOpen }: { nome: string; fotos: Foto[]; onOpen: (index: number) => void }) {
  const track = useRef<HTMLUListElement>(null);
  const paused = useRef(false);
  const scrollTimer = useRef<number | undefined>(undefined);
  const [active, setActive] = useState(0);
  const goTo = useCallback((index: number) => {
    const element = track.current;
    if (!element) return;
    const wrapped = (index + fotos.length) % fotos.length;
    const item = element.children[wrapped] as HTMLElement | undefined;
    if (!item) return;
    const padding = Number.parseFloat(window.getComputedStyle(element).paddingLeft) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollTo({ left: wrapped === 0 ? 0 : item.offsetLeft - padding, behavior: reduce ? "auto" : "smooth" });
    setActive(wrapped);
  }, [fotos.length]);

  useEffect(() => {
    if (fotos.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      if (!paused.current) goTo(active + 1);
    }, 5200);
    return () => window.clearInterval(interval);
  }, [active, fotos.length, goTo]);

  useEffect(() => () => window.clearTimeout(scrollTimer.current), []);

  const updateActive = () => {
    window.clearTimeout(scrollTimer.current);
    scrollTimer.current = window.setTimeout(() => {
      const element = track.current;
      if (!element) return;
      const items = Array.from(element.children) as HTMLElement[];
      const nearest = items.reduce((best, item, index) => {
        const bestDistance = Math.abs((items[best]?.offsetLeft ?? 0) - element.scrollLeft);
        return Math.abs(item.offsetLeft - element.scrollLeft) < bestDistance ? index : best;
      }, 0);
      setActive(nearest);
    }, 120);
  };

  return (
    <div className="mt-10 md:mt-14" onPointerDown={() => { paused.current = true; }}>
      <div className="mx-auto mb-4 flex max-w-7xl items-center justify-between px-5 md:px-10">
        <p className="text-xs tracking-[0.18em] text-muted-foreground" aria-live="off">{String(active + 1).padStart(2, "0")} / {String(fotos.length).padStart(2, "0")}</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => goTo(active - 1)} aria-label={`Fotografia anterior em ${nome}`} className="rounded-full border p-2 transition-colors hover:bg-foreground/5"><ChevronLeft className="h-4 w-4" /></button>
          <button type="button" onClick={() => goTo(active + 1)} aria-label={`Fotografia seguinte em ${nome}`} className="rounded-full border p-2 transition-colors hover:bg-foreground/5"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
      <ul
        ref={track}
        onScroll={updateActive}
        className="photo-sequence relative flex snap-x snap-proximity gap-3 overflow-x-auto px-5 pb-3 md:gap-5 md:px-10"
        aria-label={`${nome}: deslizar para ver as fotografias`}
      >
        {fotos.map((foto, index) => (
          <li key={foto.src} className="h-[360px] w-[86vw] max-w-[430px] shrink-0 snap-start md:h-[560px] md:w-[760px] md:max-w-none">
            <button type="button" onClick={() => onOpen(index)} className="group relative block h-full w-full overflow-hidden rounded-sm text-left" aria-label={`${foto.alt} · abrir em ecrã inteiro`}>
              <PhotoImage foto={foto} className="transition-transform duration-1000 group-hover:scale-[1.025]" sizes="(max-width: 767px) 86vw, 760px" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/75 to-transparent px-5 pb-5 pt-16 text-sm text-on-photo md:px-6 md:pb-6 md:text-base">{foto.alt}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Hero() {
  const heroFoto = f("exterior/piscina-dia.jpg", "Piscina da casa sob o céu azul do Alentejo, com a casa branca de telhado vermelho ao fundo", "40% 60%");
  const desktopNav = [
    ["Montemor-o-Novo", "#montemor"],
    ["N2", "#nacional2"],
    ["Passear pelo Monte", "#galeria"],
    ["Antes de chegar", "#antes-de-chegar"],
    ["Avaliações", "#avaliacoes"],
  ];
  return (
    <section id="inicio" className="relative h-[100svh] min-h-[680px] overflow-hidden text-on-photo">
      <div className="hero-parallax absolute inset-0">
        <PhotoImage foto={heroFoto} eager className="hero-photo scale-[1.06]" sizes="100vw" />
      </div>
      <div className="hero-shade absolute inset-0" />
      <header className="relative z-10 mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-10 md:py-7">
        <a href="#inicio" aria-label="Monte Casa Branca · início" className="w-32 md:w-36"><Logo /></a>
        <nav aria-label="Navegação principal" className="hidden items-center gap-6 text-sm lg:flex">
          {desktopNav.map(([label, href]) => <a key={href} href={href} className="transition-opacity hover:opacity-70">{label}</a>)}
        </nav>
      </header>
      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-7xl px-5 pb-24 md:px-10 md:pb-24">
        <h1 className="max-w-5xl text-[2.5rem] leading-[1.04] animate-in fade-in slide-in-from-bottom-6 duration-1000 md:text-7xl">
          Uma casa inteira
          <span className="mt-1 block whitespace-nowrap pl-6 text-[0.76em] md:pl-24">O Alentejo à vossa porta</span>
        </h1>
        <p className="mt-5 text-base opacity-95 md:text-lg">Monte Casa Branca · Montemor-o-Novo, a 1 h de Lisboa</p>
        <ul className="mt-5 flex flex-wrap gap-2 text-xs md:text-sm">
          {[[Users, "Até 8 pessoas"], [BedDouble, "4 quartos"], [Waves, "Piscina 10 × 5 m"]].map(([Icon, text]) => {
            const IconComponent = Icon as typeof Users;
            return <li key={text as string} className="flex items-center gap-2 rounded-full border border-on-photo/40 bg-on-photo/10 px-3 py-1.5"><IconComponent className="h-4 w-4" />{text as string}</li>;
          })}
        </ul>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <a href="#a-casa" className={btnOutlinePhoto}>Entrar pela casa</a>
          <p className="font-serif text-sm italic opacity-90">Sem receção, sem pressa</p>
        </div>
      </div>
      <a href="#a-casa" aria-label="Descer para o cartaz A casa" className="absolute bottom-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-on-photo/60 text-on-photo transition-colors hover:bg-on-photo/15 md:bottom-6 md:left-1/2 md:right-auto md:-translate-x-1/2">
        <ChevronDown className="h-5 w-5 motion-safe:animate-bounce" aria-hidden />
      </a>
    </section>
  );
}

function Cartaz() {
  const palavras = [["Por fora", "#por-fora"], ["Sem pressa", "#sem-pressa"], ["Por dentro", "#por-dentro"]];
  return (
    <section id="a-casa" className="flex min-h-[100svh] scroll-mt-0 items-center py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
        <Reveal>
          <p className="eyebrow">A casa</p>
          <div className="mt-8 md:mt-10">
            {palavras.map(([palavra, href], index) => (
              <a key={href} href={href} className="group flex items-center justify-between border-t py-4 font-serif text-[3.25rem] leading-none transition-colors hover:text-primary md:py-6 md:text-8xl">
                <span>{palavra}</span>
                <ArrowUpRight className="h-7 w-7 shrink-0 text-primary transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:h-10 md:w-10" aria-hidden />
                {index === 2 && <span className="sr-only">Capítulo Por dentro</span>}
              </a>
            ))}
            <div className="border-t" />
          </div>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-foreground/85 md:ml-auto md:text-xl">Uma casa inteira, só vossa, para abrir as portas e deixar o dia acontecer</p>
        </Reveal>
      </div>
    </section>
  );
}

function Capitulo({ id, titulo, frase, texto, nota, fotos, pale = false }: { id: string; titulo: string; frase: string; texto: string; nota?: string; fotos: Foto[]; pale?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id={id} className={`scroll-mt-0 py-24 md:py-36 ${pale ? "bg-pale" : ""}`}>
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <p className="eyebrow">A casa</p>
          <h2 className="mt-4 text-6xl leading-none md:text-8xl">{titulo}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-12 md:items-start">
            <p className="font-serif text-2xl leading-snug text-primary md:col-span-5 md:text-4xl">{frase}</p>
            <div className="md:col-span-6 md:col-start-7">
              <p className="max-w-xl text-lg leading-relaxed text-foreground/85 md:text-xl">{texto}</p>
              {nota && <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">{nota}</p>}
            </div>
          </div>
        </Reveal>
      </div>
      <Reveal delay={100}><Sequencia nome={titulo} fotos={fotos} onOpen={setOpen} /></Reveal>
      {open != null && <GaleriaOverlay nome={titulo} fotos={fotos} start={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

function FechoCasa() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="overflow-hidden py-24 md:py-36" aria-labelledby="fecho-casa-titulo">
      <Reveal className="mx-auto max-w-7xl px-5 md:px-10">
        <h2 id="fecho-casa-titulo" className="max-w-5xl font-serif text-4xl leading-tight md:text-7xl">Há dias em que não é preciso mais nada</h2>
        <div className="mt-16 flex flex-wrap items-end justify-between gap-4 md:mt-24">
          <h3 className="text-2xl md:text-3xl">Há mais casa para descobrir</h3>
          <a href="#galeria" className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">Passear pelo Monte<ArrowUpRight className="h-4 w-4" /></a>
        </div>
      </Reveal>
      <ul className="photo-sequence mt-8 flex snap-x snap-proximity gap-3 overflow-x-auto px-5 pb-3 md:gap-4 md:px-10" aria-label="Mais fotografias da casa, deslizar para ver">
        {DESCOBRIR.map((foto, index) => (
          <li key={foto.src} className={`shrink-0 snap-start ${foto.portrait ? "h-[290px] w-[190px] md:h-[360px] md:w-[240px]" : "h-[220px] w-[290px] self-end md:h-[280px] md:w-[380px]"}`}>
            <button type="button" onClick={() => setOpen(index)} className="h-full w-full overflow-hidden rounded-sm" aria-label={`${foto.alt} · abrir em ecrã inteiro`}>
              <PhotoImage foto={foto} className="transition-transform duration-1000 hover:scale-[1.03]" sizes="380px" />
            </button>
          </li>
        ))}
      </ul>
      {open != null && <GaleriaOverlay nome="Há mais casa para descobrir" fotos={DESCOBRIR} start={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

function MontemorSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="montemor" className="scroll-mt-0 border-t bg-pale py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <p className="eyebrow">A 1 h de Lisboa</p>
          <h2 className="mt-4 max-w-5xl text-5xl leading-[1.06] md:text-7xl">Montemor-o-Novo também é a estadia</h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/85 md:ml-auto md:text-xl">Subir ao castelo, descobrir as ruas e escolher onde parar à mesa. A casa fica a 3 km do centro e Évora a 25 minutos</p>
          <a href="https://www.visitmontemornovo.com/" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline md:float-right">Visitar Montemor-o-Novo<ArrowUpRight className="h-4 w-4" /></a>
        </Reveal>
      </div>
      <Reveal delay={100}><Sequencia nome="Montemor-o-Novo" fotos={MONTEMOR} onOpen={setOpen} /></Reveal>
      <Reveal className="mx-auto mt-16 max-w-7xl px-5 md:mt-24 md:px-10">
        <div className="grid gap-6 border-t pt-8 md:grid-cols-12 md:pt-10">
          <h3 className="font-serif text-3xl md:col-span-4 md:text-4xl">Ecopista do Montado</h3>
          <div className="md:col-span-7 md:col-start-6">
            <p className="text-lg leading-relaxed text-foreground/85">A Ecopista do Montado passa à nossa porta: a antiga linha de comboio, hoje caminho entre sobreiros, para fazer a pé ou de bicicleta</p>
            <a href="https://www.infraestruturasdeportugal.pt/pt-pt/node/66" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">Conhecer a ecopista<ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </div>
      </Reveal>
      {open != null && <GaleriaOverlay nome="Montemor-o-Novo" fotos={MONTEMOR} start={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

function Nacional2() {
  const casa = f("exterior/casa-ceu-rosa.jpg", "A mesma casa à vossa espera ao fim do dia");
  const programa = [
    ["Sexta", "Chegar, abrir as portas e deixar a estrada lá fora"],
    ["Sábado", "O mercado de manhã, a subida ao castelo e o fim da tarde entre a piscina e o alpendre"],
    ["Domingo", "Évora a 25 minutos e, se ninguém entrar a seguir, a casa é vossa até ao fim da tarde"],
  ];
  return (
    <section id="nacional2" className="scroll-mt-0 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <p className="eyebrow">Nacional 2 · No caminho, uma casa</p>
          <h2 className="mt-4 max-w-5xl text-5xl leading-[1.06] md:text-7xl">Dois dias no coração do Alentejo</h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/85 md:ml-auto md:text-xl">Na viagem pela Nacional 2, façam de Montemor uma pausa de duas noites. Um dia para a vila, outro para Évora, e a mesma casa à vossa espera ao fim do dia</p>
        </Reveal>
        <Reveal className="mt-12 md:mt-16" delay={100}>
          <div className="h-[340px] w-full overflow-hidden rounded-sm md:h-[65svh] md:max-h-[700px]">
            <PhotoImage foto={casa} sizes="(max-width: 767px) 100vw, 1200px" />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">A mesma casa à vossa espera ao fim do dia</p>
        </Reveal>
        <Reveal className="mt-16 md:mt-24">
          <ol className="border-t">
            {programa.map(([dia, texto]) => (
              <li key={dia} className="grid gap-3 border-b py-7 md:grid-cols-12 md:py-9">
                <h3 className="font-serif text-3xl text-primary md:col-span-3 md:text-4xl">{dia}</h3>
                <p className="max-w-2xl text-lg leading-relaxed text-foreground/85 md:col-span-8 md:col-start-5">{texto}</p>
              </li>
            ))}
          </ol>
          <div className="mt-7 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <p className="text-sm text-muted-foreground">Estadia mínima de duas noites. No verão, de sábado a sábado</p>
            <a href="https://www.rotan2.pt/entity/219" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">Montemor-o-Novo na Rota da N2<ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function OndeEstamos() {
  const dist = [["Centro de Montemor-o-Novo", "3 km"], ["Évora", "25 min"], ["Lisboa", "1 h"], ["Comporta", "50 min"], ["Alqueva", "1 h"]];
  return (
    <section id="onde" className="scroll-mt-0 bg-oliva py-20 text-on-photo md:py-28">
      <Reveal className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <h2 className="text-4xl md:col-span-4 md:text-5xl">Onde estamos</h2>
          <div className="md:col-span-7 md:col-start-6">
            <ul className="border-y border-on-photo/25">
              {dist.map(([place, distance]) => <li key={place} className="flex justify-between gap-4 border-b border-on-photo/20 py-4 text-lg last:border-b-0"><span>{place}</span><span className="shrink-0 opacity-75">{distance}</span></li>)}
            </ul>
            <a href={MAPS} target="_blank" rel="noopener noreferrer" className={`${btnOutlinePhoto} mt-8`}><MapPin className="h-4 w-4" />Abrir no Google Maps</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function PassearPeloMonte() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const album = ALBUNS[tab];
  return (
    <section id="galeria" className="mx-auto max-w-7xl scroll-mt-0 px-5 py-24 md:px-10 md:py-36">
      <Reveal>
        <p className="eyebrow">Fotografias</p>
        <h2 className="mt-4 text-5xl md:text-7xl">Passear pelo Monte</h2>
        <p className="mt-4 text-sm text-muted-foreground">Amostra para a pré-visualização</p>
      </Reveal>
      <div role="tablist" aria-label="Álbuns de fotografias" className="photo-sequence mt-10 flex gap-2 overflow-x-auto pb-2">
        {ALBUNS.map((item, index) => (
          <button
            key={item.nome}
            role="tab"
            aria-selected={tab === index}
            aria-controls={`album-${index}`}
            id={`album-tab-${index}`}
            onClick={() => { setTab(index); setOpen(null); }}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${tab === index ? "border-primary bg-primary text-primary-foreground" : "hover:bg-foreground/5"}`}
          >
            {item.nome} <span className="opacity-70">· {item.fotos.length}</span>
          </button>
        ))}
      </div>
      <ul role="tabpanel" id={`album-${tab}`} aria-labelledby={`album-tab-${tab}`} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {album?.fotos.map((foto, index) => (
          <li key={foto.src} className="h-[330px] w-full md:h-[360px]">
            <button type="button" onClick={() => setOpen(index)} className="group h-full w-full overflow-hidden rounded-sm" aria-label={`${foto.alt} · abrir em ecrã inteiro`}>
              <PhotoImage foto={foto} className="transition-transform duration-1000 group-hover:scale-[1.03]" sizes="(max-width: 767px) 100vw, 33vw" />
            </button>
          </li>
        ))}
      </ul>
      {open != null && album && <GaleriaOverlay nome={album.nome} fotos={album.fotos} start={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

const FAQ: [string, string][] = [
  ["A casa é só para nós?", "Sim. A estadia é sempre de casa inteira: até oito pessoas, quatro quartos e a piscina de 10 × 5 m só para o vosso grupo."],
  ["Como estão distribuídos os quartos?", "Dois quartos de casal e dois twin. Se preferirem, um dos twin passa a casal e a casa fica com três quartos de casal e um twin. Há duas casas de banho, uma delas privativa, e ainda um WC social."],
  ["Podemos ir no inverno?", "Podem, e vale a pena: há ar condicionado em todas as divisões e lareira na biblioteca."],
  ["A que horas podemos chegar?", "A entrada é a partir das 16h e a saída até às 11h. Quando ninguém entra no mesmo dia, a saída pode ficar para as 18h, para aproveitarem o dia até ao fim. O Diogo envia as indicações de chegada antes da estadia."],
  ["Qual é a estadia mínima?", "Duas noites, quase todo o ano. De 18 de julho a 31 de agosto, sete noites, de sábado a sábado."],
  ["Os animais também podem vir?", "Podem, são bem-vindos. Digam-nos só quem vem, para deixarmos tudo combinado."],
  ["Como podemos pedir as nossas datas?", "Escolham as datas no calendário e falem connosco por WhatsApp ou email. O pedido só fica confirmado depois de falarem com o Diogo."],
];

function AntesDeChegar() {
  return (
    <section id="antes-de-chegar" className="scroll-mt-0 bg-pale py-24 md:py-36">
      <Reveal className="mx-auto max-w-4xl px-5">
        <p className="eyebrow">Antes de chegar</p>
        <h2 className="mt-4 text-4xl md:text-6xl">Para se sentirem em casa</h2>
        <Accordion type="single" collapsible className="mt-10">
          {FAQ.map(([question, answer]) => (
            <AccordionItem key={question} value={question}>
              <AccordionTrigger className="py-5 text-left text-base hover:no-underline md:text-lg">{question}</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-foreground/80">{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}

const REVIEWS = [
  ["Rodeada por ovelhas, com um pôr do sol magnífico", "Airbnb", "julho de 2026"],
  ["Cozinha ultra moderna muito bem equipada, camas muito confortáveis também", "Booking", "setembro de 2026"],
  ["Uma casa moderna, rodeada por uma quinta. Foi perfeito", "Airbnb", "julho de 2024"],
  ["A casa foi decorada com grande atenção aos detalhes e está muito bem equipada", "Airbnb", "abril de 2023"],
  ["Os bebés também tiveram todo o conforto necessário", "Booking", "março de 2024"],
  ["Excelente design moderno em combinação com a antiga arquitetura alentejana", "Airbnb", "maio de 2024"],
  ["Foi nosso melhor Natal", "Airbnb", "dezembro de 2023"],
  ["O campo aqui é tão bonito. Vamos voltar de certeza", "Vrbo", "janeiro de 2024"],
  ["A casa superou as nossas expectativas e as fotografias", "Airbnb", "outubro de 2023"],
  ["A piscina é maravilhosa e apanha sol até ao final da tarde", "Vrbo", "agosto de 2022"],
] as const;

function Nota({ nome, valor, escala }: { nome: string; valor: string; escala: number }) {
  const percent = (Number(valor.replace(",", ".")) / escala) * 100;
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-24 w-24 md:h-32 md:w-32">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden>
          <circle cx="50" cy="50" r="46" fill="none" stroke="var(--border)" strokeWidth="1.5" />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="100"
            className="rating-arc"
            style={{ "--ring-offset": 100 - percent } as CSSProperties}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-3xl md:text-4xl">{valor}</span>
          <span className="text-xs text-muted-foreground">em {escala}</span>
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold">{nome}</p>
    </div>
  );
}

function Avaliacoes() {
  const [index, setIndex] = useState(0);
  const next = useCallback(() => setIndex((current) => (current + 1) % REVIEWS.length), []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(next, 6000);
    return () => window.clearInterval(interval);
  }, [next]);
  const [quote, source, date] = REVIEWS[index] ?? REVIEWS[0];
  return (
    <section id="avaliacoes" className="scroll-mt-0 py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <h2 className="eyebrow text-center">Quem já ficou</h2>
          <button type="button" onClick={next} aria-label="Passar à avaliação seguinte" className="mt-10 block min-h-[250px] w-full text-center md:min-h-[230px]">
            <figure key={index} className="animate-in fade-in duration-700">
              <blockquote className="mx-auto max-w-4xl font-serif text-3xl leading-snug md:text-5xl">«{quote}»</blockquote>
              <figcaption className="mt-7 text-sm text-muted-foreground">{source} · {date}</figcaption>
            </figure>
          </button>
          <p className="text-center text-xs tracking-[0.18em] text-muted-foreground">{String(index + 1).padStart(2, "0")} / {REVIEWS.length}</p>
        </Reveal>
        <div className="mt-20 grid grid-cols-3 gap-1 md:mx-auto md:mt-28 md:max-w-3xl md:gap-12">
          <Reveal><Nota nome="Booking" valor="10" escala={10} /></Reveal>
          <Reveal delay={100}><Nota nome="Airbnb" valor="4,95" escala={5} /></Reveal>
          <Reveal delay={200}><Nota nome="Google" valor="5,0" escala={5} /></Reveal>
        </div>
        <p className="mt-16 text-center text-sm text-muted-foreground">Recebemos hóspedes desde 2022 · notas de novembro de 2026</p>
      </div>
    </section>
  );
}

function Contactos() {
  return (
    <footer id="contactos" className="scroll-mt-0 bg-oliva pb-28 pt-14 text-on-photo md:pb-24 md:pt-16">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <p className="eyebrow" style={{ color: "var(--on-photo)" }}>Falamos?</p>
          <h2 className="mt-3 max-w-2xl text-3xl leading-tight md:text-5xl">Contem-nos os vossos planos</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed opacity-90">Falem com o Diogo sobre as vossas datas, por WhatsApp ou email</p>
          <ul className="mt-7 grid gap-4 text-base md:grid-cols-3">
            <li><a href={WA} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:underline underline-offset-4"><MessageCircle className="h-5 w-5 shrink-0" />+351 962 802 626</a></li>
            <li><a href={`mailto:${EMAIL}`} className="flex items-center gap-3 break-all hover:underline underline-offset-4"><Mail className="h-5 w-5 shrink-0" />{EMAIL}</a></li>
            <li><a href={IG} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:underline underline-offset-4"><Instagram className="h-5 w-5 shrink-0" />@monte_casa_branca</a></li>
          </ul>
        </Reveal>
        <div className="mt-10 border-t border-on-photo/20 pt-6">
          <Logo className="w-28" />
          <p className="mt-5 text-sm opacity-85">Monte Casa Branca · Montemor-o-Novo · Alentejo · Registo 126450/AL</p>
          <p className="mt-2 max-w-3xl text-xs leading-relaxed opacity-65">Ângulos Castiços, Unipessoal Lda · Fazenda da Casa Branca, Caminho 3, Reguengo, 7050-352 Montemor-o-Novo</p>
        </div>
      </div>
    </footer>
  );
}

const MONTHS = [
  { name: "Novembro 2026", year: 2026, month: 10, busy: [6, 7, 8, 20, 21, 22] },
  { name: "Dezembro 2026", year: 2026, month: 11, busy: [4, 5, 6, 24, 25, 26, 27] },
];

function Month({ m, inD, outD }: { m: (typeof MONTHS)[number]; inD: string; outD: string }) {
  const first = (new Date(m.year, m.month, 1).getDay() + 6) % 7;
  const days = new Date(m.year, m.month + 1, 0).getDate();
  return (
    <div className="min-w-0">
      <p className="mb-3 font-serif text-xl">{m.name}</p>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
        {["S", "T", "Q", "Q", "S", "S", "D"].map((day, index) => <span key={index} className="py-1">{day}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {Array.from({ length: first }).map((_, index) => <span key={`empty-${index}`} />)}
        {Array.from({ length: days }, (_, index) => index + 1).map((day) => {
          const busy = m.busy.includes(day);
          const iso = `${m.year}-${String(m.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const selected = Boolean(inD && outD && iso >= inD && iso < outD);
          return <span key={day} className={`rounded-sm py-2 ${selected ? "bg-primary text-primary-foreground" : busy ? "bg-terra/50 text-muted-foreground line-through" : "bg-card"}`} aria-label={`${day}, ${selected ? "os vossos dias" : busy ? "ocupado" : "livre"}`}>{day}</span>;
        })}
      </div>
    </div>
  );
}

const WEATHER = [
  ["Seg", Sun, 21, 11], ["Ter", CloudSun, 20, 12], ["Qua", Cloud, 18, 12], ["Qui", CloudRain, 16, 10],
  ["Sex", CloudSun, 19, 9], ["Sáb", Sun, 22, 10], ["Dom", Sun, 23, 11],
] as const;

function DisponibilidadePanel({ onClose }: { onClose: () => void }) {
  const [inD, setIn] = useState("2026-11-13");
  const [outD, setOut] = useState("2026-11-16");
  const [people, setPeople] = useState(4);
  const [showExtra, setShowExtra] = useState(false);
  const [requestNote, setRequestNote] = useState(false);
  const nights = nightsBetween(inD, outD);
  const total = stayTotal(nights);
  const field = "mt-1 w-full min-w-0 rounded-md border bg-background px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-ring";
  useBodyLock(true);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const submitExample = (event: FormEvent) => {
    event.preventDefault();
    setRequestNote(true);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 animate-in fade-in md:items-stretch md:justify-end" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="disp-titulo"
        className="flex max-h-[94svh] w-full max-w-xl flex-col overflow-y-auto rounded-t-md bg-background p-5 animate-in slide-in-from-bottom-8 md:h-full md:max-h-none md:rounded-none md:p-8 md:slide-in-from-right-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="eyebrow">Os vossos dias</p>
            <h2 id="disp-titulo" className="mt-2 text-3xl md:text-4xl">Quando vos apetece vir?</h2>
          </div>
          <button autoFocus onClick={onClose} aria-label="Fechar disponibilidade" className="shrink-0 rounded-full border p-2 hover:bg-foreground/5"><X className="h-5 w-5" /></button>
        </div>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">Juntem as pessoas de quem gostam e escolham os dias. Das contas tratamos nós</p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">{MONTHS.map((month) => <Month key={month.name} m={month} inD={inD} outD={outD} />)}</div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><i className="h-3 w-3 rounded-sm border bg-card" />Livre</span>
          <span className="flex items-center gap-1.5"><i className="h-3 w-3 rounded-sm bg-terra/50" />Ocupado</span>
          <span className="flex items-center gap-1.5"><i className="h-3 w-3 rounded-sm bg-primary" />Os vossos dias</span>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Calendário de exemplo · a disponibilidade real é confirmada no pedido</p>

        <div className="mt-10 border-t pt-8">
          <h3 className="text-2xl">As contas, sem surpresas</h3>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <label className="min-w-0 text-sm">Chegada<input type="date" value={inD} onChange={(event) => setIn(event.target.value)} className={field} /></label>
            <label className="min-w-0 text-sm">Partida<input type="date" value={outD} min={inD} onChange={(event) => setOut(event.target.value)} className={field} /></label>
            <label className="col-span-2 min-w-0 text-sm">Quantas pessoas vêm?
              <select value={people} onChange={(event) => setPeople(Number(event.target.value))} className={field}>
                {Array.from({ length: 8 }, (_, index) => index + 1).map((number) => <option key={number} value={number}>{number}</option>)}
              </select>
            </label>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">A casa é só vossa, venham dois ou oito</p>
          <div className="mt-7" aria-live="polite">
            {nights > 0 ? (
              <dl className="border-y">
                <div className="flex items-start justify-between gap-4 border-b py-4">
                  <dt><span className="font-semibold">Estadia</span><span className="mt-1 block text-xs text-muted-foreground">{nights} {nights === 1 ? "noite" : "noites"} — {NIGHT_PRICE} € por noite</span></dt>
                  <dd className="shrink-0 font-serif text-xl">{formatEuro(nights * NIGHT_PRICE)}</dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b py-4">
                  <dt><span className="font-semibold">Limpeza final</span><span className="mt-1 block text-xs text-muted-foreground">uma vez por estadia</span></dt>
                  <dd className="shrink-0 font-serif text-xl">{formatEuro(CLEANING_FEE)}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-4">
                  <dt className="font-semibold">Total da casa</dt>
                  <dd className="font-serif text-3xl text-primary">{formatEuro(total)}</dd>
                </div>
              </dl>
            ) : <p className="font-serif text-xl">Escolham as datas de chegada e partida</p>}
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Quatro quartos, piscina e a casa inteira só para o vosso grupo</p>
          </div>
        </div>

        <div className="mt-10 border-t pt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-sm font-semibold tracking-wide">O tempo no Monte</h3>
            <p className="text-xs text-muted-foreground">Exemplo · Dados: Open-Meteo</p>
          </div>
          <ul className="mt-4 grid grid-cols-7 gap-1 text-center">
            {WEATHER.map(([day, Icon, max, min]) => (
              <li key={day} className="flex flex-col items-center gap-1.5 py-2">
                <span className="text-[11px] text-muted-foreground">{day}</span><Icon className="h-4 w-4 text-primary" aria-hidden />
                <span className="text-xs font-semibold">{max}°</span><span className="text-[11px] text-muted-foreground">{min}°</span>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={submitExample} className="mt-10 border-t pt-8">
          <h3 className="text-2xl leading-tight">Gostam destas datas? Falem com o Diogo</h3>
          <div className="mt-5 grid gap-4">
            <label className="min-w-0 text-sm">Nome<input type="text" name="nome" autoComplete="name" className={field} /></label>
            <label className="min-w-0 text-sm">Email<input type="email" name="email" autoComplete="email" className={field} /></label>
            <div className={`${showExtra ? "block" : "hidden"} md:block`}>
              <label className="min-w-0 text-sm">Telefone<input type="tel" name="telefone" autoComplete="tel" className={field} /></label>
              <label className="mt-4 block min-w-0 text-sm">Mensagem<textarea name="mensagem" rows={3} className={`${field} resize-y`} /></label>
            </div>
          </div>
          <button type="button" onClick={() => setShowExtra((visible) => !visible)} className="mt-4 text-sm font-semibold text-primary underline-offset-4 hover:underline md:hidden" aria-expanded={showExtra}>{showExtra ? "Esconder telefone e mensagem" : "Juntar telefone ou mensagem"}</button>
          <button type="submit" className={`${btnPrimary} mt-6 w-full`}>Pedir estas datas</button>
          {requestNote && <p role="status" className="mt-3 text-sm text-primary">Este protótipo não envia pedidos. Falem com o Diogo por WhatsApp ou email</p>}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a href={WA} target="_blank" rel="noopener noreferrer" className={btnOutline}><MessageCircle className="h-4 w-4" />WhatsApp</a>
            <a href={`mailto:${EMAIL}`} className={btnOutline}><Mail className="h-4 w-4" />Email</a>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">Sem reserva automática e sem pagamentos aqui: o Diogo confirma as datas e o valor</p>
        </form>
      </div>
    </div>
  );
}

function MenuOverlay({ onClose }: { onClose: () => void }) {
  useBodyLock(true);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const items = [
    ["Montemor-o-Novo", "#montemor"],
    ["Nacional 2", "#nacional2"],
    ["Passear pelo Monte", "#galeria"],
    ["Antes de chegar", "#antes-de-chegar"],
    ["Quem já ficou", "#avaliacoes"],
    ["Contactos", "#contactos"],
  ];
  return (
    <div className="fixed inset-0 z-50 h-[100svh] overflow-y-auto bg-background p-5 text-foreground animate-in fade-in md:p-10" role="dialog" aria-modal="true" aria-label="Menu principal">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Logo className="w-32" />
        <button autoFocus onClick={onClose} aria-label="Fechar menu" className="rounded-full border p-2 hover:bg-foreground/5"><X className="h-5 w-5" /></button>
      </div>
      <nav aria-label="Menu" className="mx-auto mt-10 flex w-full max-w-7xl flex-col md:mt-16">
        <div className="border-t py-4">
          <a href="#a-casa" onClick={onClose} className="font-serif text-3xl transition-colors hover:text-primary md:text-5xl">A casa</a>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <a href="#por-fora" onClick={onClose} className="hover:text-primary">Por fora</a>
            <a href="#sem-pressa" onClick={onClose} className="hover:text-primary">Sem pressa</a>
            <a href="#por-dentro" onClick={onClose} className="hover:text-primary">Por dentro</a>
          </div>
        </div>
        {items.map(([label, href]) => (
          <a key={href} href={href} onClick={onClose} className="border-t py-4 font-serif text-3xl leading-tight transition-colors hover:text-primary md:text-5xl">{label}</a>
        ))}
      </nav>
      <div className="mx-auto mt-8 flex w-full max-w-7xl flex-wrap gap-4 border-t pt-6 text-sm text-muted-foreground">
        <a href={WA} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">WhatsApp</a>
        <a href={`mailto:${EMAIL}`} className="hover:text-foreground">{EMAIL}</a>
      </div>
    </div>
  );
}

function Acompanhamento() {
  const [show, setShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dispOpen, setDispOpen] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => setShow(!entry?.isIntersecting), { threshold: 0.05 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);
  const visibility = show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0";
  return (
    <>
      <div className={`fixed inset-x-0 bottom-0 z-40 transition-all duration-500 ${visibility}`}>
        <div className="flex items-center justify-between gap-2 border-t bg-background/95 px-3 py-3 backdrop-blur-sm md:px-8">
          <button onClick={() => setMenuOpen(true)} className="flex shrink-0 items-center gap-1.5 text-xs font-semibold hover:text-primary md:text-sm" aria-label="Abrir menu">
            <MenuIcon className="h-4 w-4" />Menu
          </button>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="flex shrink-0 items-center gap-1.5 rounded-md border border-current px-2.5 py-2 text-xs font-semibold hover:bg-foreground/5 md:px-4 md:text-sm"><MessageCircle className="h-4 w-4" />Contacto</a>
          <button onClick={() => setDispOpen(true)} className={`${btnPrimary} min-w-0 px-3 py-2 text-xs md:px-5 md:text-sm`}>Verificar disponibilidade</button>
        </div>
      </div>
      {menuOpen && <MenuOverlay onClose={() => setMenuOpen(false)} />}
      {dispOpen && <DisponibilidadePanel onClose={() => setDispOpen(false)} />}
    </>
  );
}

function Index() {
  return (
    <>
      <Hero />
      <main>
        <Cartaz />
        <Capitulo id="por-fora" titulo="Por fora" frase="O melhor lugar é cá fora" texto="Da água à sombra do alpendre, o dia vive-se de portas abertas" fotos={POR_FORA} />
        <Capitulo id="sem-pressa" titulo="Sem pressa" frase="A mesa pode esperar por todos" texto="Sombra para os dias quentes, uma mesa para as conversas longas e o campo sempre por perto" fotos={SEM_PRESSA} pale />
        <Capitulo id="por-dentro" titulo="Por dentro" frase="Entrar sem deixar o exterior para trás" texto="O salão abre-se à piscina. A cozinha, a mesa e a sala dão lugar a cozinhar, conversar e ficar mais um pouco" nota="Quatro quartos, lareira na biblioteca e ar condicionado em todas as divisões" fotos={POR_DENTRO} />
        <FechoCasa />
        <MontemorSection />
        <Nacional2 />
        <OndeEstamos />
        <PassearPeloMonte />
        <AntesDeChegar />
        <Avaliacoes />
      </main>
      <Contactos />
      <Acompanhamento />
    </>
  );
}
