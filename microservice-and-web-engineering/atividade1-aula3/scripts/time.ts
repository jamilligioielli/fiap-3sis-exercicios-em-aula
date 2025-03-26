import { Time } from "./interfaces";
import { LocalStorageCtrl } from "./localstoragectrl.js";

const form = document.getElementById("formTimes");
let formItens = {
  nomeI: document.getElementById("nome") as HTMLFormElement,
  nomeCurtoI: document.getElementById("nomeCurto") as HTMLFormElement,
}
const tabela = document.getElementById("times");
const localStorageCtrl = new LocalStorageCtrl();

let times: Time[] = [];
const timesSalvos = localStorageCtrl.getLocalStorageItem("times") as Time[];

const gerarTimesListener = () => {
    form?.addEventListener("submit", (event) => {
        event.preventDefault();

        let time: Time = {
          id: Math.random(),
          nome: formItens.nomeI.value ?? "",
          nomeCurto:  formItens.nomeCurtoI.value ?? ""
        }
        times.push(time)
        atualizarDados()
    })
}

const removerItem = (id:number) =>
{
   const index =  times.findIndex(
    (t:Time) => t.id == id);

  //Validar se encontrou algum item  
  if(index !== -1){
    //remover da lista
    times.splice(index, 1)
    atualizarDados()
  }
  exibirTabela()
}

const editarItem = (id:number) => {
  //Find = buscar um elemento em um array
  const item = timesSalvos.find(
    (t : Time) => t.id ==id);
  
  if(!item)  return;

  formItens.nomeI.value = item.nome;
  formItens.nomeCurtoI.value = item.nomeCurto;
  
  //findIndex buscar o index do objeto
  const campIndex = timesSalvos.findIndex((t : Time) => t.id ==id);


  //Validar se encontrou algum item  
  if(campIndex !== -1){
    //remover da lista
    timesSalvos.splice(campIndex, 1);
    times = timesSalvos;
    atualizarDados();
  }
  exibirTabela();
}

const exibirTabela = () => {
  tabela!.innerHTML = "";
  times.forEach((time : Time) =>{
    tabela!.innerHTML += `
    <tr>
         <td>${time.nome}</td>
         <td>${time.nomeCurto}</td>
         <button class="btnEdit" data-id="${time.id}""> Editar </button> 
              <button class="btnRemove" data-id="${time.id}"> Remover </button> 
    </tr>
  `;
  })
}

const atualizarDados = () => {
localStorageCtrl.setLocalStorageItems("times", times)
  exibirTabela()
  editarOuRemoverListeners()
}

const editarOuRemoverListeners = () => {
  const editarBtns = document.querySelectorAll("button.btnEdit")
  const removerBtns = document.querySelectorAll("button.btnRemove")
  editarBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      console.log("cliked editar", btn)
      const id = Number((event.target as HTMLElement).getAttribute("data-id"));
      editarItem(id);
    });
  });

  removerBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      console.log("cliked remover", btn)
      const id = Number((event.target as HTMLElement).getAttribute("data-id"));
      removerItem(id);
    });
  });
}

gerarTimesListener()
exibirTabela()
editarOuRemoverListeners()