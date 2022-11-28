import express from 'express'

import PlanoController from './planos-controller'

const planosRoutes = express.Router()

const planoController = new PlanoController

planosRoutes.get("/planos/teste",planoController.index)
planosRoutes.get("/planos/:id",planoController.getPlanoById)
planosRoutes.post("/planos",planoController.CreatePlano)
planosRoutes.delete("/planos/:id",planoController.deletePlano)
planosRoutes.put("/planos/:id",planoController.updatePlano)


export default planosRoutes


