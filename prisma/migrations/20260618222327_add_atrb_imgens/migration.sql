/*
  Warnings:

  - Changed the type of `imagens` on the `Projetos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Projetos" DROP COLUMN "imagens",
ADD COLUMN     "imagens" JSONB NOT NULL;
