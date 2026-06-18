import { BadRequestException, Injectable } from "@nestjs/common";
import { Projetos } from "@prisma/client";
import { PrismaProvider } from "../db/prisma.provider";

@Injectable()
export class ProjetcProvider {
    constructor(private prisma: PrismaProvider) { }

    async obterTodos(): Promise<Projetos[]> {
        return this.prisma.projetos.findMany()
    }

    async obterUnico(id: number): Promise<Projetos | null> {
        const projetosCreated = await this.prisma.projetos.findUnique({
            where: {
                id: id
            }
        })

        if (!projetosCreated) {
            throw new BadRequestException('Projeto não encontrado')
        }

        return projetosCreated
    }

    async Criar(projetos: Projetos): Promise<Projetos> {
        return this.prisma.projetos.create({
            data: projetos
        })
    }

    async Atualizar(id: number, projetos: Projetos): Promise<Projetos> {
        if (!id)
            throw new BadRequestException('ID não fornecido')

        const projetosUpdated = await this.prisma.projetos.update({
            where: {
                id: id
            },
            data: projetos
        })

        if (!projetosUpdated) {
            throw new BadRequestException('Projeto não encontrado')
        }

        return projetosUpdated
    }
}