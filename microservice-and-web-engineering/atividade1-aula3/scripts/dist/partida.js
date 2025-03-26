import { LocalStorageCtrl } from "./localstoragectrl.js";
const form = document.getElementById("formPartida");
const formItens = {
    campeonatoId: document.getElementById("campeonato"),
    mandanteI: document.getElementById("timeMandante"),
    visitanteI: document.getElementById("timeVisitante"),
};
const tabela = document.getElementById("partidas");
const localStorageCtrl = new LocalStorageCtrl();
let partidas = [];
const partidasSalvas = localStorageCtrl.getLocalStorageItem("partidas");
const campeonatos = localStorageCtrl.getLocalStorageItem("campeonatos");
const gerarListaListener = () => {
    form?.addEventListener("submit", (event) => {
        event.preventDefault();
        let lastIdIncrement = partidasSalvas && partidasSalvas.length > 0 ? partidasSalvas[partidasSalvas.length - 1].id + 1 : 1;
        let partida = {
            id: lastIdIncrement,
            campeonato: campeonatos.find(c => c.id == Number.parseInt(formItens.campeonatoId.value)) ?? null,
            timeMandante: formItens.mandanteI.value ?? "",
            timeVisitante: formItens.visitanteI.value ?? "",
        };
        partidas.push(partida);
        form?.reset();
        atualizarDados();
    });
    exibirTabela();
};
const atualizarDados = () => {
    localStorageCtrl.setLocalStorageItems("partida", partidas);
    exibirTabela();
    editarOuRemoverListeners();
};
const removerItem = (id) => {
    const campIndex = partidasSalvas.findIndex((p) => p.id == id);
    //Validar se encontrou algum item  
    if (campIndex !== -1) {
        //remover da lista
        partidasSalvas.splice(campIndex, 1);
        partidas = partidasSalvas;
        atualizarDados();
    }
    exibirTabela();
};
const editarItem = (id) => {
    //Find = buscar um elemento em um array
    const partida = partidasSalvas.find((p) => p.id == id);
    if (!partida)
        return;
    formItens.campeonatoId.value = partida.campeonato.id ?? 0;
    formItens.mandanteI.value = partida.timeMandante;
    formItens.visitanteI.value = partida.timeVisitante;
    //findIndex buscar o index do objeto
    const campIndex = partidasSalvas.findIndex((p) => p.id == id);
    //Validar se encontrou algum item  
    if (campIndex !== -1) {
        //remover da lista
        partidasSalvas.splice(campIndex, 1);
        partidas = partidasSalvas;
        atualizarDados();
    }
    exibirTabela();
};
const exibirTabela = () => {
    tabela.innerHTML = "";
    partidas.forEach((p) => {
        tabela.innerHTML += `
    <tr>
        <td>${p.campeonato.nome ?? "N/A"}</td>
        <td>${p.timeMandante}</td>
        <td>${p.timeVisitante}</td>
        <button class="btnEdit" data-id="${p.id}""> Editar </button> 
              <button class="btnRemove" data-id="${p.id}"> Remover </button>
    </tr>
  `;
    });
};
const exibirCampeonatos = () => {
    const selectCampeonatos = document.getElementById("campeonatos");
    selectCampeonatos.innerHTML = "";
    campeonatos.forEach((c) => {
        selectCampeonatos.innerHTML += `
      <option value="${c.id}">${c.nome}</option>
    `;
    });
};
const editarOuRemoverListeners = () => {
    const editarBtns = document.querySelectorAll("button.btnEdit");
    const removerBtns = document.querySelectorAll("button.btnRemove");
    editarBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            console.log("cliked editar", btn);
            const id = Number(event.target.getAttribute("data-id"));
            editarItem(id);
        });
    });
    removerBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            console.log("cliked remover", btn);
            const id = Number(event.target.getAttribute("data-id"));
            removerItem(id);
        });
    });
};
gerarListaListener();
exibirTabela();
exibirCampeonatos();
editarOuRemoverListeners();
