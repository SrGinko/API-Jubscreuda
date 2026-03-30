import { Module } from "@nestjs/common";
import { ChamadosGateway } from "./chamado.gatway";
import { ChamadosService } from "./chamado.provider";
import { DbModule } from "../db/db.module";
import { ChamadosController } from "./chamado.controller";

@Module({
    providers: [ChamadosGateway, ChamadosService],
    exports: [ChamadosService],
    controllers: [ChamadosController],
    imports: [DbModule]
})

export class ChamadosModule  {}