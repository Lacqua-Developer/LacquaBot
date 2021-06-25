import { Contato } from 'src/app/models/contato';
import { ListaChat } from './../../models/ListaChat';
import { createAction, props } from '@ngrx/store';


export const ChatContatos = createAction(
    '[ChatContatos] ChatContatos Selecionado',
    props<{IdUsr: string }>()
);

export const CarregaChatContatosSuccess = createAction(
    '[ChatContatos] Carregado ChatContatos com Successo',
    props<{ ChatContatos: ListaChat[] }>()
);

export const CarregaChatContatosError = createAction(
    '[ChatContatos] Erro ao carregar ChatContatos',
    props<{ payload: any }>()
);

export const SelecionaContatoChatContato = createAction(
  '[ChatContatos] Contato Selecionado ChatContatos',
  props<{ IdContato: string }>()
);

export const SelecionaContatoChatContatosSucess = createAction(
  '[ChatContatos] Contato Selecionado ChatContatos Sucess',
  props<{ IdContato: string,contato: Contato }>()
);

export const ResetChatContatos = createAction(
  '[ChatContatos] Limpa conversa corrente'
);
