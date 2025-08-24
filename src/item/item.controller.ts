import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ItemProvider } from './item.provider';
import { Item } from '@prisma/client';
import { APIKey } from '../guards/APIKey';
import { UseGuards } from '@nestjs/common';

@UseGuards(APIKey)
@Controller('itens')
export class ItemController {
    constructor(private readonly repo: ItemProvider) {}

    @Get()
    async obterTodos() {
        return this.repo.obterTodos();
    }

    @Get(':id')
    async obterUnico(@Param('id') id: number) {
        return this.repo.obterUnico(id);
    }

    @Post()
    async criar(@Body() item: Item): Promise<Item> {
        return this.repo.Criar(item);
    }

    @Delete(':id')
    async deletar(@Param('id') id: number): Promise<Item> {
        return this.repo.Excluir(id);
    }

    @Patch(':id')
    async atualizar(@Param('id') id: number, @Body() item: Item): Promise<Item> {
        return this.repo.Atualizar(id, item);
    }
}
