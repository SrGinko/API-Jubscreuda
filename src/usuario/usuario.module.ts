import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { UsuarioController } from './usuario.controller';
import { UsuarioProvider } from './usuario.provider';

@Module({
    imports: [DbModule],
    controllers: [UsuarioController],
    providers: [UsuarioProvider],
})
export class UsuarioModule {}
