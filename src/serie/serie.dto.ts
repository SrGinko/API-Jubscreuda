import { Temporada } from "@prisma/client";

export interface Serie {
    id: string;
    criadoEm?: Date;
    atualizadoEm?: Date;
    temporadas?: Temporada[];
}