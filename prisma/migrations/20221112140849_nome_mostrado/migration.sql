/*
  Warnings:

  - The `horarioAula` column on the `Aula` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Aula" DROP COLUMN "horarioAula",
ADD COLUMN     "horarioAula" TIME;
