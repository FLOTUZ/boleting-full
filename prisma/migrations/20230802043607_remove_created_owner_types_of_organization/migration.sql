-- DropForeignKey
ALTER TABLE "OwnerType" DROP CONSTRAINT "OwnerType_organizationId_fkey";

-- DropIndex
DROP INDEX "OwnerType_name_key";

-- AlterTable
ALTER TABLE "OwnerType" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);
