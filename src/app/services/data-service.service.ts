import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { Observable, timer, Subject, EMPTY } from 'rxjs';
import {
  retryWhen,
  tap,
  delayWhen,
  switchAll,
  catchError,
} from 'rxjs/operators';
export const WS_ENDPOINT = environment.wsServer;
export const RECONNECT_INTERVAL = 3000;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {
    //this.connect();
  }

  private socket$: WebSocketSubject<string>;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe(
    switchAll(),
    catchError((e) => {
      throw e;
    })
  ).subscribe( m => {
   // this.AnalisaResposta(m);
  });

  public VerificaAtivosSbj: Subject<any> = new Subject();
  public VerificaContatoSbj: Subject<any> = new Subject();
  public VerificaEsperaSbj: Subject<any> = new Subject();
  public VerificaReconnect: Subject<any> = new Subject();

  public AnalisaResposta = (m) => {
    const mm: string[] = m.split('|');
    console.log('Analisando Resposta', m);
    if (mm.length > 0) {
      switch (mm[0]) {
        case 'Ativos':
          console.log('Analisando Ativos', m);
          this.VerificaAtivosSbj.next(m);
          break;
        case 'Contato':
          console.log('Analisando Contato', m);
          this.VerificaContatoSbj.next(m);
          break;
        case 'Espera':
          console.log('Analisando Espera', m);
          this.VerificaEsperaSbj.next(m);
          break;
      }
    }
  }

  /**
   * Creates a new WebSocket subject and send it to the messages subject
   * @param cfg if true the observable will be retried.
   */
  public connect(cfg: { reconnect: boolean } = { reconnect: false }): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ =  this.getNewWebSocket();
      const messages = this.socket$;
      this.messagesSubject$.next(messages);
    }
  }

  /**
   * Retry a given observable by a time span
   * @param observable the observable to be retried
   */
  private reconnect(observable: Observable<any>): Observable<any> {
    return observable.pipe(
      retryWhen((errors) =>
        errors.pipe(
          tap((val) => console.log('[Data Service] Try to reconnect', val)),
          delayWhen((_) => timer(RECONNECT_INTERVAL))
        )
      )
    );
  }

  close() {
    this.socket$.complete();
    this.socket$ = undefined;
  }

  sendMessage(msg: any) {
    this.socket$.next(msg);
  }

  /**
   * Return a custom WebSocket subject which reconnects after failure
   */
  private getNewWebSocket(): WebSocketSubject<string> {
    return webSocket({
      url: WS_ENDPOINT,
      openObserver: {
        next: () => {
          console.log('[DataService]: connection ok');
        },
      },
      closeObserver: {
        next: () => {
          console.log('[DataService]: connection closed');
          this.socket$ = undefined;
          this.connect({ reconnect: true });
        },
      },
    });
  }
}
