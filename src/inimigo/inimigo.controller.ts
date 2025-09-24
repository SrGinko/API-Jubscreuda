<<<<<<< HEAD
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ParseIntPipe} from '@nestjs/common';
=======
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ParseIntPipe } from '@nestjs/common';
>>>>>>> 4140f15 (Add: imagens para os intens)
import { InimigoProvider } from './inimigo.provider';
import { APIKey } from  '../guards/APIKey';
import { Inimigo } from '@prisma/client';

@UseGuards(APIKey)
@Controller('inimigo')
export class InimigoController {
    constructor(private readonly inimigo: InimigoProvider) { }

    @Get()
    async obterTodos(){
        return this.inimigo.obterTodos()
    }

    @Get(':id')
    async obterUnico(@Param('id', ParseIntPipe) id: number){
        return this.inimigo.obterUnico(id)
    }

    @Post()
    async Criar(@Body() inimigo: Inimigo ): Promise<Inimigo>{
        return this.inimigo.Criar(inimigo)
    }

    @Patch(':id')
    async Atualizar(@Param('id') id: number, @Body() inimigo: Inimigo){
        return this.inimigo.Atualizar(id, inimigo)
    }

    @Delete('id')
    async Deletar(@Param('id') id:number ){
        return this.inimigo.Delete(id)
    }

}
