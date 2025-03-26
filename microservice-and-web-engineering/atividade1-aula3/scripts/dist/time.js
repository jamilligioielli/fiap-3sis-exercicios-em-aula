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
        atualizarDados();
    });
};
const removerItem = (id) => {
    const index = times.findIndex((t) => t.id == id);
    //Validar se encontrou algum item  
    if (index !== -1) {
        //remover da lista
        times.splice(index, 1);
        atualizarDados();
    }
    exibirTabela();
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
        atualizarDados();
    }
    exibirTabela();
};
const exibirTabela = () => {
    tabela.innerHTML = "";
    times.forEach((time) => {
        tabela.innerHTML += `
    <tr>
         <td>${time.nome}</td>
         <td>${time.nomeCurto}</td>
         <button class="btnEdit" data-id="${time.id}""> Editar </button> 
              <button class="btnRemove" data-id="${time.id}"> Remover </button> 
    </tr>
  `;
    });
};
const atualizarDados = () => {
    localStorageCtrl.setLocalStorageItems("times", times);
    exibirTabela();
    editarOuRemoverListeners();
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
gerarTimesListener();
exibirTabela();
editarOuRemoverListeners();
