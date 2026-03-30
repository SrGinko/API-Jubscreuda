-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('ARMADURA', 'CALCA', 'ARMA', 'CONSUMIVEL', 'OUTRO');

-- CreateEnum
CREATE TYPE "Raridade" AS ENUM ('COMUM', 'RARA', 'EPICA', 'LENDARIA');

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "wallpaper" INTEGER NOT NULL,
    "quantidadeMensagens" INTEGER NOT NULL DEFAULT 0,
    "Descricao" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Herois" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "hp" INTEGER NOT NULL DEFAULT 100,
    "attack" INTEGER NOT NULL DEFAULT 10,
    "defense" INTEGER NOT NULL DEFAULT 5,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "moeda" INTEGER NOT NULL DEFAULT 200,
    "armaID" INTEGER,
    "armaduraID" INTEGER,
    "calcaID" INTEGER,
    "creatAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3) NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Herois_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventarios" (
    "id" TEXT NOT NULL,
    "heroiID" TEXT NOT NULL,

    CONSTRAINT "Inventarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemInventarios" (
    "id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "inventarioId" TEXT NOT NULL,
    "itemID" INTEGER NOT NULL,

    CONSTRAINT "ItemInventarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Items" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "raridade" "Raridade" NOT NULL,
    "tipo" "ItemType" NOT NULL,
    "preco" INTEGER NOT NULL,
    "ataque" INTEGER,
    "defesa" INTEGER,
    "heal" INTEGER,
    "imagem" TEXT,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inimigos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "vida" INTEGER NOT NULL,
    "nivel" INTEGER NOT NULL,
    "ataque" INTEGER NOT NULL,
    "defesa" INTEGER NOT NULL,
    "imagem" TEXT,

    CONSTRAINT "Inimigos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Canais" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "capaUrl" TEXT,

    CONSTRAINT "Canais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaseCanalUrl" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "BaseCanalUrl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Series" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "capaUrl" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Temporadas" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "serieId" INTEGER NOT NULL,

    CONSTRAINT "Temporadas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episodio" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "capaUrl" TEXT NOT NULL,
    "temporadaId" TEXT NOT NULL,

    CONSTRAINT "Episodio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_id_key" ON "Usuarios"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Herois_userID_key" ON "Herois"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Inventarios_heroiID_key" ON "Inventarios"("heroiID");

-- CreateIndex
CREATE UNIQUE INDEX "ItemInventarios_inventarioId_itemID_key" ON "ItemInventarios"("inventarioId", "itemID");

-- CreateIndex
CREATE UNIQUE INDEX "Items_nome_key" ON "Items"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Inimigos_nome_key" ON "Inimigos"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Series_titulo_key" ON "Series"("titulo");

-- AddForeignKey
ALTER TABLE "Herois" ADD CONSTRAINT "Herois_armaID_fkey" FOREIGN KEY ("armaID") REFERENCES "Items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Herois" ADD CONSTRAINT "Herois_armaduraID_fkey" FOREIGN KEY ("armaduraID") REFERENCES "Items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Herois" ADD CONSTRAINT "Herois_calcaID_fkey" FOREIGN KEY ("calcaID") REFERENCES "Items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Herois" ADD CONSTRAINT "Herois_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventarios" ADD CONSTRAINT "Inventarios_heroiID_fkey" FOREIGN KEY ("heroiID") REFERENCES "Herois"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInventarios" ADD CONSTRAINT "ItemInventarios_inventarioId_fkey" FOREIGN KEY ("inventarioId") REFERENCES "Inventarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInventarios" ADD CONSTRAINT "ItemInventarios_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Temporadas" ADD CONSTRAINT "Temporadas_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episodio" ADD CONSTRAINT "Episodio_temporadaId_fkey" FOREIGN KEY ("temporadaId") REFERENCES "Temporadas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
