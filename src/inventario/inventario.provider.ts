import { Injectable } from '@nestjs/common';
import { Inventario } from './inventario.dto';
import { PrismaProvider } from '../db/prisma.provider';

@Injectable()
export class InventarioProvider {
    constructor(private prisma: PrismaProvider) { }

    async obterTodos(): Promise<Inventario[]> {
        return this.prisma.inventario.findMany({
            include: {
                itens: {
                    include: {
                        item: true,
                    },
                },
            },
        });
    }

    async obterUnico(heroiID: string): Promise<Inventario | null> {
        return this.prisma.inventario.findUnique({
            where: {
                heroiID: heroiID,
            },
            include: {
                itens: {
                    include: {
                        item: true,
                    },
                },
            },
        })
    }

    async atualizar(heroiID: string, inventario: Inventario) {
        return this.prisma.inventario.update({
            where: {
                heroiID,
            },
            data: {
                itens: {
                    upsert: inventario.itens.map(item => ({
                        where: {
                            inventarioId_itemID: {
                                inventarioId: inventario.id,
                                itemID: item.itemID,
                            },
                        },
                        update: {
                            quantidade: item.quantidade,
                        },
                        create: {
                            itemID: item.itemID,
                            quantidade: item.quantidade,
                        },
                    })),
                },
            },
            include: {
                itens: {
                    include: {
                        item: true,
                    },
                },
            },
        });
    }

    async deletar(heroiID: string) {
        return this.prisma.inventario.delete({
            where: {
                heroiID: heroiID,
            },
        })
    }
}
