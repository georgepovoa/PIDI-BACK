/*
  Warnings:

  - You are about to drop the column `fk_user_aluno` on the `Proposta` table. All the data in the column will be lost.
  - You are about to drop the column `fk_user_personal` on the `Proposta` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Proposta" DROP COLUMN "fk_user_aluno",
DROP COLUMN "fk_user_personal";
