import express from 'express'

import PropostaController from './proposta-controller'

const propostaRoutes = express.Router()

const propostaController = new PropostaController


propostaRoutes.get("/proposta/teste",propostaController.index)
//dev
propostaRoutes.get("/proposta/all",propostaController.getAllPropostas)
//dev
propostaRoutes.get("/proposta/:id",propostaController.getPropostaById)
propostaRoutes.get("/proposta/personal/:id",propostaController.getAllPropostaByPersonal)
propostaRoutes.get("/proposta/aluno/:id",propostaController.getAllPropostaByAluno)
propostaRoutes.post("/proposta",propostaController.createProposta)
propostaRoutes.delete("/proposta/:id",propostaController.deleteProposta)
propostaRoutes.put("/proposta/:id",propostaController.updateProposta)


export default propostaRoutes