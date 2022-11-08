/*
  Warnings:

  - You are about to alter the column `username` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.

*/
-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "username" SET DATA TYPE VARCHAR(60);
