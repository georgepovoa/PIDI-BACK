import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { PlanoInterface } from "./planos-interface";

const prisma = new PrismaClient()


class PlanoController {
    async index(request: Request, response: Response) {

        response.status(200).json({ status: "success" })

    }

    async getPlanoById(request: Request, response: Response) {
        const { id } = request.params

        try {
            const planos = await prisma.personalPlanos.findMany({
                where: {
                    fk_id_personal: id
                }
            })

            response.json(planos)
        } catch (error) {
            response.json(error)
        }

    }

    async CreatePlano (request:Request,response:Response){

        try {
            const planos = await prisma.personalPlanos.createMany({

                data: request.body
            
              }
              )
              console.log(planos)
            
              response.json(planos)
        } catch (error) {
            response.json(error)
            
        }

    }

    async deletePlano(request: Request, response: Response) {
        const { id } = request.params

        try {
            const plano = await prisma.personalPlanos.delete({
                where: {
                    idPersonalPlanos: id
                }
            })

            response.json(plano)
        }
        catch (error) {
            response.json(error)
        }

    }


    async updatePlano(request: Request, response: Response) {

        const { id } = request.params

        const plano: PlanoInterface = request.body

        try {
            const planos = await prisma.personalPlanos.update({
                where: {
                    idPersonalPlanos: id
                },
                data: {

                    diasPorSemana: plano.diasPorSemana,
                    valorDoPlano: plano.valorDoPlano

                }
            })
            console.log(planos)

            response.json(planos)
        } catch (error) {
            response.json(error)
        }
    }
}

export default PlanoController