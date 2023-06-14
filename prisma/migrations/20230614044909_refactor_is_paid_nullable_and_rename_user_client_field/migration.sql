/*
  Warnings:

  - You are about to drop the column `userClientId` on the `BuyCart` table. All the data in the column will be lost.
  - Added the required column `user_clientId` to the `BuyCart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BuyCart" DROP CONSTRAINT "BuyCart_userClientId_fkey";

-- AlterTable
ALTER TABLE "BuyCart" DROP COLUMN "userClientId",
ADD COLUMN     "user_clientId" INTEGER NOT NULL,
ALTER COLUMN "is_paid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BuyCart" ADD CONSTRAINT "BuyCart_user_clientId_fkey" FOREIGN KEY ("user_clientId") REFERENCES "UserClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
