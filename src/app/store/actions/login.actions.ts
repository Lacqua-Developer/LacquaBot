import { Usuario } from 'src/app/models/usuario';
import { createAction, props } from '@ngrx/store';


export const LoginAtivos = createAction(
    '[Login] Autenticacao Login',
    props<{Login: string, Senha: string , sessao: string}>()
);

export const LoginSuccess = createAction(
    '[Login] Carregado Dados Login com Successo',
    props<{usr: Usuario, sessao: string}>()
);

export const LoginFault = createAction(
  '[Login] Login Falhou',
  props<{usr: Usuario, errorLogin: boolean}>()
);

export const LoginError = createAction(
    '[ChatAtivos] Erro ao autenticar usuario',
    props<{ payload: any }>()
);

