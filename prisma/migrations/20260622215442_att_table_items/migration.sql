-- AlterEnum
ALTER TYPE "ItemType" ADD VALUE 'MAGIA';

-- AlterTable
ALTER TABLE "Items" ADD COLUMN     "chanceStatus" INTEGER,
ADD COLUMN     "mana" INTEGER,
ADD COLUMN     "statusNome" TEXT;
