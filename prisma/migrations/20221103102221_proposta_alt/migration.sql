/*
  Warnings:

  - Added the required column `observacoes` to the `Proposta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Proposta" ADD COLUMN     "observacoes" TEXT NOT NULL;
