import express from 'express'
import PersonalController from './personal-controller';


const personalRoutes = express.Router();

const personalController = new PersonalController

personalRoutes.get("/personal/teste",personalController.index)

personalRoutes.get("/personal",personalController.getAllPersonals)
personalRoutes.get("/personal/user/:id",personalController.getPersonalsByUser)

personalRoutes.post("/personal",personalController.createPersonal)
personalRoutes.delete("/personal/:id",personalController.deletePersonal)
personalRoutes.put("/personal/:id",personalController.updatePersonal)


export default personalRoutes
