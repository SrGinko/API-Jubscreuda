-- CreateEnum
CREATE TYPE "Classificacao" AS ENUM ('IncidenteNivel1', 'IncidenteNivel2', 'CriseNivel1', 'CriseNivel2', 'Catástofre');

-- CreateTable
CREATE TABLE "Chamados" (
    "id" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "inicioEvento" TIMESTAMP(3) NOT NULL,
    "classificacao" "Classificacao" NOT NULL,
    "proxEscalonamento" TIMESTAMP(3) NOT NULL,
    "creatAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chamados_pkey" PRIMARY KEY ("id")
);
