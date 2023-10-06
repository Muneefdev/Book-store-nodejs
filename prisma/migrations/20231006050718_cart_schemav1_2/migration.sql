/*
  Warnings:

  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookToCart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Cart` DROP FOREIGN KEY `Cart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `_BookToCart` DROP FOREIGN KEY `_BookToCart_A_fkey`;

-- DropForeignKey
ALTER TABLE `_BookToCart` DROP FOREIGN KEY `_BookToCart_B_fkey`;

-- AlterTable
ALTER TABLE `Book` ADD COLUMN `userIdForCart` VARCHAR(191) NOT NULL DEFAULT '';

-- DropTable
DROP TABLE `Cart`;

-- DropTable
DROP TABLE `_BookToCart`;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_userIdForCart_fkey` FOREIGN KEY (`userIdForCart`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
