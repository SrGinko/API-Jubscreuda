import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { APIKey } from "src/guards/APIKey";
import { SerieProvider } from "./serie.provider";

@UseGuards(APIKey)
@Controller('serie')
export class SerieController {
    constructor(private readonly serie: SerieProvider) {}

    @Get()
    async obterTodos(){
        return this.serie.obterTodos()
    }

    @Get(':id')
    async obterPorId(@Param('id') id: string){
        return this.serie.obterUnico(Number(id))
    }

    @Post()
    async Criar(@Param('id') id: number){
        return this.serie.Criar(id as any)
    }

    @Patch(':id')
    async Atualizar(@Param('id') id: string, @Body() data: any){
        return this.serie.Atualizar(Number(id), data)
    }

    @Delete(':id')
    async Deletar(@Param('id') id: string){
        return this.serie.Delete(Number(id))
    }
}