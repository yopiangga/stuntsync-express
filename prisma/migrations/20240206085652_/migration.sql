/*
  Warnings:

  - Added the required column `subType` to the `Recomendation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recomendation` ADD COLUMN `subType` VARCHAR(191) NOT NULL;
