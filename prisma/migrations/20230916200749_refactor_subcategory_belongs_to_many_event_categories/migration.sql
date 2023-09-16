/*
  Warnings:

  - You are about to drop the column `parent_event_categoryId` on the `EventSubCategory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventSubCategory" DROP CONSTRAINT "EventSubCategory_parent_event_categoryId_fkey";

-- AlterTable
ALTER TABLE "EventSubCategory" DROP COLUMN "parent_event_categoryId";

-- CreateTable
CREATE TABLE "_event_sub_categories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_event_sub_categories_AB_unique" ON "_event_sub_categories"("A", "B");

-- CreateIndex
CREATE INDEX "_event_sub_categories_B_index" ON "_event_sub_categories"("B");

-- AddForeignKey
ALTER TABLE "_event_sub_categories" ADD CONSTRAINT "_event_sub_categories_A_fkey" FOREIGN KEY ("A") REFERENCES "EventCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_event_sub_categories" ADD CONSTRAINT "_event_sub_categories_B_fkey" FOREIGN KEY ("B") REFERENCES "EventSubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
