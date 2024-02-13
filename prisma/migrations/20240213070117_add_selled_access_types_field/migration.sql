/*
  Warnings:

  - Added the required column `access_typeId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "access_typeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_access_typeId_fkey" FOREIGN KEY ("access_typeId") REFERENCES "AccessType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
