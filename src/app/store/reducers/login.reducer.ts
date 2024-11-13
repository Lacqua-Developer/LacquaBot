import { Sessao } from './../../models/sessao';
import { LoginState }  from './../interfaces/states';
import { createReducer, on } from '@ngrx/store';
import *  as appActions from '../actions';
import { Usuario } from 'src/app/models/usuario';
import { concat } from 'rxjs';


export const LoginInitialState: LoginState = {
  id     : '0',
  usuario : new Usuario(),
  loaded : false,
  loading: false,
  logged: false,
  sessao: '',
  error : null,
  errorLogin: false,
  errorLoginMessage: ''

}

const _LoginReducer = createReducer( LoginInitialState,

    on( appActions.LoginAtivos, (state, { Login, Senha, sessao }) => ({
        ...state,
        loading: true,
        Sessao: sessao })),


    on( appActions.LoginSuccess, (state, {usr,sessao} ) => ({
        ...state,
        loading: false,
        loaded: true,
        logged:true,
        Sessao: sessao,
        usuario: usr,
        errorLogin: false,
        errorLoginMessage: ''
    })),


    on( appActions.LoginFault, (state, {usr} ) => ({
        ...state,
        loading: false,
        loaded: true,
        logged:false,
        usuario:  new Usuario(),
        errorLogin: true,
        errorLoginMessage: 'Erro ao efetuar o login, verifique os dados!'


    })),

    on( appActions.CarregaChatAtivosError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    })),
);

export function LoginReducer(state , action) {
    return _LoginReducer(state, action);
}
