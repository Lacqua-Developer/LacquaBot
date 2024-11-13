import { ListaChat } from './../../models/ListaChat';
import { createSelector } from '@ngrx/store';
import { ChatState } from '../interfaces/states';

export interface SelectChatContatosState {
  chat: ListaChat[];
}

export interface ErroContatosState {
  erro: any;
}

export const selectorChatContatos = (state: ChatState) => state.chat;

export const selectChatContatos = createSelector(
  selectorChatContatos,
  (state: SelectChatContatosState) => state.chat,
  (chat: ListaChat[]) => {
    return chat;
  }
);

