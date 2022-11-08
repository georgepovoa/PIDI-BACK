import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { UserInterface } from "../user/user-interface";
import { PersonalInterface } from "./personal-interface";


const prisma = new PrismaClient()

class PersonalController {

    async index(request: Request, response: Response) {

        response.status(200).json({ status: "success" })
    }

    async getAllPersonals(request: Request, response: Response) {

        const personal = await prisma.personal.findMany({
            include: {
                user: true
            }
        })
        console.log(personal)

        response.json(personal)

    }

    async getPersonalsByUser(request: Request, response: Response) {
        const {id} = request.params
        
        const personal = await prisma.personal.findFirst({
            where:{
                fk_id_user:id
            }
            ,
            include: {
                user: true
            }
        })
        console.log(personal)

        response.json(personal)

    }

    async createPersonal(request: Request, response: Response) {
        const user: UserInterface = request.body
        const personal: PersonalInterface = request.body

        try {
            const personalCreate = await prisma.personal.create({
                data: {
                    fk_id_user: personal.fk_id_user,
                    rating: personal.rating,
                    documentacao: personal.documentacao,
                    mediaUrl: personal.mediaUrl,
                    preferenciasExplicitas: personal.preferenciasExplicitas


                },
            })

            const updateUsuario = await prisma.usuario.update({
                where: { idUsuario: personal.fk_id_user },
                data: {
                    endereco: user.endereco,
                    cpf: user.cpf,
                    rg: user.rg,
                    dataNascimento: user.dataNascimento,
                    instagram: user.instagram
                }
            })



            response.json(personalCreate)

        } catch (error) {
            console.log(error)
            response.json(error)


        }
    }

    async deletePersonal(request: Request, response: Response) {
        const { id } = request.params

        try {
            const deletedPersonal = await prisma.personal.delete({
                where: {
                    idPersonal: id
                }
            })
            response.json(deletedPersonal)
        }
        catch (error) {
            response.json(error)
        }



    }

    async updatePersonal(request: Request, response: Response) {
        const { id } = request.params
        const updateInfo: PersonalInterface = request.body

        try {
            const updatedPersonal = await prisma.personal.update({
                where: {
                    idPersonal: id
                },
                data: {
                    rating:updateInfo.rating,
                    documentacao:updateInfo.documentacao,
                    preferenciasExplicitas:updateInfo.preferenciasExplicitas,
                    mediaUrl:updateInfo.mediaUrl
                }
            })
        } catch (error) {

        }
    }



}

export default PersonalController