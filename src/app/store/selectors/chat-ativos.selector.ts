import { AppState } from './../app-reducers';
import { ListaChat } from './../../models/ListaChat';
import { createSelector } from '@ngrx/store';
import { ChatState } from '../interfaces/states';

export interface SelectChatAtivosState {
  chatAtivos: ChatState ;
}

export interface ErroAtivosState {
  erro: any;
}

export const selectorChatAtivos = (state: AppState) => state.chatAtivos.chat;

export const selectChatAtivos = createSelector(
  selectorChatAtivos,
  (state: ListaChat[]) => state);

