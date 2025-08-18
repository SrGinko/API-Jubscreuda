-- CreateTable
CREATE TABLE "Heroi" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "hp" INTEGER NOT NULL DEFAULT 100,
    "attack" INTEGER NOT NULL DEFAULT 10,
    "defense" INTEGER NOT NULL DEFAULT 5,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "inventario" JSONB NOT NULL DEFAULT '[]',
    "creatAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3) NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Heroi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Heroi_userID_key" ON "Heroi"("userID");

-- AddForeignKey
ALTER TABLE "Heroi" ADD CONSTRAINT "Heroi_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
