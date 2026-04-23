import { Injectable } from "@nestjs/common";
import { Temporada } from "@prisma/client";
import { PrismaProvider } from "src/db/prisma.provider";

@Injectable()
export class TemporadasProvider {
    constructor(private prisma: PrismaProvider) { }

    async obterTodos(serieId: number) {
        return this.prisma.temporada.findMany({
            where: {
                serieId
            },
            include: {
                episodios: true
            }
        })
    }

    async obterUnico(serieId: number): Promise<Temporada | null> {
        return this.prisma.temporada.findUnique({
            where: {
                serieId
            },
            include: {
                episodios: true
            }
        })
    }

    async Criar(temporada: Temporada): Promise<Temporada>{
        return this.prisma.temporada.create({
            data: temporada
        })
    }
}