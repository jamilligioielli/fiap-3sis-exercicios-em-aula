import { Campeonato } from "./interfaces";
import { LocalStorageCtrl } from "./localstoragectrl.js";

const form = document.getElementById("formCampeonatos")  as HTMLFormElement;
const formItens = {
    nomeI: document.getElementById("nome") as HTMLFormElement,
    categoriaI: document.getElementById("categoria") as HTMLFormElement,
    torneioI: document.getElementById("torneio") as HTMLFormElement,
    inicioI: document.getElementById("dataInicio") as HTMLFormElement,
    fimI: document.getElementById("dataFim") as HTMLFormElement
}
const tabela = document.getElementById("campeonatos") as HTMLElement;
const localStorageCtrl = new LocalStorageCtrl();
const campeonatosSalvos = localStorageCtrl.getLocalStorageItem("campeonatos") as Array<Campeonato>;

let campeonatos: Array<Campeonato> = [];

const gerarCampeonatosListener = () => {
  form?.addEventListener("submit", (event) => {
      console.log(event)
        event.preventDefault();

        let campeonato: Campeonato = {
            id: Math.random(),
            nome: formItens.nomeI.value ?? "",
            categoria: formItens.categoriaI.value ?? "",
            tipoTorneio: formItens.torneioI.value ?? "",
            dataInicio: formItens.inicioI.value ?? "",
            dataTermino: formItens.fimI.value ?? ""
        }
        campeonatos.push(campeonato)
        atualizarDados();
        form?.reset()
    })
}

function removerItem(id:number)
{
   const campIndex =  campeonatosSalvos.findIndex(
    (c:Campeonato) => c.id == id);

  //Validar se encontrou algum item  
  if(campIndex !== -1){
    //remover da lista
    campeonatosSalvos.splice(campIndex, 1)
    campeonatos = campeonatosSalvos;
  }
  atualizarDados();
}

function editarItem (id:number) {
  //Find = buscar um elemento em um array
  const campeonato = campeonatosSalvos.find(
    (c : Campeonato) => c.id ==id);
  
  if(!campeonato)  return;

  formItens.nomeI.value = campeonato.nome;
  formItens.categoriaI.value = campeonato.categoria;
  formItens.torneioI.value = campeonato.tipoTorneio;
  formItens.inicioI.value = campeonato.dataInicio;
  formItens.fimI.value = campeonato.dataTermino;
  
  //findIndex buscar o index do objeto
  const campIndex = campeonatosSalvos.findIndex((c : Campeonato) => c.id ==id);


  //Validar se encontrou algum item  
  if(campIndex !== -1){
    //remover da lista
    campeonatosSalvos.splice(campIndex, 1);
    campeonatos = campeonatosSalvos;
  }
  atualizarDados();
}

const exibirTabela = () => {
  tabela.innerHTML = "";
  campeonatosSalvos.forEach((c : Campeonato) =>{
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
  })
}

const atualizarDados = () => {
localStorageCtrl.setLocalStorageItems("campeonatos", campeonatos)
  exibirTabela()
}

const editarOuRemoverListeners = () => {
  const editarBtns = document.querySelectorAll("btnEdit")
  const removerBtns = document.querySelectorAll("btnRemove")
  editarBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const id = Number((event.target as HTMLElement).getAttribute("data-id"));
      editarItem(id);
    });
  });

  removerBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const id = Number((event.target as HTMLElement).getAttribute("data-id"));
      removerItem(id);
    });
  });
}

gerarCampeonatosListener()
editarOuRemoverListeners()
exibirTabela()