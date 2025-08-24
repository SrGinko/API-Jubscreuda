/*
  Warnings:

  - You are about to drop the column `nome` on the `Inventarios` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade` on the `Inventarios` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Inventarios` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[heroiID]` on the table `Inventarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('ARMADURA', 'ARMA', 'CONSUMIVEL', 'OUTRO');

-- CreateEnum
CREATE TYPE "Raridade" AS ENUM ('COMUM', 'RARA', 'EPICA', 'LENDARIA');

-- AlterTable
ALTER TABLE "Herois" ADD COLUMN     "armaID" TEXT,
ADD COLUMN     "armaduraID" TEXT,
ADD COLUMN     "calcaID" TEXT,
ADD COLUMN     "moeda" INTEGER NOT NULL DEFAULT 200;

-- AlterTable
ALTER TABLE "Inventarios" DROP COLUMN "nome",
DROP COLUMN "quantidade",
DROP COLUMN "tipo";

-- CreateTable
CREATE TABLE "ItemInventarios" (
    "id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "inventarioId" TEXT NOT NULL,
    "itemID" TEXT NOT NULL,

    CONSTRAINT "ItemInventarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Items" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "raridade" "Raridade" NOT NULL,
    "tipo" "ItemType" NOT NULL,
    "preco" INTEGER NOT NULL,
    "ataque" INTEGER,
    "defesa" INTEGER,
    "heal" INTEGER,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Items_nome_key" ON "Items"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Inventarios_heroiID_key" ON "Inventarios"("heroiID");

-- AddForeignKey
ALTER TABLE "Herois" ADD CONSTRAINT "Herois_armaID_fkey" FOREIGN KEY ("armaID") REFERENCES "Items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Herois" ADD CONSTRAINT "Herois_armaduraID_fkey" FOREIGN KEY ("armaduraID") REFERENCES "Items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Herois" ADD CONSTRAINT "Herois_calcaID_fkey" FOREIGN KEY ("calcaID") REFERENCES "Items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInventarios" ADD CONSTRAINT "ItemInventarios_inventarioId_fkey" FOREIGN KEY ("inventarioId") REFERENCES "Inventarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInventarios" ADD CONSTRAINT "ItemInventarios_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
