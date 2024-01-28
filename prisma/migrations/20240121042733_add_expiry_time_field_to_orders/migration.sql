/*
  Warnings:

  - Added the required column `expiry_time` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "expiry_time" TIMESTAMP(3) NOT NULL;
