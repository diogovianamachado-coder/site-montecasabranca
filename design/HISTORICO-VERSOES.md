# Monte Casa Branca · histórico de versões

Última atualização: 24/10/2026. Preservar estas versões para comparar e recuperar decisões. Arquivar cada nova revisão antes de a substituir; não editar retroativamente os snapshots.

A fonte de trabalho está em [design/site](site/). A prancha continua a referência visual e a página principal em scroll é o foco. Mensagem e detalhes em construção. Menu inferior ainda em apreciação. KPI confidenciais excluídos das páginas e deste histórico.

## Versões da sessão de 24/10/2026

| Versão | Conteúdo preservado | Estado / uso |
| --- | --- | --- |
| [V1](arquivo/2026-10-24/v1/) | Sete páginas, imagens, visualizador e dependências históricas | Design para apreciação. Visualizador iframe/srcdoc falhou no iPhone; não reutilizar como entrega atual. |
| [V1.1](arquivo/2026-10-24/v1.1/) | Fonte V1 e exportador para HTML direto | Corrige ecrã em branco. Caderno contínuo com as sete páginas. |
| [V1.2](arquivo/2026-10-24/v1.2/) | Fonte, fotos e exportador | Retira tabela de épocas e Reguengo; repõe trio, pares herdados de antes/depois, Montemor e N2. Estrutura aceite como base. |
| [V1.3](arquivo/2026-10-24/v1.3/) | Fonte, fotos, ícones, exportador e dependência | Retira CTA duplicados; acesso inferior mobile; uma página de cada vez; roteiro de duas noites. Detalhes em apreciação. |
| [V1.3.1](arquivo/2026-10-24/v1.3.1/) | Fonte, fotos, ícones, contrato de galeria, exportador e dependência | Acessos visuais do trio e ligação à galeria após as fotos. Organização Zenfolio e match antes/depois pendentes de observação/validação. |

Os HTML exportados com fotografias incorporadas são reconstruíveis com os geradores preservados. O arquivo guarda fonte, imagens e geradores; evita guardar várias cópias gigantes do mesmo conteúdo base64. O visualizador original V1 também é reconstruível e está identificado como defeituoso no contexto do iPhone.

### Commits de origem
- V1: `03b97fef7b346ef7e964e8ca3f9ae7d962a4e6a1`.
- V1.1: `885e292802d447e3b114c64970865c9ab2109a6d`.
- V1.2: `48b04b27e40ef4f3b0350d4ce013e98f7ac8f28d`.
- V1.3: `e0dbbbafc6d0f03f48fe53cad03bb3934c2aa31f`.
- V1.3.1: snapshot incluído no mesmo commit deste índice; ler a memória [home, galeria e histórico](../docs/design/2026-10-24_home_galeria_historico.md).

## Referências anteriores já existentes no repositório

Estas pastas são mantidas intactas. A existência de uma experiência não significa aprovação.

- [Prancha editorial aprovada em design](prancha-aprovada-2026-10-19/): guia permanente; a mensagem não foi aprovada como final.
- [Direções A/B/C](direcoes/).
- [Estudo inicial de 17/10](estudo-inicial-2026-10-17/).
- [Estudo D03 de 17/10](estudo-d03-2026-10-17/).
- [Modelos de 17/10](modelos-6-2026-10-17/): preserva os ficheiros que existem nesta pasta; este índice não afirma ter recuperado os seis modelos completos.
- [Retoma V2: casa aberta e caderno da casa](retoma-v2/).

## Como comparar

1. Comparar o mesmo ponto: entrada/hero, características, trio e entrada da galeria, antes/depois, disponibilidade e mobile/PC.
2. Confirmar se a observação é sobre design, conteúdo ou funcionamento; não atribuir aprovação de um ao outro.
3. Consultar a memória da revisão e o commit, além do aspeto visual.
4. Para regenerar, trabalhar numa cópia da pasta da versão e seguir o respetivo README. Nunca apontar um gerador histórico à fonte atual.
