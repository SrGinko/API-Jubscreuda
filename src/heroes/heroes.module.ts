import { Module } from '@nestjs/common';
import { HeroesController } from './heroes.controller';
import { DbModule } from '../db/db.module';
import { HeroesProvider } from './heroes.provider';

@Module({
  imports: [DbModule],
  controllers: [HeroesController],
  providers: [HeroesProvider],
})
export class HeroesModule {}
