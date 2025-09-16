/*
  Warnings:

  - You are about to drop the `Heroi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Heroi" DROP CONSTRAINT "Heroi_userID_fkey";

-- DropTable
DROP TABLE "Heroi";

-- CreateTable
CREATE TABLE "Herois" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "hp" INTEGER NOT NULL DEFAULT 100,
    "attack" INTEGER NOT NULL DEFAULT 10,
    "defense" INTEGER NOT NULL DEFAULT 5,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "creatAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3) NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Herois_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "tipo" TEXT NOT NULL,
    "heroiID" TEXT NOT NULL,

    CONSTRAINT "Inventarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Herois_userID_key" ON "Herois"("userID");

-- AddForeignKey
ALTER TABLE "Herois" ADD CONSTRAINT "Herois_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventarios" ADD CONSTRAINT "Inventarios_heroiID_fkey" FOREIGN KEY ("heroiID") REFERENCES "Herois"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
