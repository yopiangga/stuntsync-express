/*
  Warnings:

  - Made the column `babyId` on table `monitoring` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `Recomendation` table without a default value. This is not possible if the table is not empty.
  - Made the column `babyId` on table `recomendation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `monitoring` DROP FOREIGN KEY `Monitoring_babyId_fkey`;

-- DropForeignKey
ALTER TABLE `recomendation` DROP FOREIGN KEY `Recomendation_babyId_fkey`;

-- AlterTable
ALTER TABLE `monitoring` MODIFY `babyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `recomendation` ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `babyId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Monitoring` ADD CONSTRAINT `Monitoring_babyId_fkey` FOREIGN KEY (`babyId`) REFERENCES `Baby`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recomendation` ADD CONSTRAINT `Recomendation_babyId_fkey` FOREIGN KEY (`babyId`) REFERENCES `Baby`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recomendation` ADD CONSTRAINT `Recomendation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
