/*
  Warnings:

  - You are about to drop the column `is_courtesy` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `is_paid` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `service_charge` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "is_courtesy",
DROP COLUMN "is_paid",
DROP COLUMN "price",
DROP COLUMN "service_charge";
