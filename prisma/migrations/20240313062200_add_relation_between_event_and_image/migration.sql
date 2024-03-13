/*
  Warnings:

  - You are about to drop the column `event_banner_url` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `event_logo_url` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "event_banner_url",
DROP COLUMN "event_logo_url",
ADD COLUMN     "event_bannerId" TEXT,
ADD COLUMN     "event_logoId" TEXT;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_event_logoId_fkey" FOREIGN KEY ("event_logoId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_event_bannerId_fkey" FOREIGN KEY ("event_bannerId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
