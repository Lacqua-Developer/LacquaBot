import { Contato } from 'src/app/models/contato';
import { Conversa } from './../../models/conversa';
import { Usuario } from 'src/app/models/usuario';
import { ListaChat } from "src/app/models/ListaChat";
import { Config } from 'src/app/models/config';

export interface ChatState {
  id     : string,
  ContatoSelecionado: string,
  contatoAtivo: Contato,
  chat   : ListaChat[],
  loaded : boolean,
  loading: boolean,
  error  : any
}


export interface ChatMessageState {
  idContato    : string,
  contatoMens   : Contato,
  loaded : boolean,
  loading: boolean,
  error  : any
}

export interface LoginState {
  id     : string,
  usuario : Usuario,
  loaded : boolean,
  loading: boolean,
  logged: boolean;
  sessao: string,
  errorLogin: boolean,
  errorLoginMessage: string,
  error  : any
}

export interface ConfigState {
  id: string,
  configAtivo: Config,
  status: string,
  configs: Config[],
  loaded : boolean,
  loading: boolean,
  logged: boolean;
  error  : any
}
