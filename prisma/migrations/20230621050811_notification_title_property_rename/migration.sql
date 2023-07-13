/*
  Warnings:

  - You are about to drop the column `tittle` on the `Notification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Notification_tittle_key";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "tittle",
ADD COLUMN     "title" VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Notification_title_key" ON "Notification"("title");
