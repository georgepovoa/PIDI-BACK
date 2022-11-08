-- CreateTable
CREATE TABLE "Proposta" (
    "idProposta" TEXT NOT NULL,
    "fk_id_aluno" TEXT NOT NULL,
    "fk_id_personal" TEXT NOT NULL,
    "fk_id_plano" TEXT NOT NULL,
    "valorTotal" REAL NOT NULL,
    "situacaoPlano" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Proposta_pkey" PRIMARY KEY ("idProposta")
);

-- AddForeignKey
ALTER TABLE "Proposta" ADD CONSTRAINT "Proposta_fk_id_aluno_fkey" FOREIGN KEY ("fk_id_aluno") REFERENCES "Aluno"("idAluno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposta" ADD CONSTRAINT "Proposta_fk_id_personal_fkey" FOREIGN KEY ("fk_id_personal") REFERENCES "Personal"("idPersonal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposta" ADD CONSTRAINT "Proposta_fk_id_plano_fkey" FOREIGN KEY ("fk_id_plano") REFERENCES "PersonalPlanos"("idPersonalPlanos") ON DELETE RESTRICT ON UPDATE CASCADE;
