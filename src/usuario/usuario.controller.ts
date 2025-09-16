import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { Usuario } from './usuario.dto';
import { UsuarioProvider } from './usuario.provider';
import { APIKey } from '../guards/APIKey';

@UseGuards(APIKey)
@Controller('usuario')
export class UsuarioController {
    constructor(private readonly repo: UsuarioProvider) {}
    
    @Get()
    async obterTodos(): Promise<Usuario[]> {
        return this.repo.obterTodas();
    }

    @Get(':id')
    async obterPorId(@Param('id')id: string): Promise<Usuario | null> {
        return this.repo.ObterPorId(id);
    }

    @Post()
    async Criar(@Body() usuario:Usuario): Promise<Usuario>{
        return this.repo.Criar(usuario);
    }

    @Patch(':id')
    async Atualizar(@Param('id') id: string, @Body() usuario: Usuario): Promise<Usuario> {
        return this.repo.Atualizar(id, usuario);
    }

    @Delete(':id')
    async Deletar(@Param('id') id: string): Promise<Usuario> {
        return this.repo.Deletar(id);
    }
}
