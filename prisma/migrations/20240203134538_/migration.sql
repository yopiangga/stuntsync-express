/*
  Warnings:

  - You are about to drop the column `userId` on the `recomendation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `recomendation` DROP FOREIGN KEY `Recomendation_userId_fkey`;

-- AlterTable
ALTER TABLE `recomendation` DROP COLUMN `userId`;
