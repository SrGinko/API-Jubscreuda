/*
  Warnings:

  - You are about to drop the column `email` on the `Usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `Usuarios` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Usuarios_email_key";

-- AlterTable
ALTER TABLE "Usuarios" DROP COLUMN "email",
DROP COLUMN "senha";
