import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { SerieController } from './serie.controller';
import { SerieProvider } from './serie.provider';

@Module({
  imports: [DbModule],
  controllers: [SerieController],
  providers: [SerieProvider],
})
export class SerieModule { }
