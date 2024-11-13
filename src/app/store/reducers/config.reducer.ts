import { ConfigState, LoginState }  from './../interfaces/states';
import { createReducer, on } from '@ngrx/store';
import *  as appActions from '../actions';
import { Usuario } from 'src/app/models/usuario';
import { Config } from 'src/app/models/config';
import { filter } from 'rxjs/operators';


export const ConfigInitialState: ConfigState = {

  id: '',
  configAtivo: new Config(),
  status: '',
  configs: [],
  loaded : false,
  loading: false,
  logged: false,
  error  : null
}

const _ConfigReducer = createReducer( ConfigInitialState,

    on( appActions.ConfigAtivos, (state, { id }) => ({
        ...state,
        id: id,
        loading: true,
        Sessao: id })),


    on( appActions.ConfigSuccess, (state, {id,cfg} ) => ({
        ...state,
        id: id,
        configAtivo: cfg.filter(x => x.ID.toString() == id).shift() ,
        status: '',
        configs: cfg,
        loaded : true,
        loading: false,
        logged: false,
        error  : null
    })),

    on( appActions.ConfigError, (state, { payload }) => ({
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

export function ConfigReducer(state , action) {
    return _ConfigReducer(state, action);
}
