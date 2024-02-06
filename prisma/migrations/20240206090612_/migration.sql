-- DropForeignKey
ALTER TABLE `recomendation` DROP FOREIGN KEY `Recomendation_userId_fkey`;

-- AlterTable
ALTER TABLE `recomendation` MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Recomendation` ADD CONSTRAINT `Recomendation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
