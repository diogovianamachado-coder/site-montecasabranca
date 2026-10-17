/* Demo Monte Casa Branca · identificação da revisão.
   Lê window.DEMO_VERSAO (escrito em versao.js pela ferramenta demo.py) e
   preenche os elementos com data-versao="campo". Sem rede, sem dados do
   visitante. Se versao.js faltar, a página continua legível. */
(function () {
  var v = window.DEMO_VERSAO || {};
  var porOmissao = {
    revisao: "r?",
    estado: "desconhecido",
    data: "",
    titulo: "",
    design_entrega: "nenhuma",
    design_commit: "nenhum",
    design_estado: "",
    site_commit: "não carimbado (cópia local; correr demo.py construir)",
    construido_em: "não carimbado",
    endereco_teste: "ainda sem endereço",
    ligacao: "mais recente"
  };
  var campos = {
    revisao: v.revisao,
    estado: v.estado,
    data: v.data,
    titulo: v.titulo,
    design_entrega: v.design && v.design.entrega,
    design_commit: v.design && v.design.commit,
    design_estado: v.design && v.design.estado,
    site_commit: v.site_commit ? (v.site_commit + (v.site_sujo ? " (com alterações por gravar)" : "")) : null,
    construido_em: v.construido_em,
    endereco_teste: v.endereco_teste,
    ligacao: v.ligacao_fixa ? ("fixa, revisão " + v.revisao + " (não muda)") : "mais recente (muda a cada revisão)"
  };
  var nos = document.querySelectorAll("[data-versao]");
  for (var i = 0; i < nos.length; i++) {
    var chave = nos[i].getAttribute("data-versao");
    var valor = campos[chave];
    if (valor === undefined || valor === null || valor === "") valor = porOmissao[chave] || "";
    nos[i].textContent = valor;
  }
  var lista = document.querySelector("[data-versao-paginas]");
  if (lista && v.paginas) {
    lista.innerHTML = "";
    Object.keys(v.paginas).forEach(function (p) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = p; a.textContent = p;
      li.appendChild(a);
      li.appendChild(document.createTextNode(" · " + v.paginas[p]));
      lista.appendChild(li);
    });
  }
  var corpo = document.querySelector("[data-versao-historico]");
  if (corpo && v.historico && v.historico.length) {
    corpo.innerHTML = "";
    v.historico.slice().reverse().forEach(function (h) {
      var tr = document.createElement("tr");
      var atual = h.revisao === v.revisao;
      function celula(conteudo, mono) {
        var td = document.createElement("td");
        if (mono) td.className = "mono";
        if (typeof conteudo === "string") td.textContent = conteudo; else td.appendChild(conteudo);
        tr.appendChild(td);
      }
      celula(h.revisao + (atual ? " (atual)" : ""));
      celula(h.data || "");
      celula(h.estado || "");
      celula(h.titulo || "");
      if (h.endereco) {
        var a = document.createElement("a"); a.href = h.endereco; a.textContent = "abrir " + h.revisao;
        celula(a);
      } else if (atual && v.ligacao_fixa) {
        celula("esta ligação");
      } else {
        celula("ainda sem ligação própria");
      }
      var commit = h.site_commit || (atual ? v.site_commit : null);
      celula(commit ? String(commit).slice(0, 12) : "por carimbar", true);
      corpo.appendChild(tr);
    });
  }
  var hora = document.querySelector("[data-versao-hora]");
  if (hora && v.construido_em) hora.setAttribute("datetime", v.construido_em);
})();
