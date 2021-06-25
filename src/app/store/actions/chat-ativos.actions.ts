import { Contato } from 'src/app/models/contato';
import { ListaChat } from './../../models/ListaChat';
import { createAction, props } from '@ngrx/store';


export const ChatAtivos = createAction(
    '[ChatAtivos] ContatoAtivo Selecionado',
    props<{IdUsr: string }>()
);

export const CarregaChatAtivosSuccess = createAction(
    '[ChatAtivos] Carregado ChatAtivos com Successo',
    props<{chat: ListaChat[] }>()
);

export const CarregaChatAtivosError = createAction(
    '[ChatAtivos] Erro ao carregar ChatAtivos',
    props<{ payload: any }>()
);

export const SelecionaContatoChatAtivos = createAction(
  '[ChatAtivos] Contato Selecionado ChatAtivos',
  props<{ IdContato: string }>()
);

export const SelecionaContatoChatAtivosSucess = createAction(
  '[ChatAtivos] Contato Selecionado Com Sucesso',
  props<{ IdContato: string,contato: Contato }>()
);


export const ResetChatAtivos = createAction(
  '[ChatAtivos] Contato Selecionado Com Sucesso'
);

export const CheckConversasChatAtivos = createAction(
  '[CheckConversas] Contato Selecionado CheckConversas',
  props<{ IdContato: string }>()
);

export const CheckConversasChatAtivosSucess = createAction(
  '[CheckConversas] Contato Selecionado Com Sucesso',
  props<{ IdContato: string,contato: Contato }>()
);
