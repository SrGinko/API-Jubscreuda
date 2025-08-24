/*
  Warnings:

  - A unique constraint covering the columns `[inventarioId,itemID]` on the table `ItemInventarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ItemInventarios_inventarioId_itemID_key" ON "ItemInventarios"("inventarioId", "itemID");
