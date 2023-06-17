/*
  Warnings:

  - You are about to drop the column `userClientId` on the `ActivityLog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ActivityLog" DROP CONSTRAINT "ActivityLog_userClientId_fkey";

-- AlterTable
ALTER TABLE "ActivityLog" DROP COLUMN "userClientId",
ADD COLUMN     "user_clientId" INTEGER;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_user_clientId_fkey" FOREIGN KEY ("user_clientId") REFERENCES "UserClient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
