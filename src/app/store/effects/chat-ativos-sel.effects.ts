import { ChatService } from 'src/app/services/chat.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as appActions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ChatAtivosCotatoSelEffects {

    constructor(
        private actions$: Actions,
        private  chat: ChatService
    ){}


    ChatAtivosCotatoSelEffects$ = createEffect(
      () => this.actions$.pipe(
          ofType( appActions.SelecionaContatoChatAtivos ),
          mergeMap(
              ( action ) => this.chat.getContatoId( action.IdContato )
                  .pipe(
                      map( Chat => appActions.SelecionaContatoChatAtivosSucess({IdContato: action.IdContato , contato: Chat }) ),
                      catchError( err => of(appActions.CarregaChatAtivosError({ payload: err })) )
                  )

          )
      )
  );

}
