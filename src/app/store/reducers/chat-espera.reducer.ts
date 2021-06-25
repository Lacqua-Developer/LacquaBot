import { ListaChat } from './../../models/ListaChat';
import { createReducer, on } from '@ngrx/store';
import *  as appActions from '../actions';
import { ChatState } from '../interfaces/states';


export const ChatEsperaInitialState: ChatState = {
  id: null,
  ContatoSelecionado: '0',
  contatoAtivo: null,
  chat   : null,
  loaded : false,
  loading: false,
  error  : null
}

export const ChatEsperaState : ChatState = ChatEsperaInitialState;

const _ChatEsperaReducer = createReducer( ChatEsperaInitialState,

    on( appActions.ChatEspera, (state, { IdUsr  }) => ({
        ...state,
        loading: true,
        id: IdUsr })),

        on(appActions.ResetChatEspera, (state) => ({
          ...state,
          contatoAtivo: null,
          ContatoSelecionado: "0"

        }) ),
    on( appActions.CarregaChatEsperaSuccess, (state, { chatEspera }  ) => ({
        ...state,
        loading: false,
        loaded: true,
        chat: [ ...chatEspera]
    })),

    on( appActions.CarregaChatEsperaError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    })),

    on( appActions.SelecionaContatoChatEspera, (state, { IdContato}) => ({

      ...state,
      loading: true,
      loaded: false,
      ContatoSelecionado: IdContato

    })),

    on( appActions.SelecionaContatoChatEsperaSucess, (state, { IdContato, contato}) => ({

      ...state,
      loading: false,
      loaded: true,
      contatoAtivo: contato,
      ContatoSelecionado: IdContato

    }))




);

export function ChatEsperaReducer(state, action) {
    return _ChatEsperaReducer(state, action);
}
