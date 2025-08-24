import { Usuario } from "./usuario.dto"
import { Injectable, BadRequestException, NotFoundException, ConflictException } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { PrismaProvider } from "../db/prisma.provider"

@Injectable()
export class UsuarioProvider {
	constructor(private readonly prisma: PrismaProvider) { }

	async obterTodas(): Promise<Usuario[]> {
		return this.prisma.usuario.findMany()
	}

	async ObterPorId(id: string): Promise<Usuario | null> {
		if (!id) {
			throw new BadRequestException("ID não informado")
		}

		const usuario = await this.prisma.usuario.findUnique({
			where: {
				id: id,
			},
			include: { heroi: true }
		})

		if (!usuario) {
			throw new NotFoundException("Usuário não encontrado")
		}

		return usuario
	}

	async Criar(usuario: Prisma.UsuarioCreateInput): Promise<Usuario> {

		const UsuarioExistente = await this.ObterPorId(usuario.id)

		if (UsuarioExistente) {
			throw new ConflictException("Usuário já cadastrado")
		}

		return this.prisma.usuario.create({
			data: usuario,
		})
	}

	async Atualizar(id: string, usuario: Prisma.UsuarioUpdateInput): Promise<Usuario> {
		return this.prisma.usuario.update({
			where: {
				id: id,
			},
			data: usuario,
		})
	}

	async Deletar(id: string): Promise<Usuario> {
		const usuario = await this.ObterPorId(id)

		if (!usuario) {
			throw new Error("Usuário não encontrado")
		}

		return this.prisma.usuario.delete({
			where: {
				id: id,
			},
		})
	}
}
