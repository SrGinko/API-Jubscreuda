import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaProvider } from '../db/prisma.provider';
import { Prisma } from "@prisma/client"
import { Heroes } from './heroes.dto';

@Injectable()
export class HeroesProvider {
    constructor(private readonly prisma: PrismaProvider) { }

    async obterTodos(): Promise<Heroes[]> {
        return this.prisma.heroi.findMany()
    }

    async obterUnico(userID: string): Promise<Heroes | null> {

        if (!userID) {
            throw new BadRequestException("ID não informado")
        }

        const herois = await this.prisma.heroi.findUnique({
            where: {
                userID: userID,
            }
        })

        if (!herois) {
            throw new BadRequestException("Heroi não encontrado")
        }

        return herois
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
                user: {
                    connect: {
                        id: heroi.userID,
                    }
                }
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
}
