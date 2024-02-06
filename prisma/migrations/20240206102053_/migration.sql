/*
  Warnings:

  - Changed the type of `month` on the `monitoring` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `monitoring` DROP COLUMN `month`,
    ADD COLUMN `month` INTEGER NOT NULL;
