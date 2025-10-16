-- DropForeignKey
ALTER TABLE "public"."Inventarios" DROP CONSTRAINT "Inventarios_heroiID_fkey";

-- DropForeignKey
ALTER TABLE "public"."ItemInventarios" DROP CONSTRAINT "ItemInventarios_inventarioId_fkey";

-- CreateTable
CREATE TABLE "public"."Canais" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "capaUrl" TEXT,

    CONSTRAINT "Canais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Series" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "capaUrl" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Temporadas" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "serieId" INTEGER NOT NULL,

    CONSTRAINT "Temporadas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Episodio" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "capaUrl" TEXT NOT NULL,
    "temporadaId" TEXT NOT NULL,

    CONSTRAINT "Episodio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Series_titulo_key" ON "public"."Series"("titulo");

-- AddForeignKey
ALTER TABLE "public"."Inventarios" ADD CONSTRAINT "Inventarios_heroiID_fkey" FOREIGN KEY ("heroiID") REFERENCES "public"."Herois"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ItemInventarios" ADD CONSTRAINT "ItemInventarios_inventarioId_fkey" FOREIGN KEY ("inventarioId") REFERENCES "public"."Inventarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Temporadas" ADD CONSTRAINT "Temporadas_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "public"."Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Episodio" ADD CONSTRAINT "Episodio_temporadaId_fkey" FOREIGN KEY ("temporadaId") REFERENCES "public"."Temporadas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
