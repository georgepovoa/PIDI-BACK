/*
  Warnings:

  - You are about to drop the column `preferenciasImplicitas` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `preferenciasImplicitas` on the `Personal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "preferenciasImplicitas";

-- AlterTable
ALTER TABLE "Personal" DROP COLUMN "preferenciasImplicitas",
ADD COLUMN     "locaisDeAtendimento" TEXT[],
ADD COLUMN     "profilePic" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "instagram" VARCHAR(50);
