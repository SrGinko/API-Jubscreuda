import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Canal } from '@prisma/client';
import { PrismaProvider } from '../db/prisma.provider';

@Injectable()
export class CanaisProvider {
    constructor(private readonly prisma: PrismaProvider) { }

    async ObterTodos(): Promise<Canal[]> {
        return await this.prisma.canal.findMany()
    }

    async ObterUnico(id: number): Promise<Canal | null> {
        if (!id) {
            throw new BadRequestException('Não foi informado o ID')
        }

        const canal = await this.prisma.canal.findUnique({
            where: {
                id: id
            }
        })

        if (!canal) {
            throw new NotFoundException("Não foi encontrado Canal com esse ID")
        }

        return canal
    }

    async Criar(canal: Canal): Promise<Canal> {

        return this.prisma.canal.create({
            data: canal
        })
    }

    async Atualizar(id: number, canal: Canal): Promise<Canal> {
        if (!id) {
            throw new BadRequestException('Não foi informado o ID')
        }

        return this.prisma.canal.update({
            where: {
                id: id
            },
            data: canal
        })
    }

    async Delete(id: number): Promise<Canal> {
        if (!id) {
            throw new BadRequestException('Não foi informado o ID')
        }

        return this.prisma.canal.delete({
            where: {
                id: id
            },

        })

    }

}
