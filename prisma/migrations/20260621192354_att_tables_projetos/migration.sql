-- CreateEnum
CREATE TYPE "Nível" AS ENUM ('Iniciante', 'Intermediário', 'Avançado');

-- CreateTable
CREATE TABLE "Tecnologias" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "nível" "Nível" NOT NULL,
    "principal" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Tecnologias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjetosTecnologias" (
    "projetoId" INTEGER NOT NULL,
    "tecnologiaId" INTEGER NOT NULL,

    CONSTRAINT "ProjetosTecnologias_pkey" PRIMARY KEY ("projetoId","tecnologiaId")
);

-- AddForeignKey
ALTER TABLE "ProjetosTecnologias" ADD CONSTRAINT "ProjetosTecnologias_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projetos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjetosTecnologias" ADD CONSTRAINT "ProjetosTecnologias_tecnologiaId_fkey" FOREIGN KEY ("tecnologiaId") REFERENCES "Tecnologias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
