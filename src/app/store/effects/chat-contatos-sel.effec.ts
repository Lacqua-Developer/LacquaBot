import { ChatService } from 'src/app/services/chat.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as appActions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';



@Injectable()
export class ChatContatosCotatoSelEffects {

    constructor(
        private actions$: Actions,
        private  chat: ChatService
    ){}

    ChatContatosCotatoSelEffects$ = createEffect(
      () => this.actions$.pipe(
          ofType( appActions.SelecionaContatoChatContato ),
          mergeMap(
              ( action ) => this.chat.getContatoId( action.IdContato )
                  .pipe(
                      map( Chat => appActions.SelecionaContatoChatContatosSucess({ IdContato: action.IdContato ,contato: Chat }) ),
                      catchError( err => of(appActions.CarregaChatContatosError({ payload: err })) )
                  )

          )
      )
  );

}
