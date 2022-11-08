import express from 'express'

import AulaController from './aula-controller'

const aulaRouter = express.Router()

const aulaController = new AulaController


aulaRouter.get("/aula/teste",aulaController.index)
aulaRouter.get("/aula/all",aulaController.getAllAulas)
aulaRouter.get("/aula/aluno/:id",aulaController.getAllAulasByAluno)
aulaRouter.get("/aula/personal/:id",aulaController.getAllAulasByPersonal)
aulaRouter.get("/aula/:id",aulaController.getAulaById)
aulaRouter.put("/aula/:id",aulaController.updateAula)

export default aulaRouter




