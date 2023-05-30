/*
  Warnings:

  - The `start_time` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `end_time` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "start_time",
ADD COLUMN     "start_time" VARCHAR(5),
DROP COLUMN "end_time",
ADD COLUMN     "end_time" VARCHAR(5);
