import { Request, response, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { AulaInterface } from "./aula-interface";


const prisma = new PrismaClient()


class AulaController {
    async index(request: Request, response: Response) {

        response.status(200).json({ status: "success" })

    }

    async getAulaById(request: Request, response: Response) {
        const { id } = request.params

        try {
            const aula = await prisma.aula.findFirst({
                where: {
                    id_aula: id
                },
                include:{
                    aluno:true,
                    personal:true,
                    contrato:true
                }
            })
            response.json(aula)
        } catch (error) {
            response.json(error)

        }
    }
    // dev
    async getAllAulas(request:Request,response:Response){
        try {
            const aulas = await prisma.aula.findMany({})
            response.json(aulas)
        } catch (error) {
            response.json(error)
            
        }
    }
    // dev

    async getAllAulasByPersonal(request: Request, response: Response) {
        const { id } = request.params

        try {
            const contratos = await prisma.aula.findMany({
                where: {
                    fk_id_personal: id
                },
                include:{
                    aluno:true,
                    personal:true,
                    contrato:true
                }
            })
            response.json(contratos)
        } catch (error) {
            response.json(error)

        }

    }

    async getAllAulasByAluno(request: Request, response: Response) {
        const { id } = request.params

        try {
            const contratos = await prisma.aula.findMany({
                where: {
                    fk_id_aluno: id
                },
                include:{
                    aluno:true,
                    personal:true,
                    contrato:true
                }
            })
            response.json(contratos)
        } catch (error) {
            response.json(error)

        }

    }

    async updateDataAula(aula:any) {
        console.log(aula)
        // YYYY-MM-DD
        // 2022-11-10T22:34:05.637Z

        aula.dataAula = new Date(aula.dataAula)
        
        let date = new Date()
        var userTimezoneOffset = date.getTimezoneOffset();
        date.setHours(parseInt(aula.horarioAula.split(":")[0]) - userTimezoneOffset)
        date.setMinutes(parseInt(aula.horarioAula.split(":")[1]) - userTimezoneOffset)
        aula.horarioAula = new Date(date.getTime() - userTimezoneOffset);
        
        




        const updateAula = await prisma.aula.update({
            where:{
                id_aula:aula.id_aula
            },
            data:aula
        })
        console.log(updateAula)
        return updateAula
       
    }


    async createAulasByContrato(
        fk_id_aluno:string,
        fk_id_personal:string,
        id_Contrato:string,
        AulasContratadas:number

    ){

        var listaDeAulas = []

        for(var i =0 ; i<AulasContratadas;i++){

            listaDeAulas.push({fk_id_aluno:fk_id_aluno,
                fk_id_personal:fk_id_personal,
                id_Contrato:id_Contrato,
                dataAula:null,
                horarioAula:null
            })

        }
        try {
            const aulasCriadas = await prisma.aula.createMany({
                data:listaDeAulas
            })

            return aulasCriadas
        } catch (error) {
            return error
            
        }
    }
    
}

export default AulaController