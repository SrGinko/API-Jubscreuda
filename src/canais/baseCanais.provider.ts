import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Canal } from '@prisma/client';
import { PrismaProvider } from '../db/prisma.provider';

@Injectable()
export class BaseCanaisProvider {
    constructor(private readonly prisma: PrismaProvider) { }

    async obterTodos(){
       return await this.prisma.baseCanalUrl.findMany()
    }
}
