import { Mensagem } from './mensagem';
export class FluxoAtendimento {
  IdFluxoAtendimento: number;
  CampanhaIdCampanha: number;
  Tipo: number;
  Ordem: number;
  IdMensagem: number;
  Condicao1: number;
  Condicao2: number;
  Saida: number;
  Ofensa: number;
  Chave: string;
  NomeFluxo: string;
  Finalizado: boolean;
  Mensagem: Mensagem;
}
