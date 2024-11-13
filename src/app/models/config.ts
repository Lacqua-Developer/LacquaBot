import { TextoSugestao } from './TextoSugestao';

export class Config {
  ID: number;
  Telefone: string;
  Senha: string;
  Apelido: string;
  Desabilitado: boolean;
  ChipLista: boolean;
  DataEnvio: any = new Date();
  QtdeEnvio: number;
  StatusConeccao: boolean;
  ret: object;
  TelFormat: string;
  StatusChip: string;
  TextoSugestao: TextoSugestao[];
}
