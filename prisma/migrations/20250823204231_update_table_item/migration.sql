/*
  Warnings:

  - The `armaID` column on the `Herois` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `armaduraID` column on the `Herois` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `calcaID` column on the `Herois` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `itemID` on the `ItemInventarios` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Herois" DROP CONSTRAINT "Herois_armaID_fkey";

-- DropForeignKey
ALTER TABLE "Herois" DROP CONSTRAINT "Herois_armaduraID_fkey";

-- DropForeignKey
ALTER TABLE "Herois" DROP CONSTRAINT "Herois_calcaID_fkey";

-- DropForeignKey
ALTER TABLE "ItemInventarios" DROP CONSTRAINT "ItemInventarios_itemID_fkey";

-- AlterTable
ALTER TABLE "Herois" DROP COLUMN "armaID",
ADD COLUMN     "armaID" INTEGER,
DROP COLUMN "armaduraID",
ADD COLUMN     "armaduraID" INTEGER,
DROP COLUMN "calcaID",
ADD COLUMN     "calcaID" INTEGER;

-- AlterTable
ALTER TABLE "ItemInventarios" DROP COLUMN "itemID",
ADD COLUMN     "itemID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Items" DROP CONSTRAINT "Items_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Items_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "ItemInventarios_inventarioId_itemID_key" ON "ItemInventarios"("inventarioId", "itemID");

-- AddForeignKey
ALTER TABLE "Herois" ADD CONSTRAINT "Herois_armaID_fkey" FOREIGN KEY ("armaID") REFERENCES "Items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Herois" ADD CONSTRAINT "Herois_armaduraID_fkey" FOREIGN KEY ("armaduraID") REFERENCES "Items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Herois" ADD CONSTRAINT "Herois_calcaID_fkey" FOREIGN KEY ("calcaID") REFERENCES "Items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInventarios" ADD CONSTRAINT "ItemInventarios_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
