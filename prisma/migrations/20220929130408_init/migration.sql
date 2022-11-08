/*
  Warnings:

  - You are about to drop the column `Senha` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "Senha",
ADD COLUMN     "nome" VARCHAR(50) NOT NULL,
ADD COLUMN     "senha" VARCHAR(60) NOT NULL;
