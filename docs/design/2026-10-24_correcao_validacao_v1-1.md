# Correção da entrega de validação · V1.1 · 24/10/2026

O utilizador reportou conteúdo em branco no visualizador V1 no iPhone, apesar dos controlos visíveis. O mecanismo iframe/srcdoc não foi compatível com esse contexto. Não declarar a V1 validada em iOS.

O exportador gerar_validacao.py produz sete HTML autónomos com CSS e fotografias incorporados, e um caderno contínuo com índice por âncoras. Nenhum dos oito ficheiros depende de iframe, srcdoc ou JavaScript para mostrar conteúdo. Abrem diretamente; o layout responde à largura real do dispositivo. É exportação estática para validar design: calendário, preços e formulários são exemplos; galeria mostra todas as fotos sem filtros que não funcionariam sem JS. As páginas-fonte e o kit funcional em design/site permanecem disponíveis para a demo do Claude.

Executar python3 gerar_validacao.py na raiz do repositório. Saídas: validacao-v1-1/ e Monte-Casa-Branca-Validacao-V1-1.zip. O visualizador V1 anterior deve deixar de ser usado para validação no iPhone. A correção preserva as fotografias e a direção visual; não é uma nova aprovação de páginas nem da mensagem. Verificação local: conteúdo HTML estático presente nas sete páginas, imagens incorporadas e nenhum iframe/script nos ficheiros entregues. A pré-visualização foi inspecionada em Chrome; não se afirma teste físico de iPhone.
