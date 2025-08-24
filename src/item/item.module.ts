import { Module } from '@nestjs/common';
import { ItemProvider } from './item.provider';
import { ItemController } from './item.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ItemController],
  providers: [ItemProvider],
})
export class ItemModule { }
