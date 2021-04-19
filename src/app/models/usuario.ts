import { Config } from 'src/app/models/config';
export class Usuario {
  IdUsr: number;
  NomeUsuario: string;
  Id_Externo: string;
  Permissao: number;
  Senha: string;
  Email: string;
  Login: string;
  Status: boolean;
  Celular: string;
  Confirmacao: string;
  IdConfig: number;
  Logado: boolean;
  SessionWhats: string;
  Config: Config;
  NomePermissao: string;
}
