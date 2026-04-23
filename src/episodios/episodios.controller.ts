import { Body, Controller, Delete, Get,Param, Patch, Post, UseGuards } from "@nestjs/common";
import { APIKey } from "src/guards/APIKey";
import { EpisodiosProvider } from "./episodios.provider";
import { Episodio } from "@prisma/client";

@UseGuards(APIKey)
@Controller('serie/episodios')
export class EpisodiosController{
    constructor(private readonly episodio: EpisodiosProvider){}

    @Get('temporada/:temporadaId')
    async obterPorTemporada(@Param('temporadaId') temporadaId: string){
        return this.episodio.obterTodos(temporadaId);
    }

    @Get(':id')
    async obterPorId(@Param('id') id: string){
        return this.episodio.obterUnico(id);
    }

    @Post()
    async Criar(@Body() episodio: Episodio){
        return this.episodio.Criar(episodio)
    }

    @Patch(':id')
    async Atualizar(@Param('id') id: string, @Body() episodio: Episodio){
        return this.episodio.Atualizar(id, episodio);
    }

    @Delete(':id')
    async Deletar(@Param('id') id: string){
        return this.episodio.Deletar(id);
    }
}   