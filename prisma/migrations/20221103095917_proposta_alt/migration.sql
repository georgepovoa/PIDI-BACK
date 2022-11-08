/*
  Warnings:

  - You are about to drop the column `situacaoPlano` on the `Proposta` table. All the data in the column will be lost.
  - Added the required column `mesesContratados` to the `Proposta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Proposta" DROP COLUMN "situacaoPlano",
ADD COLUMN     "mesesContratados" INTEGER NOT NULL,
ADD COLUMN     "situacaoProposta" BOOLEAN NOT NULL DEFAULT false;
