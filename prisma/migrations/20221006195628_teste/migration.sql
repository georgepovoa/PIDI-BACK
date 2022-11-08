-- DropForeignKey
ALTER TABLE "Administrador" DROP CONSTRAINT "Administrador_fk_id_user_fkey";

-- DropForeignKey
ALTER TABLE "Aluno" DROP CONSTRAINT "Aluno_fk_id_user_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_fk_id_user_fkey";

-- AddForeignKey
ALTER TABLE "Administrador" ADD CONSTRAINT "Administrador_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;
