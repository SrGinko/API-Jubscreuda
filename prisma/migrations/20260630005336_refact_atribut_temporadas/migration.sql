/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Series` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Temporadas_serieId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Series_id_key" ON "Series"("id");
