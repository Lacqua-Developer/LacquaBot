import { selectChatEspera } from './../selectors/chat-espera.selector';
import { SelecionaContatoChatEsperaSucess } from './../actions/chat-espera.actions';
import { ChatService } from 'src/app/services/chat.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as appActions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';



@Injectable()
export class ChatEsperaCotatoSelEffects {

    constructor(
        private actions$: Actions,
        private  chat: ChatService
    ){}


      SelecionaChatEsperaEffect$ = createEffect(
      () => this.actions$.pipe(
          ofType( appActions.SelecionaContatoChatEspera ),
          mergeMap(
              ( action ) => this.chat.getContatoId( action.IdContato )
                  .pipe(
                      map( Chat => appActions.SelecionaContatoChatEsperaSucess({IdContato: action.IdContato , contato: Chat }) ),
                      catchError( err => of(appActions.CarregaChatEsperaError({ payload: err })) )
                  )

          )
      )
  );

}
