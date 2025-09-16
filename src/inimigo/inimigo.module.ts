import { Module } from '@nestjs/common';
import { InimigoController } from './inimigo.controller';
import { InimigoProvider } from './inimigo.provider';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [InimigoProvider],
  controllers: [InimigoController]
})
export class InimigoModule {}
