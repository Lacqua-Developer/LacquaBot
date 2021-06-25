import { ChatMessageState } from './../interfaces/states';
import { createReducer, on } from '@ngrx/store';
import * as appActions from '../actions';

export const ChatMessageInitialState: ChatMessageState = {
  idContato: null,
  contatoMens: null,
  loaded: true,
  loading: false,
  error: null
};

const _ChatMessageReducer = createReducer(
  ChatMessageInitialState,

  on(appActions.ChatMensagem, (state, { IdContato }) => ({
    ...state,
    loading: true,
    id: IdContato,
  })),

  on(appActions.ChatMensagemSuccess, (state, { contato }) => ({
    ...state,
    loading: false,
    loaded: true,
    contatoMens: contato,
  })),

  on(appActions.ChatMensagemError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  }))
);

export function ChatMessageReducer(state, action) {
  return _ChatMessageReducer(state, action);
}
