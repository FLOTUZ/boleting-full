-- DropForeignKey
ALTER TABLE "_event_categories" DROP CONSTRAINT "_event_categories_B_fkey";

-- CreateTable
CREATE TABLE "EventSubCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" VARCHAR(255),
    "parentEventCategoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "EventSubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventSubCategory_id_key" ON "EventSubCategory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EventSubCategory_name_key" ON "EventSubCategory"("name");

-- AddForeignKey
ALTER TABLE "EventSubCategory" ADD CONSTRAINT "EventSubCategory_parentEventCategoryId_fkey" FOREIGN KEY ("parentEventCategoryId") REFERENCES "EventCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_event_categories" ADD CONSTRAINT "_event_categories_B_fkey" FOREIGN KEY ("B") REFERENCES "EventSubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
