export interface InitUsuarioInterface{
  senha: string  ;
  email:string  ;
  nome:string   ;
}

export interface FullUsuarioInterface{
  idUsuario:string                      
  senha:string   
  dataNascimento:string                   
  dataCadatrada?:string                     
  endereco:string                     
  email:string                      
  nome:string                     
  cpf:string                      
  rg:string                     
  instagram:string


}

export interface CreatePersonalInterface{
  fk_id_user: string
  rating :number
  documentacao : string
  preferenciasExplicitas :string[]
  mediaUrl : string
}

export interface InitAlunoInterface{
  CPF:string
  RG:string
  fk_id_user:string
  rating :number
  documentacao:string
  preferenciasExplicitas:string[]

}


export interface CreateDenunciaInterface{
  fk_id_aluno:string
  fk_id_personal :string
  idContrato?:string
  gravidade:string
  texto:string


}

export interface CreateMensagemInterface{
  texto:string
  fk_id_aluno:string
  fk_id_personal:string

}

export interface CreateContrato{

  fk_id_aluno:string
  fk_id_personal:string
  plano:string
  valorMensal:number
  valorTotal:number
  aulasContratadas:string
  situacaoContrato:boolean
  
  
}

export interface CreateAula {
  id_Contrato:string
  dataAula:string
  horarioAula:string

}

export interface LoginInterface{
  login:string
  senha:string
}

export interface denunciafullInterface {
  idContrato:string,
  gravidade:string,
  dataDenuncia:string,
  texto:string,
  status:string
}

export interface fullAulaInterface{
  id_aula:string,
id_Contrato:string,
dataAula:string,
horarioAula:string,
fechada:boolean
}

export interface postPlano{
  fk_id_personal:string
  diasPorSemana:string
  valorDoPlano:string
}