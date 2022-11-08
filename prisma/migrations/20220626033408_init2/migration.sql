/*
  Warnings:

  - The primary key for the `Aula` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idContrato` on the `Aula` table. All the data in the column will be lost.
  - Added the required column `id_Contrato` to the `Aula` table without a default value. This is not possible if the table is not empty.
  - The required column `id_aula` was added to the `Aula` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Aula" DROP CONSTRAINT "Aula_pkey",
DROP COLUMN "idContrato",
ADD COLUMN     "fechada" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "id_Contrato" TEXT NOT NULL,
ADD COLUMN     "id_aula" TEXT NOT NULL,
ADD CONSTRAINT "Aula_pkey" PRIMARY KEY ("id_aula");

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_id_Contrato_fkey" FOREIGN KEY ("id_Contrato") REFERENCES "Contrato"("idContrato") ON DELETE RESTRICT ON UPDATE CASCADE;
