/*
  Warnings:

  - You are about to drop the column `UserId` on the `baby` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Baby` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `baby` DROP FOREIGN KEY `Baby_UserId_fkey`;

-- AlterTable
ALTER TABLE `baby` DROP COLUMN `UserId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Baby` ADD CONSTRAINT `Baby_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
