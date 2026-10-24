# Monte Casa Branca · design em trabalho V1.3.1

A prancha editorial com fotografias reais é a referência permanente. A estrutura de sete páginas está aceite como base; os detalhes e a mensagem continuam em afinação.

## Prioridade da página principal
1. Grande imagem com as características da casa imediatamente acessíveis.
2. Mensagem e apresentação da casa: dentro, fora e piscina.
3. Acesso à galeria, logo após a sequência de fotografias.
4. Exploração das restantes páginas e consulta de disponibilidade.

A página principal em scroll é o foco. O menu inferior é uma hipótese de apoio em mobile, ainda em apreciação. Não substituir a descoberta da casa por um índice ou pelo calendário.

## Galeria
- `index.html` tem entradas visuais por fotografia: sala, piscina e alpendre, e uma ligação geral “Explorar a galeria”.
- As ligações levam à galeria interna e às zonas existentes, com os filtros do protótipo. Não introduzir links inventados para álbuns externos.
- `galeria.json` regista os acessos e o estado da inspeção do Zenfolio. A organização foi agora observada nas capturas IMG_4594–4615 fornecidas pelo utilizador. O acesso direto continua bloqueado pelo Cloudflare; os URLs de álbuns individuais e originais não foram recuperados.
- `https://mobile.zenfolio.com/photos` foi fornecido para inspeção, não é um destino público confirmado para os visitantes.
- As capturas revelam erros nos dois pares herdados: o antes da pérgula foi associado ao interior do casão, e o quarto atual usado não corresponde ao pareamento mostrado no álbum. Corrigir com os originais identificados na análise antes de montar. Não apresentar como um slider alinhado ou como match verificado. Fotografias, ficheiros e estrutura são preservados para a revisão.

## Fonte, revisão e histórico
A fonte editável é esta pasta. Abrir `index.html` com os ficheiros adjacentes; desenho responsive em mobile e PC. Manter a paleta, tipografia e composição da prancha.

- Histórico e versões congeladas: `design/HISTORICO-VERSOES.md`.
- Decisões mais recentes: `docs/design/2026-10-24_home_galeria_historico.md`.
- Revisões anteriores: notas V1.2 e V1.3 em `docs/design/`.
- `icones.svg`: biblioteca de ícones de traço fino; as versões utilizadas estão inline no HTML.
- `imagens.json`: proveniência das imagens.

## Exportar
`python -m pip install -r requirements-design.txt`

`python gerar_validacao.py`

O exportador gera sete páginas autónomas e a apresentação combinada em `validacao-v1-3-1/`, com imagens incorporadas e conteúdo direto, sem iframe ou JavaScript. Os geradores V1 `build_design.py` / `build_review.py` são históricos: não executar para sobrescrever a fonte atual.

## Integração pelo Claude
Os encaixes `data-base` e classes `b-` são preservados para o kit. Calendário, preço, tempo e pedido do HTML de validação são exemplos. Não existe novo motor nem envio de reservas nesta entrega. A inconsistência anterior de `imagens.json` no teste de `demo/ferramentas/demo.py` está documentada na entrega V1; não foi corrigida neste trabalho de acessos.

KPI oficiais continuam confidenciais e fora das páginas. Sem publicação ou alteração de domínio. O texto e a proposta de dois dias em Montemor/Évora aguardam validação final.

## Análise de galeria e menu · 24/10/2026
Ler `docs/design/2026-10-24_analise_galeria_menu.md`: organização observada por capturas, correção dos pares e proposta de Menu + Verificar disponibilidade flutuantes. Esta proposta não altera ainda o desenho implementado nem equivale a aprovação.
