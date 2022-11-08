-- CreateTable
CREATE TABLE "Usuario" (
    "idUsuario" TEXT NOT NULL,
    "Senha" VARCHAR(60) NOT NULL,
    "dataCadatrada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endereco" VARCHAR(100) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "cpf" VARCHAR(50) NOT NULL,
    "rg" VARCHAR(50) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("idUsuario")
);

-- CreateTable
CREATE TABLE "Administrador" (
    "idadm" TEXT NOT NULL,
    "fk_id_user" TEXT NOT NULL,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("idadm")
);

-- CreateTable
CREATE TABLE "Personal" (
    "idPersonal" TEXT NOT NULL,
    "fk_id_user" TEXT NOT NULL,
    "avaliacoes" TEXT[],
    "rating" REAL NOT NULL,
    "documentacao" VARCHAR(50) NOT NULL,
    "preferenciasExplicitas" TEXT[],
    "preferenciasImplicitas" DOUBLE PRECISION[],
    "documentacaoValida" BOOLEAN NOT NULL DEFAULT false,
    "usuariospassados" TEXT[],
    "denunciasRecebidas" TEXT[],

    CONSTRAINT "Personal_pkey" PRIMARY KEY ("idPersonal")
);

-- CreateTable
CREATE TABLE "Aluno" (
    "idAluno" TEXT NOT NULL,
    "fk_id_user" TEXT NOT NULL,
    "avaliacoes" TEXT[],
    "rating" REAL NOT NULL,
    "documentacao" VARCHAR(40) NOT NULL,
    "preferenciasExplicitas" TEXT[],
    "preferenciasImplicitas" DOUBLE PRECISION[],
    "documentacaoValida" BOOLEAN NOT NULL DEFAULT false,
    "personaisPassados" TEXT[],
    "denunciasRecebidas" TEXT[],

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("idAluno")
);

-- CreateTable
CREATE TABLE "Denuncia" (
    "idDenuncia" TEXT NOT NULL,
    "fk_id_aluno" TEXT NOT NULL,
    "fk_id_personal" TEXT NOT NULL,
    "idContrato" TEXT,
    "gravidade" VARCHAR(40) NOT NULL,
    "dataDenuncia" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Denuncia_pkey" PRIMARY KEY ("idDenuncia")
);

-- CreateTable
CREATE TABLE "Mensagens" (
    "idMensagem" TEXT NOT NULL,
    "hora" TIMESTAMP(3) NOT NULL,
    "texto" VARCHAR(40) NOT NULL,
    "fk_id_aluno" TEXT NOT NULL,
    "fk_id_personal" TEXT NOT NULL,

    CONSTRAINT "Mensagens_pkey" PRIMARY KEY ("idMensagem")
);

-- CreateTable
CREATE TABLE "Contrato" (
    "idContrato" TEXT NOT NULL,
    "fk_id_aluno" TEXT NOT NULL,
    "fk_id_personal" TEXT NOT NULL,
    "plano" VARCHAR(40) NOT NULL,
    "valorMensal" REAL NOT NULL,
    "valorTotal" REAL NOT NULL,
    "aulasContratadas" TEXT NOT NULL,
    "situacaoContrato" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Contrato_pkey" PRIMARY KEY ("idContrato")
);

-- CreateTable
CREATE TABLE "Aula" (
    "idContrato" TEXT NOT NULL,
    "dataAula" DATE NOT NULL,
    "horarioAula" DATE NOT NULL,

    CONSTRAINT "Aula_pkey" PRIMARY KEY ("idContrato")
);

-- AddForeignKey
ALTER TABLE "Administrador" ADD CONSTRAINT "Administrador_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Denuncia" ADD CONSTRAINT "Denuncia_fk_id_aluno_fkey" FOREIGN KEY ("fk_id_aluno") REFERENCES "Aluno"("idAluno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Denuncia" ADD CONSTRAINT "Denuncia_fk_id_personal_fkey" FOREIGN KEY ("fk_id_personal") REFERENCES "Personal"("idPersonal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensagens" ADD CONSTRAINT "Mensagens_fk_id_aluno_fkey" FOREIGN KEY ("fk_id_aluno") REFERENCES "Aluno"("idAluno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensagens" ADD CONSTRAINT "Mensagens_fk_id_personal_fkey" FOREIGN KEY ("fk_id_personal") REFERENCES "Personal"("idPersonal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_fk_id_aluno_fkey" FOREIGN KEY ("fk_id_aluno") REFERENCES "Aluno"("idAluno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_fk_id_personal_fkey" FOREIGN KEY ("fk_id_personal") REFERENCES "Personal"("idPersonal") ON DELETE RESTRICT ON UPDATE CASCADE;
