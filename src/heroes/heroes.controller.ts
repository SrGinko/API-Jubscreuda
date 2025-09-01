import { Body, Controller, Get, Param, Patch, Post, Delete, UseGuards } from '@nestjs/common';
import { HeroesProvider } from './heroes.provider';
import { Heroes } from './heroes.dto';
import { APIKey } from '../guards/APIKey';

@UseGuards(APIKey)
@Controller('heroes')
export class HeroesController {
    constructor(private readonly repo: HeroesProvider) { }
    
    @Get()
    async obterTodos(): Promise<Heroes[]> {
        return this.repo.obterTodos();
    }

    @Get(':id')
    async obterPorId(@Param('id') id: string): Promise<Heroes | null> {
        return this.repo.obterUnico(id)
    }
    
    @Post()
    async Criar(@Body() heroi: Heroes): Promise<Heroes> {
        return this.repo.Criar(heroi);
    }

    @Patch(':id')
    async UpdateHeroi(@Param('id') id: string, @Body() heroi: Heroes): Promise<Heroes> {
        return this.repo.updateHeroi(id, heroi);
    }

    @Delete(':id')
    async deletarHeroi(@Param('id') id: string): Promise<Heroes> {
        return this.repo.deletarHeroi(id);
    }

    @Patch(':heroiID/inventario/adicionar')
    async adicionarItem(@Param('heroiID') heroiID: string, @Body('itemID') itemID: number, @Body('quantidade') quantidade: number): Promise<any> {
        return this.repo.adicionarItem(heroiID, itemID, quantidade);
    }

    @Patch(':heroiID/inventario/remover')
    async removerItem(@Param('heroiID') heroiID: string, @Body('itemID') itemID: number, @Body('quantidade') quantidade: number): Promise<any> {
        return this.repo.removerItem(heroiID, itemID, quantidade);
    }

}