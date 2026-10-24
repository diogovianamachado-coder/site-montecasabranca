# Direção confirmada · home, galeria e histórico · 24/10/2026

## Instrução mais recente do utilizador
Guardar todas as versões no GitHub como memória comparável. O menu inferior “pode funcionar”, mas a página principal em scroll é o foco: grande fotografia e características logo à frente, mensagem e espaços dentro/fora/piscina, logo depois acesso à galeria. Quem gostar passa a explorar os outros menus e as disponibilidades.

Não se pede agora para carregar a totalidade do arquivo fotográfico nem refazer o site. Preparar acessos e grafismo, compreender a organização da galeria e confirmar os pares antes/depois. A estrutura geral e a prancha continuam preservadas.

## Implementado em V1.3.1
- Mantida a página principal editorial em scroll e o seu hero.
- O trio passa a oferecer acessos visuais à sala, piscina e alpendre na galeria interna.
- A ligação geral “Explorar a galeria”, com ícone de fotografia, fica depois do trio. Continua antes do tempo e da disponibilidade.
- Menu inferior mantido como proposta de apoio, sem ser tratado como aprovação definitiva.
- Criado `galeria.json` como contrato para o Claude: destinos internos atuais, URLs externas em falta e pares a conferir.
- Nenhuma fotografia substituída ou nova organização do Zenfolio inventada.

## Zenfolio: impedimento observado
URL indicado: https://mobile.zenfolio.com/photos

A abertura devolveu uma página Cloudflare “Sorry, you have been blocked / You are unable to access zenfolio.com”. O conteúdo, os álbuns, as subpastas e os endereços públicos não foram observados. Não foi possível confirmar se a sessão do utilizador permitiria ver os álbuns. Não contornar o bloqueio nem usar o URL de gestão como destino público do site.

Para concluir a correspondência: obter capturas da árvore de álbuns e dos pares candidatos, ou outro material fornecido pelo utilizador que mostre esta organização. Até lá, as zonas do protótipo são provisórias e não uma reprodução verificada do Zenfolio.

## Antes/depois: resultado da revisão visual
- Casão: `antes_casao_a14.jpg` é uma fotografia exterior com pérgula, vegetação e estrutura circular; `depois_casao_interior_a3.jpg` mostra o interior com vigas e portas. Foram associados no gerador v3 anterior, mas esta revisão não confirma por pontos fixos que são o mesmo espaço. Não são uma sobreposição de enquadramento equivalente.
- Quarto: `antes_quarto_a15.jpg` e `quarto_4413.jpg` foram igualmente associados no gerador anterior. As aberturas e ângulos não permitem concluir, só com estas imagens, que se trata do mesmo quarto. Estado: por confirmar.
- Não declarar match verificado com base apenas nos nomes dos ficheiros ou na associação herdada. Não inventar imagens, gerar um “antes” nem alinhar artificialmente espaços diferentes.
- A estrutura do módulo é mantida para os pares corretos quando identificados. O estado pendente fica no contrato interno e nesta memória.

## Histórico
`design/HISTORICO-VERSOES.md` indexa versões, commits e estado. Fontes de V1, V1.1, V1.2 e V1.3 são congeladas em `design/arquivo/2026-10-24/`; imagens preservadas por árvores Git, sem compressão adicional. Os geradores de exportação são guardados nas versões em que existem. A versão V1 inclui também o visualizador histórico, identificado como falhado no iPhone.

As experiências mais antigas que já existiam no repositório permanecem intactas e são referenciadas no índice. Não se afirma que ficheiros ausentes de versões antigas tenham sido recuperados.

A versão de trabalho V1.3.1 inclui apenas os acessos e estes registos; a mensagem e o desenho geral não foram reabertos. Sem KPI, novo motor, publicação ou domínio.
