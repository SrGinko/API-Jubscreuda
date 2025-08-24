import { Controller, Post, Get, Param, Body, Patch } from '@nestjs/common';
import { InventarioProvider } from './inventario.provider';
import { Inventario } from './inventario.dto';

@Controller('inventario')
export class InventarioController {
    constructor(private readonly repo: InventarioProvider) { }

    @Get()
    async obterTodos() {
        return this.repo.obterTodos();
    }

    @Get(':heroiID')
    async obterUnico(@Param('heroiID') heroiID: string) {
        return this.repo.obterUnico(heroiID);
    }

    @Patch(':heroiID')
    async atualizar(@Param('heroiID') heroiID: string, @Body() inventario: Inventario) {
        return this.repo.atualizar(heroiID, inventario);
    }
}
