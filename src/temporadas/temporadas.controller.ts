import { Body, Controller, Get, Param, UseGuards, Post } from "@nestjs/common";
import { APIKey } from "src/guards/APIKey";
import { TemporadasProvider } from "./temporadas.provider";
import { Temporada } from "@prisma/client";

@UseGuards(APIKey)
@Controller('serie/temporada')
export class TemporadasController {
    constructor(private readonly temporada: TemporadasProvider) {}

    @Get(':serieId')
    async obterTodos(@Param('serieId') serieId: number){
        return this.temporada.obterTodos(serieId);
    }

    @Get(':serieId')
    async obterUnico(@Param('serieId')serieId: number){
        return this.temporada.obterUnico(serieId);
    }

    @Post()
    async Criar(@Body() temporada: Temporada): Promise<Temporada>{
        return this.temporada.Criar(temporada)
    }
}