-- CreateTable
CREATE TABLE "Projetos" (
    "id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "emProgresso" BOOLEAN NOT NULL DEFAULT true,
    "imagens" TEXT[],
    "dataCriacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" TIMESTAMP(3),

    CONSTRAINT "Projetos_pkey" PRIMARY KEY ("id")
);
