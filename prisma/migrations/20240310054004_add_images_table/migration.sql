-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "new_name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);
