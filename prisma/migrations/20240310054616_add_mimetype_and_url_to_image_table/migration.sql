/*
  Warnings:

  - Added the required column `mime_type` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "mime_type" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
