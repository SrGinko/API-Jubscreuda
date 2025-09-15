-- AlterEnum
ALTER TYPE "public"."ItemType" ADD VALUE 'CALCA';

-- CreateTable
CREATE TABLE "public"."Inimigos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "vida" INTEGER NOT NULL,
    "nivel" INTEGER NOT NULL,
    "ataque" INTEGER NOT NULL,
    "defesa" INTEGER NOT NULL,
    "imagem" TEXT,

    CONSTRAINT "Inimigos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inimigos_nome_key" ON "public"."Inimigos"("nome");
