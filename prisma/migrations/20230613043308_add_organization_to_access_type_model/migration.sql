/*
  Warnings:

  - You are about to drop the `AccesType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `organizationId` to the `OwnerType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AccesType" DROP CONSTRAINT "AccesType_userId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_access_typeId_fkey";

-- AlterTable
ALTER TABLE "OwnerType" ADD COLUMN     "organizationId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "AccesType";

-- CreateTable
CREATE TABLE "AccessType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(15) NOT NULL,
    "description" VARCHAR(255),
    "enter_and_exit_option" BOOLEAN DEFAULT false,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "organizationId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "AccessType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_owner_types_for_event" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AccessType_id_key" ON "AccessType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AccessType_name_key" ON "AccessType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_owner_types_for_event_AB_unique" ON "_owner_types_for_event"("A", "B");

-- CreateIndex
CREATE INDEX "_owner_types_for_event_B_index" ON "_owner_types_for_event"("B");

-- AddForeignKey
ALTER TABLE "AccessType" ADD CONSTRAINT "AccessType_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessType" ADD CONSTRAINT "AccessType_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnerType" ADD CONSTRAINT "OwnerType_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_access_typeId_fkey" FOREIGN KEY ("access_typeId") REFERENCES "AccessType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_owner_types_for_event" ADD CONSTRAINT "_owner_types_for_event_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_owner_types_for_event" ADD CONSTRAINT "_owner_types_for_event_B_fkey" FOREIGN KEY ("B") REFERENCES "OwnerType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
