/*
  Warnings:

  - You are about to drop the column `entrega` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Order` DROP COLUMN `entrega`,
    DROP COLUMN `nome`;
