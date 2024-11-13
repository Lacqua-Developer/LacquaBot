import { Contato } from './contato';
import { Usuario } from  './usuario';
import { Anexo } from  './anexo';
import { Config } from  './config';
import { mensagemqueue } from './mensagemqueue';

export class Conversa {
  IdConversa: number;
  Usuarios_IdUsr: number;
  Contatos_IdContato: number;
  Config_IdConfig: number;
  Origem: number;
  IdConversaWhats: string;
  Sentido: string;
  Destino: string;
  Recebido: boolean;
  Lido: boolean;
  Enviado: boolean;
  Data: any = new Date();
  Mensagem: string;
  Usuario: Usuario;
  Contato: Contato;
  Anexo: Anexo;
  Config: Config;
  dias: number;
  MensagemQueue: mensagemqueue;
}
