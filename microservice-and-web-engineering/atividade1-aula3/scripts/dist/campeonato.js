import { LocalStorageCtrl } from "./localstoragectrl.js";
const form = document.getElementById("formCampeonatos");
const formItens = {
    nomeI: document.getElementById("nome"),
    categoriaI: document.getElementById("categoria"),
    torneioI: document.getElementById("torneio"),
    inicioI: document.getElementById("dataInicio"),
    fimI: document.getElementById("dataFim")
};
const tabela = document.getElementById("campeonatos");
const localStorageCtrl = new LocalStorageCtrl();
const campeonatosSalvos = localStorageCtrl.getLocalStorageItem("campeonatos");
let campeonatos = [];
const gerarCampeonatosListener = () => {
    form?.addEventListener("submit", (event) => {
        console.log(event);
        event.preventDefault();
        let campeonato = {
            id: Math.random(),
            nome: formItens.nomeI.value ?? "",
            categoria: formItens.categoriaI.value ?? "",
            tipoTorneio: formItens.torneioI.value ?? "",
            dataInicio: formItens.inicioI.value ?? "",
            dataTermino: formItens.fimI.value ?? ""
        };
        campeonatos.push(campeonato);
        atualizarDados();
        form?.reset();
    });
};
function removerItem(id) {
    const campIndex = campeonatosSalvos.findIndex((c) => c.id == id);
    //Validar se encontrou algum item  
    if (campIndex !== -1) {
        //remover da lista
        campeonatosSalvos.splice(campIndex, 1);
        campeonatos = campeonatosSalvos;
    }
    atualizarDados();
}
function editarItem(id) {
    //Find = buscar um elemento em um array
    const campeonato = campeonatosSalvos.find((c) => c.id == id);
    if (!campeonato)
        return;
    formItens.nomeI.value = campeonato.nome;
    formItens.categoriaI.value = campeonato.categoria;
    formItens.torneioI.value = campeonato.tipoTorneio;
    formItens.inicioI.value = campeonato.dataInicio;
    formItens.fimI.value = campeonato.dataTermino;
    //findIndex buscar o index do objeto
    const campIndex = campeonatosSalvos.findIndex((c) => c.id == id);
    //Validar se encontrou algum item  
    if (campIndex !== -1) {
        //remover da lista
        campeonatosSalvos.splice(campIndex, 1);
        campeonatos = campeonatosSalvos;
    }
    atualizarDados();
}
const exibirTabela = () => {
    tabela.innerHTML = "";
    campeonatosSalvos.forEach((c) => {
        tabela.innerHTML += `
        <tr>
            <td>${c.nome}</td>
            <td>${c.categoria}</td>
            <td>${c.tipoTorneio}</td>
            <td>${c.dataInicio}</td>
            <td>${c.dataTermino}</td>
            <button class="btnEdit" data-id="${c.id}""> Editar </button> 
            <button class="btnRemove" data-id="${c.id}"> Remover </button> 
        </tr>
  `;
    });
};
const atualizarDados = () => {
    localStorageCtrl.setLocalStorageItems("campeonatos", campeonatos);
    exibirTabela();
};
const editarOuRemoverListeners = () => {
    const editarBtns = document.querySelectorAll("btnEdit");
    const removerBtns = document.querySelectorAll("btnRemove");
    editarBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            const id = Number(event.target.getAttribute("data-id"));
            editarItem(id);
        });
    });
    removerBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            const id = Number(event.target.getAttribute("data-id"));
            removerItem(id);
        });
    });
};
gerarCampeonatosListener();
editarOuRemoverListeners();
exibirTabela();
