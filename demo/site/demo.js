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
  function botaoCopiar(texto, alvoSelecionavel) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "copiar"; b.textContent = "Copiar";
    b.addEventListener("click", function () {
      function feito(ok) { b.textContent = ok ? "Copiado" : "Seleciona e copia"; setTimeout(function () { b.textContent = "Copiar"; }, 2000); }
      function selecionar() {
        if (!alvoSelecionavel) return feito(false);
        var r = document.createRange(); r.selectNodeContents(alvoSelecionavel);
        var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
        var ok = false; try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
        feito(ok);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(function () { feito(true); }, selecionar);
      } else { selecionar(); }
    });
    return b;
  }
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
        var bloco = document.createElement("span"); bloco.className = "ligacao";
        var a = document.createElement("a"); a.href = h.endereco; a.textContent = "abrir " + h.revisao; a.target = "_blank"; a.rel = "noopener";
        var url = document.createElement("code"); url.className = "url"; url.textContent = h.endereco;
        bloco.appendChild(a); bloco.appendChild(url); bloco.appendChild(botaoCopiar(h.endereco, url));
        celula(bloco);
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
  var principal = document.querySelector("[data-versao-principal]");
  if (principal && v.endereco_teste) {
    principal.innerHTML = "";
    var ap = document.createElement("a"); ap.href = v.endereco_teste; ap.textContent = "abrir a mais recente"; ap.target = "_blank"; ap.rel = "noopener";
    var urlp = document.createElement("code"); urlp.className = "url"; urlp.textContent = v.endereco_teste;
    principal.appendChild(ap); principal.appendChild(urlp); principal.appendChild(botaoCopiar(v.endereco_teste, urlp));
  }
  var hora = document.querySelector("[data-versao-hora]");
  if (hora && v.construido_em) hora.setAttribute("datetime", v.construido_em);
})();
