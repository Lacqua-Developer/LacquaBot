import { Contato } from 'src/app/models/contato';
import { ListaChat } from './../../models/ListaChat';
import { createAction, props } from '@ngrx/store';


export const ChatEspera = createAction(
    '[ChatEspera] ChatEspera Selecionado',
    props<{IdUsr: string }>()
);

export const ResetChatEspera = createAction(
  '[ChatEspera] Limpa conversa corrente'
);

export const CarregaChatEsperaSuccess = createAction(
    '[ChatEspera] Carregado ChatEspera com Successo',
    props<{ chatEspera: ListaChat[] }>()
);

export const CarregaChatEsperaError = createAction(
    '[ChatEspera] Erro ao carregar ChatAtivos',
    props<{ payload: any }>()
);

export const SelecionaContatoChatEspera = createAction(
  '[ChatEspera] Contato Selecionado ChatAtivos',
  props<{ IdContato: string }>()
);

export const SelecionaContatoChatEsperaSucess = createAction(
  '[ChatEspera] Contato Selecionado ChatEspera',
  props<{ IdContato: string,contato: Contato }>()
);
