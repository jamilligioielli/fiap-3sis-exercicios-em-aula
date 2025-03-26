import { LocalStorageCtrl } from "./localstoragectrl.js";
const form = document.getElementById("formTimes");
let formItens = {
    nomeI: document.getElementById("nome"),
    nomeCurtoI: document.getElementById("nomeCurto"),
};
const tabela = document.getElementById("times");
const localStorageCtrl = new LocalStorageCtrl();
let times = [];
const timesSalvos = localStorageCtrl.getLocalStorageItem("times");
const gerarTimesListener = () => {
    form?.addEventListener("submit", (event) => {
        event.preventDefault();
        let time = {
            id: Math.random(),
            nome: formItens.nomeI.value ?? "",
            nomeCurto: formItens.nomeCurtoI.value ?? ""
        };
        times.push(time);
    });
    localStorageCtrl.setLocalStorageItems("times", times);
};
const removerItem = (id) => {
    const index = times.findIndex((t) => t.id == id);
    //Validar se encontrou algum item  
    if (index !== -1) {
        //remover da lista
        times.splice(index, 1);
    }
    atualizarDados();
};
const editarItem = (id) => {
    //Find = buscar um elemento em um array
    const item = timesSalvos.find((t) => t.id == id);
    if (!item)
        return;
    formItens.nomeI.value = item.nome;
    formItens.nomeCurtoI.value = item.nomeCurto;
    //findIndex buscar o index do objeto
    const campIndex = timesSalvos.findIndex((t) => t.id == id);
    //Validar se encontrou algum item  
    if (campIndex !== -1) {
        //remover da lista
        timesSalvos.splice(campIndex, 1);
        times = timesSalvos;
    }
    atualizarDados();
};
const exibirTabela = () => {
    tabela.innerHTML = "";
    times.forEach((time) => {
        tabela.innerHTML += `
    <tr>
         <td>${time.nome}</td>
         <td>${time.nomeCurto}</td>
         <button onclick="editarItem(${time.id})"> Editar </button> 
        <button onclick="removerItem(${time.id})"> Remover </button>
    </tr>
  `;
    });
};
const atualizarDados = () => {
    localStorageCtrl.setLocalStorageItems("times", times);
    exibirTabela();
};
gerarTimesListener();
exibirTabela();
