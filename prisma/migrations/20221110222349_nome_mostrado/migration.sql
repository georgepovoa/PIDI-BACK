/*
  Warnings:

  - Added the required column `fk_user_aluno` to the `Proposta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_user_personal` to the `Proposta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aluno" ADD COLUMN     "nomeMostrado" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Personal" ADD COLUMN     "nomeMostrado" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Proposta" ADD COLUMN     "fk_user_aluno" TEXT NOT NULL,
ADD COLUMN     "fk_user_personal" TEXT NOT NULL;
