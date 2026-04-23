import { BadRequestException, Injectable } from "@nestjs/common";
import { Serie } from "@prisma/client";
import { PrismaProvider } from "src/db/prisma.provider";

@Injectable()
export class SerieProvider {
    constructor(private prisma: PrismaProvider) { }

    async obterTodos(): Promise<Serie[]> {
        return this.prisma.serie.findMany({
            include: {
                temporadas: {
                    include: {
                        episodios: true
                    }
                }
            }
        })
    }
    async obterUnico(id: number): Promise<Serie | null> {
        if (!id) {
            throw new BadRequestException('Id não informado')
        }

        const serie = await this.prisma.serie.findUnique({
            where: {
                id
            },
            include: {
                temporadas: {
                    include: {
                        episodios: true
                    }
                }
            }
        })
        if (!serie) {
            throw new BadRequestException('Série não encontrada')
        }
        return serie
    }

    async Criar(serie: Serie): Promise<Serie> {
        const serieExistente = await this.prisma.serie.findUnique({
            where: {
                id: serie.id
            }
        })

        if (serieExistente) {
            throw new BadRequestException("Série já existe")
        }

        return this.prisma.serie.create({
            data: serie
        })
    }

    async Atualizar(id:number, serie: Serie): Promise<Serie>{
        return this.prisma.serie.update({
            where:{
                id: id
            },
            data: serie
        })
    }

    async Delete(id: number){
        const serieExistente = await this.prisma.serie.findUnique({
            where:{
                id
            }
        })

        if(!serieExistente){
            throw new BadRequestException("Série não encontrada")
        }

        return this.prisma.serie.delete({
            where:{
                id: id
            }
        })
    }
}