import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { TemporadasController } from './temporadas.controller';
import { TemporadasProvider } from './temporadas.provider';

@Module({
  imports: [DbModule],
  controllers: [TemporadasController],
  providers: [TemporadasProvider],
})
export class SerieModule { }
