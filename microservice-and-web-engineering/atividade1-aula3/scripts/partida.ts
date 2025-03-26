
import { Campeonato, Partida } from "./interfaces";
import { LocalStorageCtrl } from "./localstoragectrl.js";

const form = document.getElementById("formPartida") as HTMLFormElement;
const formItens = {
    campeonatoId: document.getElementById("campeonato") as HTMLFormElement,
    mandanteI: document.getElementById("timeMandante") as HTMLFormElement,
    visitanteI: document.getElementById("timeVisitante") as HTMLFormElement,
}
const tabela = document.getElementById("partidas");
const localStorageCtrl = new LocalStorageCtrl();

let partidas: Partida[] = [];
const partidasSalvas = localStorageCtrl.getLocalStorageItem("partidas") as Partida[];
const campeonatos = localStorageCtrl.getLocalStorageItem("campeonatos") as Campeonato[];

const gerarListaListener = () => {
    form?.addEventListener("submit", (event) => {
        event.preventDefault();
        let lastIdIncrement = partidasSalvas && partidasSalvas.length > 0 ? partidasSalvas[partidasSalvas.length - 1].id + 1 : 1;
        let partida: Partida = {
            id: lastIdIncrement,
            campeonato: campeonatos.find(c => c.id == Number.parseInt(formItens.campeonatoId.value)) ?? null,
            timeMandante: formItens.mandanteI.value ?? "",
            timeVisitante: formItens.visitanteI.value ?? "",
        }
        partidas.push(partida)
        form?.reset()
        atualizarDados()
      })
      exibirTabela()
}

const atualizarDados = () => {
localStorageCtrl.setLocalStorageItems("partida", partidas)
  exibirTabela()
  editarOuRemoverListeners()
}

const removerItem = (id:number) =>
{
   const campIndex =  partidasSalvas.findIndex(
    (p:Partida) => p.id == id);

  //Validar se encontrou algum item  
  if(campIndex !== -1){
    //remover da lista
    partidasSalvas.splice(campIndex, 1)
    partidas = partidasSalvas;
    atualizarDados()
  }
  exibirTabela()
}

const editarItem = (id:number) => {
  //Find = buscar um elemento em um array
  const partida = partidasSalvas.find(
    (p : Partida) => p.id ==id);
  
  if(!partida)  return;

  formItens.campeonatoId.value = partida.campeonato!.id ?? 0;
  formItens.mandanteI.value = partida.timeMandante;
  formItens.visitanteI.value = partida.timeVisitante;
  
  //findIndex buscar o index do objeto
  const campIndex = partidasSalvas.findIndex((p : Partida) => p.id ==id);


  //Validar se encontrou algum item  
  if(campIndex !== -1){
    //remover da lista
    partidasSalvas.splice(campIndex, 1);
    partidas = partidasSalvas;
    atualizarDados();
  }
  exibirTabela()
}

const exibirTabela = () => {
  if(tabela!.innerHTML != "")
    tabela!.innerHTML = "";
  partidas.forEach((p : Partida) =>{
    tabela!.innerHTML += `
    <tr>
        <td>${p.campeonato!.nome ?? "N/A"}</td>
        <td>${p.timeMandante}</td>
        <td>${p.timeVisitante}</td>
        <button class="btnEdit" data-id="${p.id}""> Editar </button> 
              <button class="btnRemove" data-id="${p.id}"> Remover </button>
    </tr>
  `;
  })
}

const exibirCampeonatos = () => {
    const selectCampeonatos = document.getElementById("campeonatos") as HTMLSelectElement;
    selectCampeonatos!.innerHTML = "";
    campeonatos.forEach((c : Campeonato) =>{
      selectCampeonatos!.innerHTML += `
      <option value="${c.id}">${c.nome}</option>
    `;
    })
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

gerarListaListener()
exibirCampeonatos()
exibirTabela()
editarOuRemoverListeners()