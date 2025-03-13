const campeonatoForm = document.getElementById("formCampeonatos");

type Categoria = "amador" | "profissional";
type Torneio = "mata-mata" | "pontos-corridos";

interface Campeonato{
    nome: string;
    categoria: Categoria;
    tipoTorneio: Torneio;
    dataInicio: Date;
    dataTermino: Date;
}


interface Time{
    nome: string;
    nomeCurto: string;
}

interface Partida{
    timeMandante: string;
    timeVisitante: string;
    campeonato: Campeonato;
}

let campeonatos: Campeonato[] = [{
    categoria: "amador",
    dataInicio: new Date("2022-02-25"),
    dataTermino: new Date("2022-05-26"),
    nome: "brasileirao",
    tipoTorneio: "mata-mata"
}];
let times: Time[] = [];
let partidas: Partida[] = [];

const updateLocalStorage = (itemName: string, value: any) => {
    const localStorageItem = JSON.stringify(value);
    localStorage.setItem(itemName, localStorageItem);
}

const gerarCampeonatosListener = () => {
    campeonatoForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        
        let campeonatoFormItens = {
            nomeI: document.getElementById("nome") as HTMLFormElement,
            categoriaI: document.getElementById("categoria") as HTMLFormElement,
            torneioI: document.getElementById("torneio") as HTMLFormElement,
            inicioI: document.getElementById("dataInicio") as HTMLFormElement,
            fimI: document.getElementById("dataFim") as HTMLFormElement
        }

        let campeonato: Campeonato = {
            nome: campeonatoFormItens.nomeI.value ?? "",
            categoria: campeonatoFormItens.categoriaI.value ?? "",
            tipoTorneio: campeonatoFormItens.torneioI.value ?? "",
            dataInicio: campeonatoFormItens.inicioI.value ?? "",
            dataTermino: campeonatoFormItens.fimI.value ?? ""
        }
        campeonatos.push(campeonato)
    })
    updateLocalStorage("campeonatos", campeonatos);
}

const gerarTimes = () => {
    let time1: Time = {
        nome: "Corinthians", 
        nomeCurto: "CO"
    };
    times.push(time1)
}

const gerarPartidas = () => {
    let partida1: Partida = {
        timeMandante: "CO", timeVisitante: "BA", campeonato: campeonatos[0]
    };
    partidas.push(partida1);
}

const gerarTextos = (item:  Partida | Campeonato | Time, parentEl: HTMLElement | null) => {
    Object.keys(item).forEach((key:string) =>{
        let paragraphEl = document.createElement("p");
        let content = item[key as keyof (typeof item)];
        console.log(`${key} - ${content}`);
        paragraphEl.textContent = `${key} - ${content}`;
        parentEl?.appendChild(paragraphEl);
    })
}

const gerarParagrafos = (itens: Partida[] | Campeonato[] | Time[], parentEl: HTMLElement | null, label: string) => {
    let titleEl = document.createElement("h3");
    titleEl.innerText = label;
    parentEl?.appendChild(titleEl);
    itens.forEach((item) => {
        gerarTextos(item, parentEl);
     })
}



const exibirItens = () => {
     const partidasEl = document.getElementById("partidas");
     const campeonatosEl = document.getElementById("campeonatos");
     const timesEl = document.getElementById("times");
     const campeonatosLocal = JSON.parse(localStorage.getItem("campeonatos") ?? "") as Campeonato[];
    if(campeonatosLocal){
        gerarParagrafos(campeonatosLocal, campeonatosEl, "Campeonatos");
    }
    gerarPartidas()
    gerarTimes()
    gerarParagrafos(partidas, partidasEl, "Partidas"); 
    gerarParagrafos(times, timesEl, "Times"); 
}


gerarCampeonatosListener()
exibirItens()