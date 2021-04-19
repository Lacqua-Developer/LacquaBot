import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import {
  catchError,
  tap,
  switchAll,
  retryWhen,
  delayWhen,
} from 'rxjs/operators';
import { EMPTY, Subject, Observable, timer, Subscription } from 'rxjs';
export const WS_ENDPOINT = environment.wsServer;

export default class message {
  channel: string;
  msg: string;

  constructor(ch: string, m: string) {
    this.channel = ch;
    this.msg = m;
  }
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor() {
    this.socketw.subscribe();
  }
  chunks = [];
  reader = new FileReader();

  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe(
    switchAll(),
    catchError((e) => {
      throw e;
    })
  );

  public VerificaAtivosSbj: Subject<any> = new Subject();
  public VerificaContatoSbj: Subject<any> = new Subject();
  public VerificaEsperaSbj: Subject<any> = new Subject();
  public VerificaReconnect: Subject<any> = new Subject();

  private socketw: WebSocketSubject<string> = webSocket<string>({
    url: WS_ENDPOINT,
    closeObserver: {
      next: (e: CloseEvent) => {
        this.socketw.subscribe(
          (c) => console.log('Conectado', c),
          (erro) => console.log('erro', erro)
        );
        this.VerificaReconnect.next();
      },
    },
    deserializer: ({ data }) => {
      console.log(data);
      this.AnalisaResposta(data);
      return data;
    },
  });

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
  };

  sendMessage(msg: string): void {
    console.log('Enviando:', msg);
    this.socketw.next(msg);
  }
}
