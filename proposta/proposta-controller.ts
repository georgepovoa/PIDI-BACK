import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { PropostaInterface } from "./proposta-inferface";
import ContratosController from "../contratos/contratos-controller";

const prisma = new PrismaClient()

const contratoController = new ContratosController


class PropostaController {
    async index(request: Request, response: Response) {

        response.status(200).json({ status: "success" })

    }

    async getPropostaById(request: Request, response: Response) {
        const { id } = request.params

        try {
            const proposta = await prisma.proposta.findFirst({
                where: {
                    idProposta: id
                }
            })
            response.json(proposta)
        } catch (error) {
            response.json(error)

        }
    }

    async getAllPropostaByPersonal(request: Request, response: Response) {
        const { id } = request.params
        var lista_para_response = []


        try {
            const proposta = await prisma.proposta.findMany({
                where: {
                    fk_id_personal: id
                },
                include: {
                    personal: true,
                    aluno: true,
                    plano: true
                }
            })

            for (var i = 0; i < proposta.length; i++) {

                var nomeDoPersonal = await prisma.usuario.findFirst({
                    where: {
                        idUsuario: proposta[i].personal.fk_id_user
                    }
                })

                var nomeDoAluno = await prisma.usuario.findFirst({
                    where: {
                        idUsuario: proposta[i].aluno.fk_id_user
                    }
                })

                var novaProposta: any = proposta[i]

                novaProposta.nomePersonal = nomeDoPersonal?.nome



                novaProposta.nomeDoAluno = nomeDoAluno?.nome


                lista_para_response.push(novaProposta)



            }

            response.json(lista_para_response)
        } catch (error) {
            response.json(error)

        }

    }

    async getAllPropostaByAluno(request: Request, response: Response) {
        const { id } = request.params
        var lista_para_response = []

        try {
            const proposta = await prisma.proposta.findMany({
                where: {
                    fk_id_aluno: id
                },
                include: {
                    personal: true,
                    aluno: true,
                    plano: true,

                }
            })


            for (var i = 0; i < proposta.length; i++) {

                var nomeDoPersonal = await prisma.usuario.findFirst({
                    where: {
                        idUsuario: proposta[i].personal.fk_id_user
                    }
                })

                var nomeDoAluno = await prisma.usuario.findFirst({
                    where: {
                        idUsuario: proposta[i].aluno.fk_id_user
                    }
                })

                var novaProposta: any = proposta[i]

                novaProposta.nomePersonal = nomeDoPersonal?.nome



                novaProposta.nomeDoAluno = nomeDoAluno?.nome


                lista_para_response.push(novaProposta)



            }


            response.json(lista_para_response)



        } catch (error) {
            response.json(error)

        }

    }


    async createProposta(request: Request, response: Response) {
        const proposta: PropostaInterface = request.body
        try {
            const newProposta = await prisma.proposta.create({
                data: {
                    fk_id_personal: proposta.fk_id_personal,
                    fk_id_aluno: proposta.fk_id_aluno,
                    fk_id_plano: proposta.fk_id_plano,
                    valorTotal: proposta.valorTotal,
                    mesesContratados: proposta.mesesContratados,
                    observacoes: proposta.observacoes

                }
            })
            response.json(newProposta)

        } catch (error) {
            console.log(error)
            response.json(error)

        }
    }

    async deleteProposta(request: Request, response: Response) {
        const { id } = request.params


        try {
            const proposta = await prisma.proposta.delete({
                where: {
                    idProposta: id
                }
            })
            return response.json(proposta)
        } catch (error) {
            return response.json(error)
        }

    }

    async updateProposta(request: Request, response: Response) {
        const { id } = request.params
        const proposta: PropostaInterface = request.body

        try {
            const verifyProposta = await prisma.proposta.findFirst({
                where: {
                    idProposta: id
                }
            })

            if (verifyProposta?.situacaoProposta == true) {
                response.json({ "status": "proposta já aceita, não pode ser alterada" })
                return
            }
        } catch (error) {
            response.json(error)
        }

        try {
            const propostaUpdate = await prisma.proposta.update({
                where: {
                    idProposta: id
                },
                data: {
                    valorTotal: proposta.valorTotal,
                    mesesContratados: proposta.mesesContratados,
                    situacaoProposta: proposta.situacaoProposta,
                    observacoes: proposta.observacoes
                },
                include: {
                    plano: true
                }
            })

            if (propostaUpdate.situacaoProposta === true) {
                var valorMensal = propostaUpdate.valorTotal / propostaUpdate.mesesContratados
                var aulasContratadas = 4 * propostaUpdate.mesesContratados * parseInt(propostaUpdate.plano.diasPorSemana)

                const novoContrato = contratoController.createContratoFromProposta(
                    propostaUpdate.fk_id_aluno,
                    propostaUpdate.fk_id_personal,
                    propostaUpdate.fk_id_plano,
                    valorMensal,
                    propostaUpdate.valorTotal,
                    aulasContratadas
                )
                response.json(novoContrato)

            }
            else {
                response.json(propostaUpdate)
            }

        } catch (error) {
            response.json(error)

        }
    }


    //para desenvolvimento

    async getAllPropostas(request: Request, response: Response) {
        const allPropostas = await prisma.proposta.findMany({})

        response.json(allPropostas)
    }




}

export default PropostaController