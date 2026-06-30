import { Episodio } from "@prisma/client";

export interface Temporada {
    id: string;
    numero: number;
    serieId: number;
    episodios?: Episodio;
}