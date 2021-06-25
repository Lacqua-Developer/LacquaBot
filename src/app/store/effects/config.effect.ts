import { ConfigService } from './../../services/config.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as appActions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ConfigEffects {
  constructor(private actions$: Actions, private cfg: ConfigService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.ConfigAtivos),
      mergeMap((action) =>
        this.cfg.RetConfig.pipe(
          map(
            (x) => appActions.ConfigSuccess({ id: action.id, cfg: x }),
            (err) => of(appActions.ConfigError({ payload: err }))
          )
        )
      )
    )
  );
}
