/*
  Warnings:

  - Added the required column `available_tickets_count` to the `AccessType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccessType" ADD COLUMN     "available_tickets_count" INTEGER NOT NULL;
