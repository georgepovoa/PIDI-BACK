import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { UserInterface } from "../user/user-interface";
import { alunoInterface } from "./aluno-interface";


const prisma = new PrismaClient()

class AlunoController {

    async index(request: Request, response: Response) {

        response.status(200).json({ status: "success" })
    }

    async getAllAlunos(request: Request, response: Response) {

        const aluno = await prisma.aluno.findMany({
            include: {
                user: true
            }
        })
        console.log(aluno)

        response.json(aluno)

    }

    async getAlunoByUser(request: Request, response: Response) {
        const { id } = request.params

        const aluno = await prisma.aluno.findFirst({
            where: {
                fk_id_user: id
            }
            ,
            include: {
                user: true
            }
        })
        console.log(aluno)

        response.json(aluno)

    }

    async createAluno(request: Request, response: Response) {
        const user: UserInterface = request.body
        const aluno: alunoInterface = request.body

        try {
            const alunoCreate = await prisma.aluno.create({
                data: {
                    fk_id_user: aluno.fk_id_user,
                    avaliacoes: aluno.avaliacoes,
                    rating: aluno.rating,
                    documentacao: aluno.documentacao,
                    preferenciasExplicitas: aluno.preferenciasExplicitas,
                    documentacaoValida: aluno.documentacaoValida,
                    personaisPassados: aluno.personaisPassados,
                    denunciasRecebidas: aluno.denunciasRecebidas,
                    profilePic: aluno.profilePic,
                    localizacao: aluno.localizacao,
                    nomeMostrado: aluno.nomeMostrado,

                },
            })

            const updateUsuario = await prisma.usuario.update({
                where: { idUsuario: aluno.fk_id_user },
                data: {
                    endereco: user.endereco,
                    cpf: user.cpf,
                    rg: user.rg,
                    dataNascimento: user.dataNascimento,
                    instagram: user.instagram
                }
            })



            response.json(alunoCreate)

        } catch (error) {
            console.log(error)
            response.json(error)


        }
    }

    async deleteAluno(request: Request, response: Response) {
        const { id } = request.params

        try {
            const deletedAluno = await prisma.aluno.delete({
                where: {
                    idAluno: id
                }
            })
            response.json(deletedAluno)
        }
        catch (error) {
            response.json(error)
        }



    }

    async updateAluno(request: Request, response: Response) {
        const { id } = request.params
        const updateInfo: alunoInterface = request.body

        try {
            const updatedAluno = await prisma.aluno.update({
                where: {
                    idAluno: id
                },
                data: {
                    avaliacoes: updateInfo.avaliacoes,
                    rating: updateInfo.rating,
                    preferenciasExplicitas: updateInfo.preferenciasExplicitas,
                    documentacaoValida: updateInfo.documentacaoValida,
                    personaisPassados: updateInfo.personaisPassados,
                    denunciasRecebidas: updateInfo.denunciasRecebidas,
                    profilePic: updateInfo.profilePic,
                    localizacao: updateInfo.localizacao,
                    nomeMostrado: updateInfo.nomeMostrado,
                }
            })
            response.json(updatedAluno)

        } catch (error) {
            response.json(error)

        }
    }



}

export default AlunoController