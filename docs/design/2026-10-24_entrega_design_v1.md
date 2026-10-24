# Entrega de design V1 · sete páginas reais · 24/10/2026

O Diogo pediu avançar para uma entrega utilizável pelo Claude, mantendo o design da prancha e usando texto provisório. Esta entrega substitui a fase de mapa técnico como trabalho ativo: estão em `design/site/` sete HTML reais, CSS comum, JS de apresentação, fotografias e manifesto de origem.

## O que está entregue
Início, A casa, Fotografias, Preços, Localização, Perguntas, Contactos. Navegação relativa entre todas. Homepage com a piscina e hierarquia R1; secundárias com composições editoriais próprias. Galeria filtrável com lightbox, teclado e foco. Mapa de preços, calendário, resumo e formulário desenhados com os encaixes do kit do Claude. Versões PC/mobile em cada página, sem exigir HTML separado.

Texto default «Uma casa inteira. O Alentejo à vossa porta.» preservado na abertura; restantes textos são de trabalho. Nenhuma página ou nova mensagem fica aprovada por esta entrega. A referência canónica da prancha não é alterada.

## Integração
Seguido `demo/base/CONTRATO.md` do main d703585. Ficheiros apenas em `design/site/`, sem alterar demo, kit, app, produção, workflow ou alojamento. O kit foi montado num ensaio local separado para verificar CSS e estados; não se criou uma r2 oficial nem se presume que o Claude leu o commit.

## Acerto necessário no teste/montagem do Claude
O contrato exige `design/site/imagens.json`, mas a constante RESERVADOS de `demo/ferramentas/demo.py` inclui esse nome. O próprio código tenta depois ler o manifesto como fonte de origem. Assim o teste e a montagem recusam uma entrega conforme ao contrato. A única falha do teste original é esse nome reservado.

Proposta de acerto, para o Claude rever no seu ficheiro: remover apenas `"imagens.json"` da constante RESERVADOS; manter a exclusão do manifesto na cópia para a raiz da demo e o processamento em `mapa_design`, que já existem. Patch ao lado deste handoff. Em QA local, a adaptação foi só em memória; resultado: sete páginas OK e montagem de ensaio OK. O workflow original exige esse acerto para ficar verde.

## Verificação e limites
Sete páginas em 390/1280 px, h1 único, imagens sem falhas e sem scroll horizontal no navegador. Menu mobile, galeria, FAQ, ligações e estados de simulação são alvo do ensaio. Não se declara QA de Safari/iPhone nem integração com portas reais. Calendário/meteorologia usam os exemplos do kit; nenhuma reserva é enviada ou gravada.

Usadas apenas as cinco fotos R1 e o logótipo oficial já no Git, com origem registada. Autorizações públicas continuam pendentes. A aplicação da marca é para apreciação, sem redesenho do logo. Sem área em hectares, avaliações públicas inventadas, regras por confirmar ou números internos. Os KPI permanecem confidenciais e não são reproduzidos.

## Próximo passo concreto
Claude revê o acerto do manifesto, monta esta entrega como rascunho da próxima revisão e fornece a ligação privada para apreciação do Diogo em telemóvel e PC. Depois afinam-se páginas, módulos e mensagem sobre estas composições. A autorização de produção/publicação mantém o processo próprio.
