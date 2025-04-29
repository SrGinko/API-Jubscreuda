-- CreateTable
CREATE TABLE "Usuarios" (
    "id" DOUBLE PRECISION NOT NULL,
    "username" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "wallpaper" INTEGER NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);
