/*
  Warnings:

  - You are about to drop the column `hostId` on the `Event` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_hostId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "hostId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "event_location_url" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "event_logo_url" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "event_banner_url" SET DATA TYPE VARCHAR(1000);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
