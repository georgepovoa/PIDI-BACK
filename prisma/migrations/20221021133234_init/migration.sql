/*
  Warnings:

  - A unique constraint covering the columns `[fk_id_user]` on the table `Aluno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fk_id_user]` on the table `Personal` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Aluno_idAluno_fk_id_user_key";

-- DropIndex
DROP INDEX "Personal_idPersonal_fk_id_user_key";

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_fk_id_user_key" ON "Aluno"("fk_id_user");

-- CreateIndex
CREATE UNIQUE INDEX "Personal_fk_id_user_key" ON "Personal"("fk_id_user");
