import express from 'express'
import AlunoController from './aluno-controller';

const alunoRoutes = express.Router();

const alunoController = new AlunoController

alunoRoutes.get("/aluno/teste",alunoController.index)

alunoRoutes.get("/aluno",alunoController.getAllAlunos)
alunoRoutes.get("/aluno/user/:id",alunoController.getAlunoByUser)
alunoRoutes.post("/aluno",alunoController.createAluno)
alunoRoutes.delete("/aluno/:id",alunoController.deleteAluno)
alunoRoutes.put("/aluno/:id",alunoController.updateAluno)


export default alunoRoutes
