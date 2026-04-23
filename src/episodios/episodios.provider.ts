import { BadRequestException, Injectable } from "@nestjs/common";
import { Episodio } from "@prisma/client";
import { PrismaProvider } from "src/db/prisma.provider";

@Injectable()
export class EpisodiosProvider {
    constructor(private prisma: PrismaProvider) { }

    async obterTodos(temporadaId: string) {
        return this.prisma.episodio.findMany({
            where: {
                temporadaId
            }
        })
    }

    async obterUnico(id: string) {

        if (!id) {
            throw new BadRequestException('ID é obrigatório')
        }

        const episodio = await this.prisma.episodio.findUnique({
            where: {
                id
            }
        })

        if (!episodio) {
            throw new BadRequestException('Episodio não encontrado')
        }

        return episodio
    }

    async Criar(episodio: Episodio): Promise<Episodio> {
        return this.prisma.episodio.create({
            data: episodio
        })
    }

    async Atualizar(id: string, episodio: Episodio): Promise<Episodio> {
        if (!id) {
            throw new BadRequestException('ID é obrigatório')
        }

        const episodioExistente = await this.prisma.episodio.findUnique({
            where: {
                id
            }
        })

        if (!episodioExistente) {
            throw new BadRequestException('Episodio não encontrado')
        }

        return this.prisma.episodio.update({
            where: {
                id
            },
            data: episodio
        })
    }

    async Deletar(id: string) {
        if (!id) {
            throw new BadRequestException('ID é obrigatório')
        }

        const episodioExistente = await this.prisma.episodio.findUnique({
            where: {
                id
            }
        })

        if (!episodioExistente) {
            throw new BadRequestException('Episodio não encontrado')
        }

        return this.prisma.episodio.delete({
            where: {
                id
            }
        })
    }
}
