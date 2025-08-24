import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaProvider } from '../db/prisma.provider';
import { Heroi, Prisma } from "@prisma/client"
import { Heroes } from './heroes.dto';

@Injectable()
export class HeroesProvider {
    constructor(private readonly prisma: PrismaProvider) { }

    async obterTodos(): Promise<Heroes[]> {
        return this.prisma.heroi.findMany()
    }

    async obterUnico(userID: string): Promise<Heroi | null> {

        if (!userID) {
            throw new BadRequestException("ID não informado")
        }

        const heroi = await this.prisma.heroi.findUnique({
            where: { userID },
            include: {
                inventario: {
                    include: {
                        itens: {
                            include: { item: true }
                        }
                    }
                }
            }
        });

        if (!heroi) {
            throw new BadRequestException("Heroi não encontrado")
        }

        return heroi;
    }

    async Criar(heroi: Heroes) {

        if (!heroi.userID) {
            throw new BadRequestException("ID do usuário não informado")
        }

        const heroiExist = await this.prisma.heroi.findUnique({
            where: {
                userID: heroi.userID,
            }
        })

        if (heroiExist) {
            throw new BadRequestException("Heroi já existe")
        }

        return this.prisma.heroi.create({
            data: {
                nome: heroi.nome,
                inventario: {
                    create: {
                        itens: {
                            create: [{
                                quantidade: 1,
                                item: { connect: { id: 1 } }
                            }]
                        }
                    }
                },
                user: {
                    connect: {
                        id: heroi.userID,
                    }
                },
            },
        })
    }

    async updateHeroi(id: string, heroi: Prisma.HeroiUpdateInput): Promise<Heroes> {
        return this.prisma.heroi.update({
            where: {
                id: id,
            },
            data: heroi,
        })
    }

    async deletarHeroi(id: string): Promise<Heroes> {
        return this.prisma.heroi.delete({
            where: {
                id: id,
            },
        })
    }

    async adicionarItem(heroiID: string, itemID: number, quantidade = 1) {
        const inventario = await this.prisma.inventario.findUnique({
            where: { heroiID: heroiID }
        })

        if (!inventario) {
            throw new Error("Inventario não encontrado para esse herói")
        }

        return await this.prisma.itemInventario.upsert({
            where: {
                inventarioId_itemID: {
                    inventarioId: inventario.id,
                    itemID: itemID
                }
            },
            create: {
                quantidade,
                inventario: { connect: { id: inventario.id } },
                item: { connect: { id: itemID } }
            },
            update: {
                quantidade: {
                    increment: quantidade
                }
            }
        })
    }
}
