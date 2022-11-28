import express from 'express'

import UserController from './user-controller';


const userRoutes = express.Router();

const userController = new UserController

//user Routes

userRoutes.get("/user/teste",userController.index)
userRoutes.get("/user",userController.getAllUsers)
userRoutes.get("/user/:id",userController.getUser)
userRoutes.post("/user",userController.createNewUser)
userRoutes.delete("/user/:id",userController.deleteUser)
userRoutes.put("/user/:id",userController.updateUser)


export default userRoutes
