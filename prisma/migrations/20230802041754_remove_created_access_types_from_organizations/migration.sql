/*
  Warnings:

  - You are about to drop the column `organizationId` on the `AccessType` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AccessType" DROP CONSTRAINT "AccessType_organizationId_fkey";

-- AlterTable
ALTER TABLE "AccessType" DROP COLUMN "organizationId";
