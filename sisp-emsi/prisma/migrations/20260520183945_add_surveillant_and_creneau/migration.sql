-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'SURVEILLANT';

-- AlterTable
ALTER TABLE "Absence" ADD COLUMN     "creneau" TEXT,
ALTER COLUMN "module" DROP NOT NULL;
