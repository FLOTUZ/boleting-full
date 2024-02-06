/*
  Warnings:

  - You are about to drop the column `owner_typeId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `OwnerType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OwnerType" DROP CONSTRAINT "OwnerType_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_owner_typeId_fkey";

-- AlterTable
ALTER TABLE "AccessType" ADD COLUMN     "is_courtesy" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "owner_typeId";

-- DropTable
DROP TABLE "OwnerType";
