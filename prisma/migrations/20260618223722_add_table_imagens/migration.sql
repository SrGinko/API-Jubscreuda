/*
  Warnings:

  - You are about to drop the column `imagens` on the `Projetos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Projetos" DROP COLUMN "imagens";

-- CreateTable
CREATE TABLE "ImagensProjetos" (
    "id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "nomeImagem" TEXT NOT NULL,
    "projetoId" INTEGER NOT NULL,

    CONSTRAINT "ImagensProjetos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImagensProjetos" ADD CONSTRAINT "ImagensProjetos_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projetos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
