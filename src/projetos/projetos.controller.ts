import { Controller, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { APIKey } from "../guards/APIKey";
import { ProjetcProvider } from "./projetos.provider";

@UseGuards(APIKey)
@Controller('projetos')
export class ProjetosController {
    constructor(private readonly projetos: ProjetcProvider) { }

    @Get()
    async obterTodos() {
        return this.projetos.obterTodos();
    }

    @Get(':id')
    async obterUnico(id: number) {
        return this.projetos.obterUnico(id);
    }

    @Post()
    async criarProjeto(projeto: any) {
        return this.projetos.Criar(projeto);
    }

    @Patch(':id')
    async atualizarProjeto(id: number, projeto: any) {
        return this.projetos.Atualizar(id, projeto);
    }
}