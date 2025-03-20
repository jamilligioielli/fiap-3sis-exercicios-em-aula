import { Campeonato } from "./interfaces";
import { LocalStorageCtrl } from "./localstoragectrl";

const form = document.getElementById("formCampeonatos");
const tabela = document.getElementById("campeonatos");
const localStorageCtrl = new LocalStorageCtrl();


let campeonatos: Campeonato[] = [{
    categoria: "amador",
    dataInicio: new Date("2022-02-25"),
    dataTermino: new Date("2022-05-26"),
    nome: "brasileirao",
    tipoTorneio: "mata-mata",
    id: 0
}];


const gerarCampeonatosListener = () => {
    form?.addEventListener("submit", (event) => {
        event.preventDefault();
        
        let formItens = {
            nomeI: document.getElementById("nome") as HTMLFormElement,
            categoriaI: document.getElementById("categoria") as HTMLFormElement,
            torneioI: document.getElementById("torneio") as HTMLFormElement,
            inicioI: document.getElementById("dataInicio") as HTMLFormElement,
            fimI: document.getElementById("dataFim") as HTMLFormElement
        }

        let campeonato: Campeonato = {
            id: Math.random(),
            nome: formItens.nomeI.value ?? "",
            categoria: formItens.categoriaI.value ?? "",
            tipoTorneio: formItens.torneioI.value ?? "",
            dataInicio: formItens.inicioI.value ?? "",
            dataTermino: formItens.fimI.value ?? ""
        }
        campeonatos.push(campeonato)
    })
    localStorageCtrl.setLocalStorageItems("campeonatos", campeonatos);
}


const exibirItens = () => {
     const campeonatosEl = document.getElementById("campeonatos");
     const timesEl = document.getElementById("times");
     const campeonatosLocal = localStorageCtrl.getLocalStorageItem("campeonato") as Campeonato[];
    
}


gerarCampeonatosListener()
