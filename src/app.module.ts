import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { UsuarioModule } from './usuario/usuario.module';
import { HeroesModule } from './heroes/heroes.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DbModule,
    UsuarioModule,
    HeroesModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule { }
