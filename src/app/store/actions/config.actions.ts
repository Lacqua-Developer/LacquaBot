import { Config } from './../../models/config';
import { createAction, props } from '@ngrx/store';


export const ConfigAtivos = createAction(
    '[Config] Carrega Configs',
    props<{id: string}>()

);

export const ConfigSuccess = createAction(
    '[Config] Carregado Dados Config com Successo',
    props<{id:string, cfg: Config[]}>()
);



export const ConfigError = createAction(
    '[Config] Erro ao pesquisar Configurações',
    props<{ payload: any }>()
);

