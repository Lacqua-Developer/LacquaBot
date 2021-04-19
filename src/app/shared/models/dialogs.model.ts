import { Config } from 'src/app/models/config';
import { Usuario } from './../../models/usuario';
import { Contato } from './../../models/contato';

export interface DialogData {
  contato: Contato;
  usuarios: Usuario[];
}

export interface DialogDataAbre {
  contato: Contato;
  usuarios: Usuario;
  result: boolean;
}

export interface DialogDataMedia {
  TipoMedia: string;
  url: string;
  result: boolean;
}

export interface DialogDataSug {
  contato: Contato;
  chip: Config[];
  result: string;
}
