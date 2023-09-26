/*
  Warnings:

  - You are about to drop the `_event_sub_categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `event_categoryId` to the `EventSubCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_event_sub_categories" DROP CONSTRAINT "_event_sub_categories_A_fkey";

-- DropForeignKey
ALTER TABLE "_event_sub_categories" DROP CONSTRAINT "_event_sub_categories_B_fkey";

-- AlterTable
ALTER TABLE "EventSubCategory" ADD COLUMN     "event_categoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_event_sub_categories";

-- AddForeignKey
ALTER TABLE "EventSubCategory" ADD CONSTRAINT "EventSubCategory_event_categoryId_fkey" FOREIGN KEY ("event_categoryId") REFERENCES "EventCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
