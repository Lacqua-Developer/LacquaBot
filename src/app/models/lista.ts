import {Usuario } from './usuario'
import {OpcaoLista} from './opcaoLista'

export class Lista{
  IdLista :number ;
  CampanhaIdCampanha :number ;
  Nome :string ;
  Documento :string ;
  NomeDocumento :string ;
  Chave :string ;
  Telefone :string ;
  ContatoIdContato :number ;
  UserWhatsApp :string ;
  Ativo :boolean ;
  Status :string ;
  ConversaIdConversa :number ;
  Desativado :boolean ;
  IdUsuario :number ;
  FacebookId :string ;
  Email :string ;
  Sexo :string ;
  usuario :Usuario ;
  OpcaoLista :OpcaoLista[] ;
}



