/*
  Warnings:

  - You are about to drop the column `head` on the `monitoring` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `monitoring` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `monitoring` DROP COLUMN `head`,
    DROP COLUMN `weight`;
