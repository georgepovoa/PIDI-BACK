/*
  Warnings:

  - A unique constraint covering the columns `[idAluno,fk_id_user]` on the table `Aluno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idPersonal,fk_id_user]` on the table `Personal` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Aluno" ADD COLUMN     "localizacao" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "profilePic" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_idAluno_fk_id_user_key" ON "Aluno"("idAluno", "fk_id_user");

-- CreateIndex
CREATE UNIQUE INDEX "Personal_idPersonal_fk_id_user_key" ON "Personal"("idPersonal", "fk_id_user");
