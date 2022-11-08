/*
  Warnings:

  - You are about to drop the column `plano` on the `Contrato` table. All the data in the column will be lost.
  - Added the required column `fk_id_aluno` to the `Aula` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_id_personal` to the `Aula` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_id_plano` to the `Contrato` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `aulasContratadas` on the `Contrato` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Aula" ADD COLUMN     "fk_id_aluno" TEXT NOT NULL,
ADD COLUMN     "fk_id_personal" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Contrato" DROP COLUMN "plano",
ADD COLUMN     "fk_id_plano" TEXT NOT NULL,
DROP COLUMN "aulasContratadas",
ADD COLUMN     "aulasContratadas" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_fk_id_plano_fkey" FOREIGN KEY ("fk_id_plano") REFERENCES "PersonalPlanos"("idPersonalPlanos") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_fk_id_aluno_fkey" FOREIGN KEY ("fk_id_aluno") REFERENCES "Aluno"("idAluno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_fk_id_personal_fkey" FOREIGN KEY ("fk_id_personal") REFERENCES "Personal"("idPersonal") ON DELETE RESTRICT ON UPDATE CASCADE;
