import { ChatContatosInitialState } from './../reducers/chat-contatos.reducer';
import { ChatService } from 'src/app/services/chat.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as appActions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';



@Injectable()
export class ChatMensagemEffects {

    constructor(
        private actions$: Actions,
        private  chat: ChatService
    ){}


    ChatMensagemEffect$ = createEffect(
        () => this.actions$.pipe(
            ofType( appActions.ChatMensagem ),
            mergeMap(
                ( action ) => this.chat.getContatoId( action.IdContato )
                    .pipe(
                        map( Chat => appActions.ChatMensagemSuccess({ contato: Chat }) ),
                        catchError( err => of(appActions.CarregaChatAtivosError({ payload: err })) )
                    )

            )
        )
    );

}
