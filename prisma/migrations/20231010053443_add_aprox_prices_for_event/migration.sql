-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "price_from" MONEY,
ADD COLUMN     "price_to" MONEY;

-- AlterTable
ALTER TABLE "UserClient" ALTER COLUMN "roleId" SET DEFAULT 6;
