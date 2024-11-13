import { ChatState } from './../interfaces/states';
import { Lista } from './../../models/lista';
import { Contato } from 'src/app/models/contato';
import { ListaChat } from './../../models/ListaChat';
import { createReducer, on } from '@ngrx/store';
import *  as appActions from '../actions';


export const ChatAtivosInitialState: ChatState = {
    id: null,
    ContatoSelecionado: '0',
    contatoAtivo: null,
    chat   : null,
    loaded : false,
    loading: false,
    error  : null
}

const _ChatAtivosReducer = createReducer( ChatAtivosInitialState,

    on(appActions.ResetChatAtivos, (state) => ({
      ...state,
      contatoAtivo: null,
      ContatoSelecionado: "0"

    }) ),
    on( appActions.ChatAtivos, (state, { IdUsr }) => ({
        ...state,
        loading: true,
        loaded : false,
        id: IdUsr })),


    on( appActions.CarregaChatAtivosSuccess, (state, { chat } ) => ({
        ...state,
        loading: false,
        loaded : true,
        chat: [ ...chat ]

    })),

    on( appActions.CarregaChatAtivosError, (state, { payload }) => ({
        ...state,
        loading: false,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    })),

    on( appActions.SelecionaContatoChatAtivos, (state, { IdContato}) => ({

      ...state,
      loading: true,
      loaded: false,
      ContatoSelecionado: IdContato

    })),

    on( appActions.SelecionaContatoChatAtivosSucess, (state, { IdContato , contato}) => ({

      ...state,
      loading: false,
      loaded: true,
      contatoAtivo: contato,
      ContatoSelecionado: IdContato

    }))




);

export function ChatAtivosReducer(state , action) {
    return _ChatAtivosReducer(state, action);
}
