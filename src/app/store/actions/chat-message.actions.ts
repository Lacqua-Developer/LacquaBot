import { Contato } from 'src/app/models/contato';
import { createAction, props } from '@ngrx/store';


export const ChatMensagem = createAction(
    '[ChatMensagem] ContatoAtivo Selecionado',
    props<{IdContato: string }>()
);

export const ChatMensagemSuccess = createAction(
    '[ChatMensagem] Carregado ChatMensagem com Successo',
    props<{contato: Contato }>()
);

export const ChatMensagemError = createAction(
    '[ChatMensagem] Erro ao carregar ChatMensagem',
    props<{ payload: any }>()
);

