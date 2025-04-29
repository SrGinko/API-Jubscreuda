export interface Usuario{
    id: string;
    username: string;
    email: string;
    senha?:string;
    foto: string;
    nivel: number;
    xp : number;
    wallpaper: number;
    quatidadeMensagens?:number;
}