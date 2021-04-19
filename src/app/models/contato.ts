import { Sessao } from './sessao';
import { Config } from 'src/app/models/config';
import { Conversa } from './conversa';
import { StatusAtendimento } from './statusAtendimento';
import { Lista } from './lista';


export class Contato {
  IdContato: number;
  NomeInformado: string;
  Documento: string;
  NomeDoc: string;
  Codigo: string;
  IdWhatsApp: string;
  Telefone: string;
  UserWhatsApp: string;
  ClienteExterno: string;
  Cadastro: string;
  Status: string;
  NomeRetornado: string;
  QtdeNLido: number;
  Email: string;
  FaceId: string;
  FaceRecipentId: string;
  Sexo: string;
  FaceMsgId: string;
  CampanhaIdCampanha: number;
  ImageProfile: string;
  IdConfig: number;
  UltimoAcesso: any = new Date();
  StatusAtendimento: StatusAtendimento;
  Conversa: Conversa[];
  Lista: Lista;
  Config: Config;
  Sessao: Sessao;
  UltimaMsg: number;
}

/*
        public int IdContato { get; set; }
        public string NomeInformado { get; set; }
        public string Documento { get; set; }
        public string NomeDoc { get; set; }
        public string Codigo { get; set; }
        public string IdWhatsApp { get; set; }
        public string Telefone { get; set; }
        public string UserWhatsApp { get; set; }
        public string ClienteExterno { get; set; }
        public string Cadastro { get; set; }
        public string Status { get; set; }
        public string NomeRetornado { get; set; }
        public int QtdeNLido { get; set; }
        public string Email { get; set; }
        public string FaceId { get; set; }
        public string FaceRecipentId { get; set; }
        public string Sexo { get; set; }
        public string FaceMsgId { get; set; }
        public int CampanhaIdCampanha { get; set; }
        public string ImageProfile { get; set; }
        public int IdConfig { get; set; }
        public DateTime UltimoAcesso { get; set; }
        public StatusAtendimento StatusAtendimento {get;set;}
        public OpccaoLista[] OpcaoLista { get; set; }
        public Conversa[] Conversa { get; set; }
        public Lista Lista { get; set; }

*/
