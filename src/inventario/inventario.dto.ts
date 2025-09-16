export interface Inventario {
  id: string;
  heroiID: string;
  itens: ItensInventario[];
}

export interface ItensInventario {
  id: string;
  quantidade: number;
  inventarioID?: string;
  itemID: number;
}
