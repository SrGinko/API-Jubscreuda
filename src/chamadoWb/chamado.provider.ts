import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaProvider } from "../db/prisma.provider";
import { ChamadosGateway } from "./chamado.gatway";
import { Chamado } from "./chamado.dto";
import { Chamados } from "@prisma/client";

@Injectable()
export class ChamadosService {
    constructor(
        private readonly prisma: PrismaProvider,
        private readonly chamadoGatway: ChamadosGateway,
    ) { }

    async Criar(chamados: Chamados) {
        const chamado = await this.prisma.chamados.create({
            data: {
                ...chamados,
                classificacao: chamados.classificacao as any
            }
        })

        this.chamadoGatway.emitCreated(chamado)

        return chamado;
    }

    async obterTodos() {
        return await this.prisma.chamados.findMany()
    }

    async obterUnico(id: number) {
        const chamado = await this.prisma.chamados.findUnique({
            where: { id }
        })

        if (!chamado) {
            throw new NotFoundException('Chamado não encontrado')
        }

        return chamado
    }

    async Atualizar(id: number, chamado: Chamado) {
        
        const chamados = this.prisma.chamados.update({
            where: {
                id: id
            },
            data: {
                ...chamado,
                classificacao: chamado.classificacao as any
            }
        })
        this.chamadoGatway.emitUpdate(chamado)

        return chamados
    }

    async Delete(id: number) {
        const chamados = await this.prisma.chamados.findUnique({
            where: { id }
        })

        if (!chamados) {
            throw new NotFoundException('Chamado não encontrado')
        }

        await this.prisma.chamados.delete({
            where: { id }
        })

        this.chamadoGatway.emitDeleted(chamados)

        return {ok:true}
    }
}