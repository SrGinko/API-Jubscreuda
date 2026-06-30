import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../db/prisma.provider';
import { Item, ItemType, Prisma, Raridade } from '@prisma/client';

@Injectable()
export class ItemProvider {
    constructor(private prisma: PrismaProvider) { }

    async obterTodos() {
        return this.prisma.item.findMany();
    }

    async obterUnico(id: number) {
        return this.prisma.item.findUnique({
            where: {
                id: id
            },
        });
    }

    async obterPorTipo(raridade: Raridade) {
        return this.prisma.item.findMany({
            where: {
                raridade: raridade
            }
        })
    }

    async Criar(item: Prisma.ItemCreateInput): Promise<Item> {
        return this.prisma.item.create({
            data: item,
        });
    }

    async Atualizar(id: number, item: Prisma.ItemUpdateInput): Promise<Item> {
        return this.prisma.item.update({
            where: {
                id: id
            },
            data: item,
        });
    }

    async Excluir(id: number): Promise<Item> {
        return this.prisma.item.delete({
            where: {
                id: id
            },
        });
    }
}