# Decisão do Diogo (25/10/2026, noite): o site segue pela versão do Lovable, adaptada com as peças do Claude

**Palavras do Diogo:** «na verdade o site dele ficou muito melhor do que o teu. o dele tem umas coisas giras mas o dele está muito melhor na
totalidade. queria seguir pelo dele e adaptar com coisas tuas».

## 1. O que fica decidido

- **A base do site passa a ser o projeto do Lovable** «Monte Casa Branca» (workspace «MONTE's Lovable», id `96fa8399-2585-4338-bf69-b63411871178`;
  editor https://lovable.dev/projects/96fa8399-2585-4338-bf69-b63411871178). Tecnologia: TanStack Start (React 19, renderização no servidor, Tailwind 4,
  shadcn/ui), gerada pelo Lovable a partir do brief de sete pontos, da prancha aprovada, de quatro fotografias e do logótipo.
- **As «coisas do Claude» entram lá dentro:** calendário real da app (porta #189), tarifa 2026/2027 com as regras da casa (porta #190 ou o motor
  do kit), tempo Open-Meteo e pôr do sol, pedido de datas → pré-reserva na app (porta #191, chave só no servidor), factos só do `FACTOS.md`,
  schema.org (`VacationRental`, `FAQPage`), `llms.txt`, `robots.txt`, `sitemap.xml`, Open Graph, PT e EN, a galeria com todas as fotografias,
  os onze pares antes/depois, as avaliações citáveis (porta #192), testes e capturas em cada alteração.
- **Isto é uma alteração ao acordo v1.2 (secção 6, stack e hospedagem): v1.3 a escrever com as diferenças listadas.** A demo estática
  (`demo/`, r0–r3) fica como registo; não se continua.

## 2. Como se trabalha a partir de agora (dois canais, para os créditos não serem o gargalo)

1. **Código do Claude pelo GitHub, sem créditos.** O Diogo liga o projeto do Lovable ao GitHub (no editor do Lovable: GitHub → Connect project →
   a conta dele; o Lovable cria um repositório novo na conta e sincroniza nos dois sentidos). O Claude junta esse repositório à sessão e escreve
   diretamente o TypeScript das integrações, do SEO/LLM e dos testes; cada push aparece no Lovable em segundos.
2. **Desenho pelo agente do Lovable, com créditos.** Mudanças de aspeto pedidas pelo Diogo (ou briefadas pelo Claude) vão ao agente do Lovable.
   O plano gratuito tem 5 créditos por dia; a primeira versão gastou 4,6. Para continuar é preciso o plano pago (Pro, ≈ 25 €/mês, 100 créditos);
   o Diogo disse a 25/10 que pagaria uma subscrição se fosse preciso.
3. **Fotografias:** a regra de 25/10 mantém-se: nunca pedidas ao Diogo. Entram pelo repositório (entrega do ChatGPT, recado de 25/10, 5.ª parte,
   agora para o repositório do Lovable ou para este; o Claude move-as) ou pelo Claude, se a rede do ambiente deixar de bloquear o Dropbox.
4. **Hospedagem e domínio:** publicar no Lovable com domínio próprio `montecasabranca.pt` (plano pago; DNS no painel da Amen, tarefa do Diogo);
   a app continua em `app.montecasabranca.pt` na Amen. Alternativa, se um dia for preciso: exportar do GitHub e alojar noutro serviço.
5. **A app:** as portas #189 e #190 fazem-se já em sessões APP (v1.2); #191 e #192 depois. O site fala com a app pelo servidor do site
   (TanStack server functions), nunca pelo browser com chaves.

## 3. O que o Lovable fez (lido do código, 25/10)

Uma só rota (`src/routes/index.tsx`): capa a ecrã inteiro com paralaxe e o seletor «Capa 1 / Capa 2» (a segunda desligada, «a caminho»);
mensagem central «O dia é vosso / A casa também»; descoberta por espaços (piscina e exterior a plena largura, alpendre, sala e cozinha, quartos
e banho) com galeria em sobreposição por espaço; a avaliação real do Airbnb; perguntas em acordeão; localização com distâncias, Montemor e a
Nacional 2; contactos em verde oliveira; barra inferior com Menu, Contacto e «Verificar disponibilidade» que abre um painel lateral com
calendário de exemplo, simulador (330 €/noite + 180 €) e o tempo de exemplo. Textos em pt-PT; `lang="pt-PT"`; fontes Playfair Display e
Source Sans 3; `src/lib/stay.ts` com a conta e testes.

## 4. Próximos passos, por ordem

1. Diogo: plano pago no Lovable; ligar o projeto ao GitHub; dizer ao Claude o nome do repositório.
2. Claude: juntar o repositório; substituir `stay.ts` pelo motor de tarifas do kit (épocas 2026/2027, limpeza do ano, mínimo 2, verão sáb→sáb,
   mensal nov–mar); tempo Open-Meteo real; calendário ligado à porta #189 (até existir, dados de exemplo marcados); pedido → #191; schema.org,
   `llms.txt`, `robots.txt`, `sitemap.xml`; EN; testes.
3. ChatGPT: fotografias para o repositório (todas as da galeria + zonas + duas capas) e os textos; a mensagem final quando o Diogo a fechar.
4. Diogo: olho a cada versão no iPhone pela pré-visualização do Lovable; «Lança» quando quiser publicar com o domínio.

---

## Adenda de 1/11/2026 · «Amen» (decisão do Diogo)

O alojamento do site é a **Amen**, já paga, e não o Lovable. Prova e receita em `lovable/exportacao-estatica/LEIA-ME.md`: o projeto do
Lovable compila para ficheiros estáticos (12 ficheiros, 1,9 MB, texto todo no HTML, zero referências ao Lovable) que o workflow envia
para a raiz de `montecasabranca.pt` por rsync, como na app. O Lovable fica só como ferramenta de desenho: gratuito e lento (um lote
de alterações por dia) ou pago só nos meses do desenho. O crachá «Made with Lovable» não existe fora do alojamento do Lovable.
Consequências: a hospedagem do acordo v1.2 mantém-se (Amen, `prereserva.php` no mesmo servidor, DNS como está); o que muda para a
v1.3 é a ferramenta de desenho (Lovable em vez de HTML/CSS à mão) e a tecnologia das páginas (React pré-renderizado em vez do
gerador Python). Método: o Diogo liga o projeto do Lovable ao GitHub (um repositório novo na conta dele); o Claude junta-o à sessão,
constrói e envia para a Amen; o desenho continua no Lovable e no GitHub em sincronia nos dois sentidos.
