import { Usuario } from './../models/usuario';
import { ChatEspera, SelecionaContatoChatEspera } from './../store/actions/chat-espera.actions';
import { ChatContatos, SelecionaContatoChatContato } from './../store/actions/chat-contatos.actions';
import { ChatAtivos, SelecionaContatoChatAtivos } from './../store/actions/chat-ativos.actions';
import { Contato } from './../models/contato';
import { Store } from '@ngrx/store';
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
import { AppState } from '../store/app-reducers';
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
  constructor( private store: Store<AppState>) {
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
    let contatoAtv: Contato;
    let usr: Usuario;

    this.store.select<any>('login').subscribe( (state) => usr = state['usuario'] );
    console.log('Analisando Resposta', m);
    if (mm.length > 0) {
      switch (mm[0]) {
        case 'Ativos':
          console.log('Analisando Ativos', m);
          this.store.select<any>('chatAtivos').subscribe( (state) => contatoAtv = state['contatoAtivo'] );


          this.store.dispatch(ChatAtivos( { IdUsr: usr.IdUsr.toString() }))
          if(contatoAtv){
              this.store.dispatch(SelecionaContatoChatAtivos({IdContato: contatoAtv.IdContato.toString()}));
          }
          break;
        case 'Contato':
          console.log('Analisando Contato', m);

          this.store.select<any>('chatContatos').subscribe( (state) => contatoAtv = state['contatoAtivo'] );


          this.store.dispatch(ChatContatos( { IdUsr: usr.IdUsr.toString() }))
          if(contatoAtv){
              this.store.dispatch(SelecionaContatoChatContato({IdContato: contatoAtv.IdContato.toString()}));
          }
          break;
        case 'Espera':
          console.log('Analisando Espera', m);

          this.store.select<any>('chatEspera').subscribe( (state) => contatoAtv = state['contatoAtivo'] );


          this.store.dispatch(ChatEspera( { IdUsr: usr.IdUsr.toString() }))
          if(contatoAtv){
              this.store.dispatch(SelecionaContatoChatEspera({IdContato: contatoAtv.IdContato.toString()}));
          }

          break;
      }
    }
  };

  /*
      switch(this.TipoChat){
      case '1':
        this.storeChat = 'chatContatos';
        this.store.dispatch(ChatContatos( { IdUsr: this.usr.IdUsr.toString() } ))
        break;
      case '2':
        this.storeChat = 'chatAtivos';
        this.store.dispatch(ChatAtivos( { IdUsr: this.usr.IdUsr.toString() }))
        break;
      case '3':
        this.storeChat = 'chatEspera';
        this.store.dispatch(ChatEspera( { IdUsr: this.usr.IdUsr.toString() }) )
        break;
    }

  */

  sendMessage(msg: string): void {
    console.log('Enviando:', msg);
    this.socketw.next(msg);
  }
}
