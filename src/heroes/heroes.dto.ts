import { JsonValue } from "@prisma/client/runtime/library";

export interface Heroes {
    id: string;
    userID: string;
    nome: string;
    hp: number;
    attack: number;
    defense: number;
    level: number;
    xp: number;
    creatAt?: Date;
    update?: Date;
}
