import { Module } from "@nestjs/common";
import { DbModule } from "../db/db.module";
import { ProjetosController } from "./projetos.controller";
import { ProjetcProvider } from "./projetos.provider";

@Module({
    imports: [DbModule],
    controllers: [ProjetosController],
    providers: [ProjetcProvider]
})

export class ProjetosModule { }