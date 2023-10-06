/*
  Warnings:

  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_cartId_fkey`;

-- DropTable
DROP TABLE `OrderItem`;

-- CreateTable
CREATE TABLE `_BookToCart` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_BookToCart_AB_unique`(`A`, `B`),
    INDEX `_BookToCart_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_BookToCart` ADD CONSTRAINT `_BookToCart_A_fkey` FOREIGN KEY (`A`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BookToCart` ADD CONSTRAINT `_BookToCart_B_fkey` FOREIGN KEY (`B`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
