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
        let partida = {
            id: Math.random(),
            campeonato: campeonatos.find(c => c.id == Number.parseInt(formItens.campeonatoId.value)) ?? null,
            timeMandante: formItens.mandanteI.value ?? "",
            timeVisitante: formItens.visitanteI.value ?? "",
        };
        partidas.push(partida);
    });
    atualizarDados();
    form?.reset();
};
const atualizarDados = () => {
    localStorageCtrl.setLocalStorageItems("partida", partidas);
    exibirTabela();
};
const removerItem = (id) => {
    const campIndex = campeonatos.findIndex((c) => c.id == id);
    //Validar se encontrou algum item  
    if (campIndex !== -1) {
        //remover da lista
        campeonatos.splice(campIndex, 1);
    }
    atualizarDados();
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
    }
    atualizarDados();
};
const exibirTabela = () => {
    tabela.innerHTML = "";
    partidas.forEach((p) => {
        tabela.innerHTML += `
    <tbody>
        <tr>
            <td>${p.campeonato.nome ?? "N/A"}</td>
            <td>${p.timeMandante}</td>
            <td>${p.timeVisitante}</td>
            <button onclick="editarItem(${p.id})"> Editar </button> 
            <button onclick="removerItem(${p.id})"> Remover </button> 
        </tr>
    </tbody>
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
gerarListaListener();
exibirTabela();
exibirCampeonatos();
