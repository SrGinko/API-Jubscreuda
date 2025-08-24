import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../db/prisma.provider';
import { Item, Prisma } from '@prisma/client';

@Injectable()
export class ItemProvider {
    constructor(private prisma: PrismaProvider){}

    async obterTodos() {
        return this.prisma.item.findMany();
    }

    async obterUnico(id: number) {
        return this.prisma.item.findUnique({
            where: { id },
        });
    }

    async Criar(item: Prisma.ItemCreateInput): Promise<Item> {
        return this.prisma.item.create({
            data: item,
        });
    }

    async Atualizar(id: number, item: Prisma.ItemUpdateInput): Promise<Item> {
        return this.prisma.item.update({
            where: { id },
            data: item,
        });
    }

    async Excluir(id: number): Promise<Item> {
        return this.prisma.item.delete({
            where: { id },
        });
    }
}
