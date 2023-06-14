/*
  Warnings:

  - You are about to drop the `_owner_types_for_event` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eventId` to the `OwnerType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_owner_types_for_event" DROP CONSTRAINT "_owner_types_for_event_A_fkey";

-- DropForeignKey
ALTER TABLE "_owner_types_for_event" DROP CONSTRAINT "_owner_types_for_event_B_fkey";

-- AlterTable
ALTER TABLE "OwnerType" ADD COLUMN     "eventId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_owner_types_for_event";

-- AddForeignKey
ALTER TABLE "OwnerType" ADD CONSTRAINT "OwnerType_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
