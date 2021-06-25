import { createReducer, on } from '@ngrx/store';
import *  as appActions from '../actions';
import { ChatState } from '../interfaces/states';



export const ChatContatosInitialState: ChatState = {
  id: null,
  ContatoSelecionado: '0',
  contatoAtivo: null,
  chat   : null,
  loaded : false,
  loading: false,
  error  : null
}

export const ChatContatosState : ChatState = ChatContatosInitialState;

const _ChatContatosReducer = createReducer( ChatContatosInitialState,

  on(appActions.ResetChatContatos, (state) => ({
    ...state,
    contatoAtivo: null,
    ContatoSelecionado: "0"

  }) ),
    on( appActions.ChatContatos, (state, { IdUsr }) => ({
        ...state,
        loading: true,
        id: IdUsr })),


    on( appActions.CarregaChatContatosSuccess, (state, { ChatContatos }  ) => ({
        ...state,
        loading: false,
        loaded: true,
        chat: [ ... ChatContatos]
    })),

    on( appActions.CarregaChatContatosError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    })),

    on( appActions.SelecionaContatoChatContato, (state, { IdContato}) => ({

      ...state,
      loading: true,
      loaded: false,
      ContatoSelecionado: IdContato

    })),

    on( appActions.SelecionaContatoChatContatosSucess, (state, {IdContato, contato}) => ({

      ...state,
      loading: false,
      loaded: true,
      contatoAtivo: contato,
      ContatoSelecionado: IdContato

    }))





);

export function ChatContatosReducer(state, action) {
    return _ChatContatosReducer(state, action);
}
