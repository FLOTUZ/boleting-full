/*
  Warnings:

  - You are about to drop the column `date` on the `Event` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "date",
ADD COLUMN     "end_date" DATE NOT NULL,
ADD COLUMN     "start_date" DATE NOT NULL;
