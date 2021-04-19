// tslint:disable-next-line: class-name
export class mensagemqueue {
  IdQueue: number;
  Status: boolean;
  ConversaIdconversa: number;
  DataEnvio?: Date = new Date();
  Origem: number;
  Erro: boolean;
  Mensagem: string;
}
