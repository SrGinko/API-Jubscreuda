import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { BaseCanaisProvider } from './baseCanais.provider';
import { BaseCanaisController } from './baseCanais.controller';

@Module({
  imports: [DbModule],
  controllers: [BaseCanaisController],
  providers: [BaseCanaisProvider]
})
export class BaseCanaisModule {}