var campeonatoForm = document.getElementById("formCampeonatos");
var campeonatos = [{
        categoria: "amador",
        dataInicio: new Date("2022-02-25"),
        dataTermino: new Date("2022-05-26"),
        nome: "brasileirao",
        tipoTorneio: "mata-mata"
    }];
var times = [];
var partidas = [];
var updateLocalStorage = function (itemName, value) {
    var localStorageItem = JSON.stringify(value);
    localStorage.setItem(itemName, localStorageItem);
};
var gerarCampeonatosListener = function () {
    campeonatoForm === null || campeonatoForm === void 0 ? void 0 : campeonatoForm.addEventListener("submit", function (event) {
        var _a, _b, _c, _d, _e;
        event.preventDefault();
        var campeonatoFormItens = {
            nomeI: document.getElementById("nome"),
            categoriaI: document.getElementById("categoria"),
            torneioI: document.getElementById("torneio"),
            inicioI: document.getElementById("dataInicio"),
            fimI: document.getElementById("dataFim")
        };
        var campeonato = {
            nome: (_a = campeonatoFormItens.nomeI.value) !== null && _a !== void 0 ? _a : "",
            categoria: (_b = campeonatoFormItens.categoriaI.value) !== null && _b !== void 0 ? _b : "",
            tipoTorneio: (_c = campeonatoFormItens.torneioI.value) !== null && _c !== void 0 ? _c : "",
            dataInicio: (_d = campeonatoFormItens.inicioI.value) !== null && _d !== void 0 ? _d : "",
            dataTermino: (_e = campeonatoFormItens.fimI.value) !== null && _e !== void 0 ? _e : ""
        };
        campeonatos.push(campeonato);
    });
    updateLocalStorage("campeonatos", campeonatos);
};
var gerarTimes = function () {
    var time1 = {
        nome: "Corinthians",
        nomeCurto: "CO"
    };
    times.push(time1);
};
var gerarPartidas = function () {
    var partida1 = {
        timeMandante: "CO", timeVisitante: "BA", campeonato: campeonatos[0]
    };
    partidas.push(partida1);
};
var gerarTextos = function (item, parentEl) {
    Object.keys(item).forEach(function (key) {
        var paragraphEl = document.createElement("p");
        var content = item[key];
        console.log(content);
        console.log("".concat(key, " - ").concat(content));
        paragraphEl.textContent = "".concat(key, " - ").concat(content);
        parentEl === null || parentEl === void 0 ? void 0 : parentEl.appendChild(paragraphEl);
    });
};
var gerarParagrafos = function (itens, parentEl, label) {
    var titleEl = document.createElement("h3");
    titleEl.innerText = label;
    parentEl === null || parentEl === void 0 ? void 0 : parentEl.appendChild(titleEl);
    itens.forEach(function (item) {
        gerarTextos(item, parentEl);
    });
};
var exibirItens = function () {
    var _a;
    var partidasEl = document.getElementById("partidas");
    var campeonatosEl = document.getElementById("campeonatos");
    var timesEl = document.getElementById("times");
    var campeonatosLocal = JSON.parse((_a = localStorage.getItem("campeonatos")) !== null && _a !== void 0 ? _a : "");
    if (campeonatosLocal) {
        gerarParagrafos(campeonatosLocal, campeonatosEl, "Campeonatos");
    }
    gerarPartidas();
    gerarTimes();
    gerarParagrafos(partidas, partidasEl, "Partidas");
    gerarParagrafos(times, timesEl, "Times");
};
gerarCampeonatosListener();
exibirItens();
