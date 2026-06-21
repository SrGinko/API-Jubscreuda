export interface Projeto {
    id: number;
    nome: string;
    url: string;
    descricao: string;
    emProgresso: boolean;
    imagens?: ImagemProjetos[];
    dataCriacao?: Date;
    dataAtualizacao?: Date;
    tecnologias?: Tecnologia[];
}

export interface ImagemProjetos{
    id: number;
    url: string;
    descricao: string;
    nomeImagem: string;
}

export interface Tecnologia {
    id: number;
    nome: string;
    nivel: string;
    principal: boolean;
}