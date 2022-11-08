import express from 'express'

import ContratosController from './contratos-controller'

const contratoRouter = express.Router()

const contratoController = new ContratosController

contratoRouter.get("/contratos/teste",contratoController.index)
contratoRouter.get("/contratos/all",contratoController.getAllContratos)
contratoRouter.get("/contratos/:id",contratoController.getContratoById)
contratoRouter.get("/contratos/aluno/:id",contratoController.getAllContratosByAluno)
contratoRouter.get("/contratos/personal/:id",contratoController.getAllContratosByPersonal)
contratoRouter.put("/contratos/:id",contratoController.updateContrato)

export default contratoRouter