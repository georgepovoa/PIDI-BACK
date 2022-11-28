import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { UserInterface } from "./user-interface";


const prisma = new PrismaClient()

class UserController {


    async index(request: Request, response: Response) {

        response.status(200).json({ status: "success" })
    }

    async getAllUsers(request: Request, response: Response) {

        const users = await prisma.usuario.findMany()

        response.status(200).json(users)


    }

    async getUser(request: Request, response: Response) {
        const {id} = request.params

        const users = await prisma.usuario.findFirst({
            where:{
                idUsuario:id
            }
        })

        response.status(200).json(users)


    }

    async createNewUser(request: Request, response: Response) {
        const user: UserInterface = request.body

        try {
            const usuario = await prisma.usuario.create({
                data: {
                    senha: user.senha,
                    email: user.email,
                    nome: user.nome

                }
            })
            console.log(usuario)

            response.json({ usuario })

        } catch (error) {
            response.json({ error })


        }



    }

    async deleteUser(request: Request, response: Response) {

        const { id } = request.params

        try {
            const deleteUsuario = await prisma.usuario.delete({
                where: {
                    idUsuario: id
                }
            })

            response.json(deleteUsuario)

        } catch (error) {
            response.json(error)
        }



    }


    async updateUser(request: Request, response: Response) {
        const { id } = request.params

        const newUser: UserInterface = request.body

        try {
            const usuario = await prisma.usuario.update({
                where: { idUsuario: id },
                data: {
                    senha: newUser.senha,
                    endereco: newUser.endereco,
                    email: newUser.email,
                    nome: newUser.nome,
                    cpf: newUser.cpf,
                    rg: newUser.rg,
                    instagram:newUser.instagram
                }
            })
            response.json(usuario)
        } catch (error) {
            response.json({ error: error })

        }
    }



}





export default UserController