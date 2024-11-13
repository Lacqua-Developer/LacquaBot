import { ChatService } from 'src/app/services/chat.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as appActions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';



@Injectable()
export class ChatContatosEffects {

    constructor(
        private actions$: Actions,
        private  chat: ChatService
    ){}


    ChatContatoEffect$ = createEffect(
        () => this.actions$.pipe(
            ofType( appActions.ChatContatos ),
            mergeMap(
                ( action ) => this.chat.getListaChatCont( action.IdUsr )
                    .pipe(
                        map( Chat => appActions.CarregaChatContatosSuccess({ ChatContatos: Chat }) ),
                        catchError( err => of(appActions.CarregaChatContatosError({ payload: err })) )
                    )
            )
        )
    );

}
