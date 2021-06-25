import { ChatService } from 'src/app/services/chat.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as appActions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';



@Injectable()
export class ChatAtivosEffects {

    constructor(
        private actions$: Actions,
        private  chat: ChatService
    ){}


    ChatAtivosEffect$ = createEffect(
        () => this.actions$.pipe(
            ofType( appActions.ChatAtivos ),
            mergeMap(
                ( action ) => this.chat.getListaChatAtv( action.IdUsr )
                    .pipe(
                        map( Chat => appActions.CarregaChatAtivosSuccess({ chat: Chat }) ),
                        catchError( err => of(appActions.CarregaChatAtivosError({ payload: err })) )
                    )

            )
        )
    );


}

