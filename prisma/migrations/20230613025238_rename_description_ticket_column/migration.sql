/*
  Warnings:

  - You are about to drop the column `description` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `note` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "description",
ADD COLUMN     "note" VARCHAR(50) NOT NULL;
