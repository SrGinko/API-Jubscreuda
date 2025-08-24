import { Module } from '@nestjs/common';
import { InventarioProvider } from './inventario.provider';
import { InventarioController } from './inventario.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [InventarioController],
  providers: [InventarioProvider],
})
export class InventarioModule { }
