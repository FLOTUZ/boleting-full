/*
  Warnings:

  - You are about to drop the column `is_coutesy` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "is_coutesy",
ADD COLUMN     "is_courtesy" BOOLEAN NOT NULL DEFAULT false;
