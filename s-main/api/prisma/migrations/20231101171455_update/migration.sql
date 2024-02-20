/*
  Warnings:

  - You are about to drop the column `comentario` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `ml` on the `client` table. All the data in the column will be lost.
  - Added the required column `bloco` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexo` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codVenda` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comentario` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Client` DROP COLUMN `comentario`,
    DROP COLUMN `ml`,
    ADD COLUMN `bloco` VARCHAR(191) NOT NULL,
    ADD COLUMN `cep` VARCHAR(191) NOT NULL,
    ADD COLUMN `cidade` VARCHAR(191) NOT NULL,
    ADD COLUMN `cpf` VARCHAR(191) NOT NULL,
    ADD COLUMN `endereco` VARCHAR(191) NOT NULL,
    ADD COLUMN `sexo` ENUM('FEMININO', 'MASCULINO') NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Order` ADD COLUMN `codVenda` VARCHAR(191) NOT NULL,
    ADD COLUMN `comentario` VARCHAR(191) NOT NULL,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL;
