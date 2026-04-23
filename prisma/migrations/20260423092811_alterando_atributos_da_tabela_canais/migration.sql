/*
  Warnings:

  - You are about to drop the column `capaUrl` on the `Series` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Series` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `Series` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Series_titulo_key";

-- AlterTable
ALTER TABLE "Episodios" ALTER COLUMN "capaUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Series" DROP COLUMN "capaUrl",
DROP COLUMN "descricao",
DROP COLUMN "titulo";
