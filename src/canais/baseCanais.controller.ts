import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { APIKey } from '../guards/APIKey';
import { BaseCanaisProvider } from './baseCanais.provider';

@UseGuards(APIKey)
@Controller('tv/canais/url')
export class BaseCanaisController {
    constructor(private readonly url: BaseCanaisProvider) { }

    @Get()
    async obterTodos(): Promise<any> {
        return await this.url.obterTodos()
    }
}
