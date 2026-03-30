import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { APIKey } from "../guards/APIKey";
import { ChamadosService } from "./chamado.provider";
import { Chamado } from "./chamado.dto";

@UseGuards(APIKey)
@Controller('noc/chamados')
export class ChamadosController {
    constructor (private readonly chamados: ChamadosService){}

    @Get()
    async obterTodos(): Promise<Chamado[] | any>{
        return this.chamados.obterTodos()
    }

    @Get(':id')
    async obterUnico(@Param('id',ParseIntPipe) id: number): Promise<Chamado | null>{
        return this.chamados.obterUnico(id) as Promise<Chamado | null>
    }

    @Post()
    async Criar(@Body() chamado: Chamado): Promise<Chamado | any>{
        return this.chamados.Criar(chamado as any)
    }

    @Delete(':id')
    async Deletar(@Param('id', ParseIntPipe) id: number){
        return this.chamados.Delete(id)
    }

    @Patch(':id')
    async Atualizar(@Param('id', ParseIntPipe) id: number, @Body() chamado: Chamado){
        return this.chamados.Atualizar(id, chamado)
    }
}