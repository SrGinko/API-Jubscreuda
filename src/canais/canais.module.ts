import { Module } from '@nestjs/common';
import { CanaisController } from './canais.controller';
import { CanaisProvider } from './canais.provider';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [CanaisController],
  providers: [CanaisProvider]
})
export class CanaisModule {}