import { ListaChat } from './../../models/ListaChat';
import { createSelector } from '@ngrx/store';
import { ChatState } from '../interfaces/states';

export interface SelectChatEsperaState {
  chat: ListaChat[];
}

export interface ErroEsperaState {
  erro: any;
}

export const selectorChatEspera = (state: ChatState) => state.chat;

export const selectChatEspera = createSelector(
  selectorChatEspera,
  (state: SelectChatEsperaState) => state.chat,
  (chat: ListaChat[]) => {
    return chat;
  }
);

