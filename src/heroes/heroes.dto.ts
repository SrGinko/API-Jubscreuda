import { Inventario } from "src/inventario/inventario.dto";

export interface Heroes {
    id: string;
    userID: string;
    nome: string;
    hp: number;
    attack: number;
    defense: number;
    level: number;
    xp: number;
    moeda: number;
    armaID?: number | null;
    armaduraID?: number | null;
    calcaID?: number | null;
    creatAt?: Date;
    update?: Date;
    inventario?: {
        conect?: { id: string },
        create?: {
            itens?: {
                create?: {
                    itemID: number;
                    quatidade: number;
                }[]
            }
        };
    }
}
