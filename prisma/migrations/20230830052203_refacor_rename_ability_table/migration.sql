/*
  Warnings:

  - You are about to drop the `Abilities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AbilitiesToRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AbilitiesToRole" DROP CONSTRAINT "_AbilitiesToRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_AbilitiesToRole" DROP CONSTRAINT "_AbilitiesToRole_B_fkey";

-- DropTable
DROP TABLE "Abilities";

-- DropTable
DROP TABLE "_AbilitiesToRole";

-- CreateTable
CREATE TABLE "Ability" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Ability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AbilityToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Ability_id_key" ON "Ability"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Ability_name_key" ON "Ability"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AbilityToRole_AB_unique" ON "_AbilityToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_AbilityToRole_B_index" ON "_AbilityToRole"("B");

-- AddForeignKey
ALTER TABLE "_AbilityToRole" ADD CONSTRAINT "_AbilityToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Ability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AbilityToRole" ADD CONSTRAINT "_AbilityToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
