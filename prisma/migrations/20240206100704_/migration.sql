/*
  Warnings:

  - You are about to alter the column `subType` on the `recomendation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `recomendation` MODIFY `subType` INTEGER NULL;
