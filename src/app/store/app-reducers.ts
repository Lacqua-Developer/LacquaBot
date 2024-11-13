import { ChatState, LoginState, ConfigState,ChatMessageState } from './interfaces/states';
import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';


export interface AppState {
   login: LoginState,
   chatAtivos: ChatState,
   chatContatos: ChatState,
   chatEspera: ChatState,
   config: ConfigState,
   chatMessage: ChatMessageState

}



export const appReducers: ActionReducerMap<AppState> = {
   login: reducers.LoginReducer,
   chatAtivos: reducers.ChatAtivosReducer,
   chatContatos: reducers.ChatContatosReducer,
   chatEspera: reducers.ChatEsperaReducer,
   config: reducers.ConfigReducer,
   chatMessage: reducers.ChatMessageReducer
}
