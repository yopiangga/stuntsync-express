/*
  Warnings:

  - Added the required column `userId` to the `Recomendation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recomendation` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Recomendation` ADD CONSTRAINT `Recomendation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
