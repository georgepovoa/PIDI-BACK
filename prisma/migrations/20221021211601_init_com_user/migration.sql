/*
  Warnings:

  - Added the required column `username` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PersonalPlanos" (
    "idPersonalPlanos" TEXT NOT NULL,
    "fk_id_personal" TEXT NOT NULL,
    "diasPorSemana" VARCHAR(40) NOT NULL,
    "valorDoPlano" TEXT NOT NULL,

    CONSTRAINT "PersonalPlanos_pkey" PRIMARY KEY ("idPersonalPlanos")
);

-- AddForeignKey
ALTER TABLE "PersonalPlanos" ADD CONSTRAINT "PersonalPlanos_fk_id_personal_fkey" FOREIGN KEY ("fk_id_personal") REFERENCES "Personal"("idPersonal") ON DELETE CASCADE ON UPDATE CASCADE;
