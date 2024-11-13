import { ChatService } from 'src/app/services/chat.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as appActions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';



@Injectable()
export class ChatEsperaEffects {

    constructor(
        private actions$: Actions,
        private  chat: ChatService
    ){}


    chatEsperaEffect$ = createEffect(
        () => this.actions$.pipe(
            ofType( appActions.ChatEspera ),
            mergeMap(
                ( action ) => this.chat.getListaChatEsp( action.IdUsr )
                    .pipe(
                        map( Chat => appActions.CarregaChatEsperaSuccess({ chatEspera: Chat }) ),
                        catchError( err => of(appActions.CarregaChatEsperaError({ payload: err })) )
                    )
            )
        )
    );


}
