/*
  Warnings:

  - You are about to drop the column `parentEventCategoryId` on the `EventSubCategory` table. All the data in the column will be lost.
  - Added the required column `parent_event_categoryId` to the `EventSubCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventSubCategory" DROP CONSTRAINT "EventSubCategory_parentEventCategoryId_fkey";

-- AlterTable
ALTER TABLE "EventSubCategory" DROP COLUMN "parentEventCategoryId",
ADD COLUMN     "parent_event_categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "EventSubCategory" ADD CONSTRAINT "EventSubCategory_parent_event_categoryId_fkey" FOREIGN KEY ("parent_event_categoryId") REFERENCES "EventCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
