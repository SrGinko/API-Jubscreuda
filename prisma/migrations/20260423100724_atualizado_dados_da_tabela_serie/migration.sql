/*
  Warnings:

  - A unique constraint covering the columns `[serieId]` on the table `Temporadas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Temporadas_serieId_key" ON "Temporadas"("serieId");
