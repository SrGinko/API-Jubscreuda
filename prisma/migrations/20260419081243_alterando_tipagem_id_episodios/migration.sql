/*
  Warnings:

  - You are about to drop the `Episodio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Episodio" DROP CONSTRAINT "Episodio_temporadaId_fkey";

-- DropTable
DROP TABLE "Episodio";

-- CreateTable
CREATE TABLE "Episodios" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "capaUrl" TEXT NOT NULL,
    "temporadaId" TEXT NOT NULL,

    CONSTRAINT "Episodios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Episodios" ADD CONSTRAINT "Episodios_temporadaId_fkey" FOREIGN KEY ("temporadaId") REFERENCES "Temporadas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
