/*
  Warnings:

  - Added the required column `baseUrl` to the `Series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Series` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Series" ADD COLUMN     "baseUrl" TEXT NOT NULL,
ADD COLUMN     "capaUrl" TEXT,
ADD COLUMN     "titulo" TEXT NOT NULL;
