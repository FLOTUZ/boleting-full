-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_categoryId_fkey";

-- CreateTable
CREATE TABLE "_event_categories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_event_categories_AB_unique" ON "_event_categories"("A", "B");

-- CreateIndex
CREATE INDEX "_event_categories_B_index" ON "_event_categories"("B");

-- AddForeignKey
ALTER TABLE "_event_categories" ADD CONSTRAINT "_event_categories_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_event_categories" ADD CONSTRAINT "_event_categories_B_fkey" FOREIGN KEY ("B") REFERENCES "EventCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
