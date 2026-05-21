-- AlterTable
ALTER TABLE "Justificatif" ADD COLUMN     "commentaire" TEXT;

-- AlterTable
ALTER TABLE "Sanction" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "adresse" TEXT,
ADD COLUMN     "telephone" TEXT;
