import { Contato } from "./contato";
import { Usuario } from "./usuario";

export class Sessao {


   IdSession: number;
   Contato_Idcontato: number;
   Usuario_IdUsuario: number;
   DataCriacao: any = new Date();
   DataAtendimento: any = new Date();
   DataEncerramento: any = new Date();
   Conversa_IdConversa: number;
   Config_idconfig: number;
   QtdeNLido: number;
   Usuario: Usuario;
   Contato: Contato;

}
