import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CanaisProvider } from './canais.provider';
import { APIKey } from '../guards/APIKey';
import { Canal } from '@prisma/client';

@UseGuards(APIKey)
@Controller('tv/canais')
export class CanaisController {
    constructor(private readonly canais: CanaisProvider) { }

    @Get()
    async obterTodos(): Promise<Canal[]> {
        return await this.canais.ObterTodos()
    }

    @Get()
    async obterUnico(@Body() id: number): Promise<Canal | null> {
        return await this.canais.ObterUnico(id)
    }

    @Post()
    async Criar(@Body() canal: Canal): Promise<Canal> {
        return await this.canais.Criar(canal)
    }

    @Patch()
    async Atualizar(@Body() id: number, @Body() canal: Canal): Promise<Canal> {
        return await this.canais.Atualizar(id, canal)
    }

    @Delete()
    async Delete(@Body() id: number): Promise<Canal>{
        return await this.canais.Delete(id)
    }
}
