import { FluxoAtendimento} from './fluxoAtedimento'
export class StatusAtendimento {
  IdStatusAtendimento: number;
  ContatoIdContato: number;
  ConversaIdConversa: number;
  ListaIdLista: number;
  TipoFluxo: number;
  FluxoOrigem: number;
  IdFluxoDestinoEsperado: number;
  IdFluxoDestinoInesperado: number;
  IdFluxoDesistencia: number;
  IdFluxoOfensa: number;
  Resposta: string;
  RespostaEsperada: string;
  Finalizado: boolean;
  NomeCampanha: string;
  idCampanha: number;
  FluxoDestinoEsperado: FluxoAtendimento;
  FluxoDestinoInesperado: FluxoAtendimento;
  FluxoDesistencia: FluxoAtendimento;
  FluxoOfensa: FluxoAtendimento;
}
