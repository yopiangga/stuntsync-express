/*
  Warnings:

  - Added the required column `qty` to the `Recomendation` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `month` on the `recomendation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `recomendation` ADD COLUMN `qty` INTEGER NOT NULL,
    DROP COLUMN `month`,
    ADD COLUMN `month` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `RecomendationCheck` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recomendationId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RecomendationCheck` ADD CONSTRAINT `RecomendationCheck_recomendationId_fkey` FOREIGN KEY (`recomendationId`) REFERENCES `Recomendation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
