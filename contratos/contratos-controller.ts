import { Request, response, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { contratoInterface } from "./contratos-interface";
import AulaController from "../aula/aula-controller";

const prisma = new PrismaClient()
const aulaController = new AulaController

class ContratosController {
    async index(request: Request, response: Response) {

        response.status(200).json({ status: "success" })

    }

    async getContratoById(request: Request, response: Response) {
        const { id } = request.params

        try {
            const contratos = await prisma.contrato.findFirst({
                where: {
                    idContrato: id
                }
            })
            response.json(contratos)
        } catch (error) {
            response.json(error)

        }
    }
    // dev
    async getAllContratos(request:Request,response:Response){
        try {
            const contratos = await prisma.contrato.findMany({})
            response.json(contratos)
        } catch (error) {
            response.json(error)
            
        }
    }
    // dev

    async getAllContratosByPersonal(request: Request, response: Response) {
        const { id } = request.params
        var lista_para_response = []

        try {
            const contratos = await prisma.contrato.findMany({
                where: {
                    fk_id_personal: id
                },
                include: {
                    personal: true,
                    aluno: true,
                    plano: true
                }
            })
            for (var i = 0; i < contratos.length; i++) {

                var nomeDoPersonal = await prisma.usuario.findFirst({
                    where: {
                        idUsuario: contratos[i].personal.fk_id_user
                    }
                })

                var nomeDoAluno = await prisma.usuario.findFirst({
                    where: {
                        idUsuario: contratos[i].aluno.fk_id_user
                    }
                })

                var novacontratos: any = contratos[i]

                novacontratos.nomePersonal = nomeDoPersonal?.nome



                novacontratos.nomeDoAluno = nomeDoAluno?.nome


                lista_para_response.push(novacontratos)



            }
            response.json(lista_para_response)
        } catch (error) {
            response.json(error)

        }

    }

    async getAllContratosByAluno(request: Request, response: Response) {
        const { id } = request.params
        var lista_para_response = []
        try {
            const contratos = await prisma.contrato.findMany({
                where: {
                    fk_id_aluno: id
                },
                include: {
                    personal: true,
                    aluno: true,
                    plano: true
                }
            })
            for (var i = 0; i < contratos.length; i++) {

                var nomeDoPersonal = await prisma.usuario.findFirst({
                    where: {
                        idUsuario: contratos[i].personal.fk_id_user
                    }
                })

                var nomeDoAluno = await prisma.usuario.findFirst({
                    where: {
                        idUsuario: contratos[i].aluno.fk_id_user
                    }
                })

                var novacontratos: any = contratos[i]

                novacontratos.nomePersonal = nomeDoPersonal?.nome



                novacontratos.nomeDoAluno = nomeDoAluno?.nome


                lista_para_response.push(novacontratos)



            }
            response.json(contratos)
        } catch (error) {
            response.json(error)

        }

    }

    //trocar de aulas contratadas para number aqui e no bd
    async createContratoFromProposta(
        fk_id_aluno: string,
        fk_id_personal: string,
        plano: string,
        valorMensal: number,
        valorTotal: number,
        aulasContratadas: number
    ) {
        try {
            const createContrato = await prisma.contrato.create({
                data: {
                    fk_id_aluno: fk_id_aluno,
                    fk_id_personal: fk_id_personal,
                    fk_id_plano: plano,
                    valorMensal: valorMensal,
                    valorTotal: valorTotal,
                    aulasContratadas: aulasContratadas

                }
            })
            return createContrato
        } catch (error) {
            return error

        }

    }

    async updateContrato(request: Request, response: Response) {
        const { id } = request.params
        const contrato: contratoInterface = request.body

        try {
            const verifycontrato = await prisma.contrato.findFirst({
                where:{
                    idContrato:id
                }
            })
            if(verifycontrato?.situacaoContrato == true){
                response.json({status:"Contrato já aceito, não pode ser alterado"})
                return 
            }

        } catch (error) {
            response.json(error)
        }

        try {
            const contratoUpdate = await prisma.contrato.update({
                where: {
                    idContrato: id
                },
                data: {
                    fk_id_plano:contrato.plano,
                    valorMensal:contrato.valorMensal,
                    valorTotal:contrato.valorTotal,
                    aulasContratadas:contrato.aulasContratadas,
                    situacaoContrato:contrato.situacaoContrato
                }
            })
            if (contratoUpdate.situacaoContrato == true){
                //criar aulas
                const aulas = aulaController.createAulasByContrato(
                    contratoUpdate.fk_id_aluno,
                    contratoUpdate.fk_id_personal,
                    contratoUpdate.idContrato,
                    contratoUpdate.aulasContratadas

                )
                response.json(aulas)

            }  
             
            else{
            response.json(contratoUpdate)
            }
        } catch (error) {
            response.json(error)
        }

    }


    async deleteContrato(request: Request, response: Response) {
        const { id } = request.params


        try {
            const contrato = await prisma.contrato.delete({
                where: {
                    idContrato: id
                }
            })
            return response.json(contrato)
        } catch (error) {
            console.log(error)
            return response.json(error)
        }

    }

    async getContratoAulasPersonal(request:Request,response:Response){
        const {id} = request.params

        try {
            const contrato = await prisma.contrato.findMany({
                where:{
                    fk_id_personal:id
                },
                include:{
                    aulas:true,
                    personal:true,
                    aluno:true,
                    
                }

            })
            response.json(contrato)
        } catch (error) {
            response.json(error)
            
        }
    }

    async getContratoAulasAluno(request:Request,response:Response){
        const {id} = request.params

        try {
            const contrato = await prisma.contrato.findMany({
                where:{
                    fk_id_aluno:id
                },
                include:{
                    aulas:true,
                    personal:true,
                    aluno:true,
                    
                }

            })
            response.json(contrato)
        } catch (error) {
            response.json(error)
            
        }
    }

    async updateManyAulas(request:Request,response:Response){
        const {id} = request.params

        const listaDeAulas :any = request.body

        for (var i = 0; i<listaDeAulas.length;i++){
            if(listaDeAulas[i].horarioAula != null && listaDeAulas[i].horarioAula != "" && listaDeAulas[i].dataAula != null && listaDeAulas[i].horarioAula != "" ){
                aulaController.updateDataAula(listaDeAulas[i])
            }
            

        }
    }
    
}

export default ContratosController