import { Temporada } from "@prisma/client";

export interface Serie {
    id: string;
    capaUrl?: string;
    titulo: string;
    baseUrl: string;
    criadoEm?: Date;
    atualizadoEm?: Date;
    temporadas?: Temporada[];
}