
type Categoria = "amador" | "profissional";
type Torneio = "mata-mata" | "pontos-corridos";

export interface Campeonato{
    id: number;
    nome: string;
    categoria: Categoria;
    tipoTorneio: Torneio;
    dataInicio: Date;
    dataTermino: Date;
}

export interface Partida{
    id: number;
    timeMandante: string;
    timeVisitante: string;
    campeonato: Campeonato | null;
}

export interface Time{
    id: number;
    nome: string;
    nomeCurto: string;
}

