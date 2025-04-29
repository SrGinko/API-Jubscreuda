import { Module } from '@nestjs/common';
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [DbModule, UsuarioModule, ConfigModule.forRoot({isGlobal: true})],
  controllers: [AppController],
})
export class AppModule {}
