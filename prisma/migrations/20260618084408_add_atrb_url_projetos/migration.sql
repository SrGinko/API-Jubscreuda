/*
  Warnings:

  - Added the required column `url` to the `Projetos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projetos" ADD COLUMN     "url" TEXT NOT NULL;
