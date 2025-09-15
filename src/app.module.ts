import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { UsuarioModule } from './usuario/usuario.module';
import { HeroesModule } from './heroes/heroes.module';
import { ConfigModule } from '@nestjs/config';
import { InventarioModule } from './inventario/inventario.module';
import { ItemModule } from './item/item.module';
import { InimigoModule } from './inimigo/inimigo.module';

@Module({
  imports: [
    DbModule,
    UsuarioModule,
    HeroesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    InventarioModule,
    ItemModule,
    InimigoModule,
  ],
})
export class AppModule { }
