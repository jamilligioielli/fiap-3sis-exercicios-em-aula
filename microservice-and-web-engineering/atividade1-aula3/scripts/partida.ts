
import { Campeonato, Partida } from "./interfaces";
import { LocalStorageCtrl } from "./localstoragectrl";

const form = document.getElementById("formPartida") as HTMLFormElement;
const formItens = {
    campeonatoId: document.getElementById("campeonato") as HTMLFormElement,
    mandanteI: document.getElementById("timeMandante") as HTMLFormElement,
    visitanteI: document.getElementById("timeVisitante") as HTMLFormElement,
}
const tabela = document.getElementById("partidas");
const localStorageCtrl = new LocalStorageCtrl();
const campeonatos = localStorageCtrl.getLocalStorageItem("campeonatos") as Campeonato[];
const partidasSalvas = localStorageCtrl.getLocalStorageItem("partidas") as Partida[];

let partidas: Partida[] = [];

const gerarListaListener = () => {
    form?.addEventListener("submit", (event) => {
        event.preventDefault();

        let partida: Partida = {
            id: Math.random(),
            campeonato: campeonatos.find(c => c.id == Number.parseInt(formItens.campeonatoId.value)) ?? null,
            timeMandante: formItens.mandanteI.value ?? "",
            timeVisitante: formItens.visitanteI.value ?? "",
        }
        partidas.push(partida)
    })
    atualizarDados();
    form?.reset()
}

const atualizarDados = () => {
localStorageCtrl.setLocalStorageItems("partida", partidas)
  exibirTabela()
}

const removerItem = (id:number) =>
{
   const campIndex =  campeonatos.findIndex(
    (c:Campeonato) => c.id == id);

  //Validar se encontrou algum item  
  if(campIndex !== -1){
    //remover da lista
    campeonatos.splice(campIndex, 1)
  }
  localStorageCtrl.setLocalStorageItems("partida", partidas)
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
  }
  atualizarDados();
}

const exibirTabela = () => {
    tabela!.innerHTML = "";
  partidas.forEach((p : Partida) =>{
    tabela!.innerHTML += `
    <tbody>
        <tr>
            <td>${p.campeonato!.nome ?? "N/A"}</td>
            <td>${p.timeMandante}</td>
            <td>${p.timeVisitante}</td>
            <button onclick="editarItem(${p.id})"> Editar </button> 
            <button onclick="removerItem(${p.id})"> Remover </button> 
        </tr>
    </tbody>
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

gerarListaListener();
exibirTabela();
exibirCampeonatos();