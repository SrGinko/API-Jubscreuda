export interface Projeto {
    id: number;
    nome: string;
    url: string;
    descricao: string;
    emProgresso: boolean;
    imagens: string[];
    dataCriacao?: Date;
    dataAtualizacao?: Date;
}