import { Time } from "./interfaces";
import { LocalStorageCtrl } from "./localstoragectrl";

const timeForm = document.getElementById("formTimes");
const tabela = document.getElementById("times");
const localStorageCtrl = new LocalStorageCtrl();

let times: Time[] = [];

const gerarTimesListener = () => {
    timeForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        
        let timeFormItens = {
            nomeI: document.getElementById("nome") as HTMLFormElement,
            nomeCurtoI: document.getElementById("nomeCurto") as HTMLFormElement,
        }

        let time: Time = {
            nome: timeFormItens.nomeI.value ?? "",
            nomeCurto:  timeFormItens.nomeCurtoI.value ?? ""
        }
        times.push(time)
    })
    localStorageCtrl.setLocalStorageItems("times", times);
}

const exibirTabela = () => {
    tabela!.innerHTML = "";
  times.forEach((time : Time) =>{
    tabela!.innerHTML += `
    <tr>
         <td>${time.nome}</td>
         <td>${time.nomeCurto}</td>
    </tr>
  `;
  })
}

gerarTimesListener();
exibirTabela();