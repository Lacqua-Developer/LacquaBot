import { LoginService } from './../../services/login.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as appActions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions, private auth: LoginService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.LoginAtivos),
      mergeMap((action) =>
        this.auth.Autentica(action.Login, action.Senha, action.sessao)
                 .pipe(
          map((User) => {
            console.log('Auth', User);
            if (User.Logado) {
              return appActions.LoginSuccess({ usr: User, sessao: action.sessao });
            } else {
              return appActions.LoginFault({ usr: User, errorLogin: true });
            }
          }),
          catchError((err) => of(appActions.LoginError({ payload: err }))),

        )
      )
    )
  );



}
