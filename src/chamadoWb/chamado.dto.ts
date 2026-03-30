export type Chamado = {
    id: number,
    titulo: string,
    descricao: string,
    inicioEvento: Date,
    classificacao: string,
    proxEscalonamento?: Date,
    creatAt?: Date;
    update?: Date;
}