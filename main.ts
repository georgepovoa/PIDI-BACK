import { PrismaClient } from '@prisma/client'
import express from 'express'
import bodyParser from 'body-parser'
import {
  InitUsuarioInterface
  , CreatePersonalInterface,
  InitAlunoInterface,
  CreateDenunciaInterface,
  CreateMensagemInterface,
  CreateContrato,
  CreateAula,
  FullUsuarioInterface,
  LoginInterface,
  denunciafullInterface,
  fullAulaInterface,
  postPlano
} from './interfaces'

import userRoutes from './user/user-routes'
import personalRoutes from './personal/personal-routes'
import planosRoutes from './planos/planos-routes'
import propostaRoutes from './proposta/proposta-routes'
import contratoRouter from './contratos/contratos-routes'
import aulaRouter from './aula/aula-router'


import cors from 'cors'

import jwt from "jsonwebtoken"



const auth = require("./auth")


var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })



const prisma = new PrismaClient()
const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(userRoutes)
app.use(personalRoutes)
app.use(planosRoutes)
app.use(propostaRoutes)
app.use(contratoRouter)
app.use(aulaRouter)

app.get('/', async (req, res) => {


  res.json({ "ok": "ok" })
})


app.get('/administrador', async (req, res) => {
  const administrador = await prisma.administrador.findMany()
  console.log(administrador)

  res.json(administrador)
})


app.get('/aluno', async (req, res) => {
  const aluno = await prisma.aluno.findMany()
  console.log(aluno)

  res.json(aluno)
})

app.get('/aluno/:id', async (req, res) => {

  const {id} = req.params
  
  const aluno = await prisma.aluno.findUnique({
    where:{
      fk_id_user:id
    }
  })
  console.log(aluno)

  res.json(aluno)
})


app.post('/aluno', async (req, res) => {
  const aluno: InitAlunoInterface = req.body
  console.log(aluno)

  try {
    const alunocreate = await prisma.aluno.create({
      data: {

        fk_id_user: aluno.fk_id_user,
        rating: aluno.rating,
        documentacao: aluno.documentacao,
        preferenciasExplicitas: aluno.preferenciasExplicitas


      }
    })
    console.log(alunocreate)

    res.json(alunocreate)
  } catch (error) {
    console.log(error)
    res.json({ error })

  }


})


app.get('/denuncia', async (req, res) => {
  const denuncia = await prisma.denuncia.findMany()
  console.log(denuncia)

  res.json(denuncia)
})

app.post('/denuncia', async (req, res) => {
  const denuncia: CreateDenunciaInterface = req.body

  try {
    const createDenuncia = await prisma.denuncia.create({
      data: {

        fk_id_aluno: denuncia.fk_id_aluno,
        fk_id_personal: denuncia.fk_id_personal,
        gravidade: denuncia.gravidade,
        texto: denuncia.texto


      }
    })
    console.log(createDenuncia)

    res.json(createDenuncia)
  } catch (error) {

    res.json(error)

  }



})

app.put("/denuncia/:id", async (req, res) => {

  const { id } = req.params
  const denuncia: denunciafullInterface = req.body

  try {
    const updateDenuncia = await prisma.denuncia.update({
      where: {
        idDenuncia: id
      },
      data: {
        idContrato: denuncia.idContrato,
        gravidade: denuncia.gravidade,
        dataDenuncia: denuncia.dataDenuncia,
        texto: denuncia.texto,
        status: denuncia.status
      }

    })

    res.json(updateDenuncia)

  } catch (error) {
    res.json(error)

  }


})






app.get('/mensagem', async (req, res) => {
  const mensagens = await prisma.mensagens.findMany()
  console.log(mensagens)

  res.json(mensagens)
})

app.post('/mensagem', async (req, res) => {
  const mensagem: CreateMensagemInterface = req.body

  try {
    const mensagens = await prisma.mensagens.create({
      data: {
        texto: mensagem.texto,
        fk_id_aluno: mensagem.fk_id_aluno,
        fk_id_personal: mensagem.fk_id_personal,

      }
    })
    console.log(mensagens)

    res.json(mensagens)

  } catch (error) {
    res.json(error)

  }


})





app.post("/auth/login", async (req, res) => {
  const login: LoginInterface = req.body

  try {
    console.log(login)
    const usuario = await prisma.usuario.findFirst({
      where: {
        OR: [
          { email: login.login },
          { nome: login.login }
        ]

      },

    }
    )
    console.log(usuario)
    if (usuario?.senha == login.senha) {
      try {
        const token = jwt.sign(
          {
            userId: usuario.idUsuario,
            userEmail: usuario.email,
          },
          "RANDOM-TOKEN",
          { expiresIn: "24h" }
        );
        res.json({
          message: "Login Successful",
          email: usuario.email,
          token,
        });

      } catch (error) {
        res.json(error)

      }


      res.json({ "Login": "ok" })
    }
    else {
      if (usuario == null) {
        res.json({
          "Usuario": "Não existe",
          "status": "Falha"
        })
      }
      else {
        res.json({ "Senha": "senha incorreta" })
      }

    }
  } catch (error) {
    res.json(error)

  }
})

app.get("/auth-endpoint", auth, (request: any, response) => {

  console.log(request.user)
  response.json(request.user);
});



const server = app.listen(3000)
