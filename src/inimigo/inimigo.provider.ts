import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaProvider } from '../db/prisma.provider';
import { Inimigo, Prisma } from '@prisma/client';

@Injectable()
export class InimigoProvider {
    constructor(private prisma: PrismaProvider) { }

    async obterTodos() {
        return this.prisma.inimigo.findMany()
    }

    async obterUnico(id: number) {

        if (!id) {
            throw new BadRequestException('Id não informado')
        }

        const enemy = this.prisma.inimigo.findUnique({
            where: {
                id: id
            }
        })

        if (!enemy) {
            throw new BadRequestException('Inimigo não encontrado')
        }

         return enemy
    }

    async Criar(inimigo: Inimigo) {
        const inimigoExistente = this.prisma.inimigo.findUnique({
            where: {
                id: inimigo.id
            }
        })

        if (!inimigoExistente) {
            throw new BadRequestException("Inimigo já existe")
        }

        return this.prisma.inimigo.create({
            data: inimigo
        })
    }

    async Atualizar(id: number, inimigo: Prisma.InimigoUpdateInput): Promise<Inimigo> {
        return this.prisma.inimigo.update({
            where: {
                id: id
            },
            data: inimigo
        })
    }

    async Delete(id: number) {
        return this.prisma.inimigo.delete({
            where: {
                id: id
            }
        })
    }
}