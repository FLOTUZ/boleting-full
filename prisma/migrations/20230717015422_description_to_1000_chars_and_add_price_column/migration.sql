/*
  Warnings:

  - Added the required column `price` to the `AccessType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccessType" ADD COLUMN     "price" MONEY NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(1000);
