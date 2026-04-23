import { Temporada } from "@prisma/client";

export interface Episodio {
    id: string;
    titulo: string;
    numero: number;
    capaUrl?: string;
    temporadaId: string;
    temporada?: Temporada;
}   