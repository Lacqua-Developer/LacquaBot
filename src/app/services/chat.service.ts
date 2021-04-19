import { ListaChat } from '../models/ListaChat';
import { LoginService } from './login.service';
import { Sessao } from '../models/sessao';
import { Conversa } from '../models/conversa';
import { ChatMenssagem } from '../models/ChatMenssagem';
import { Contato } from '../models/contato';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, of, Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { catchError, map, take, takeUntil } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { ajax, AjaxResponse } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private CurrentContto = new Contato();
  private ObInterval = interval(2000);
  public usr: Usuario;
  public Contato = new Observable((observer) => {});
  public SubConv: Subject<Conversa>;

  constructor(private http: HttpClient, private lg: LoginService) {
    this.lg.RetornaUsr.subscribe((x) => {
      this.usr = x;
    });
  }

  public getContato(): Observable<Contato[]> {
    return this.http.get<Contato[]>(environment.api + 'contatos/get');
  }

  public getContatoLight(): Observable<Contato[]> {
    return this.http.get<Contato[]>(environment.api + 'contatos/GetLight');
  }

  public getContatoId(id: string): Observable<Contato> {
    if (parseInt(id, 10) > 0) {
      return this.http.get<Contato>(
        environment.api + 'contatos/GetConversas/' + id
      );
    }
  }

  public getContatoSessao(id: string): Observable<Contato[]> {
    if (parseInt(id, 10) > 0) {
      return this.http.get<Contato[]>(
        environment.api + 'contatos/GetContatosSessao/' + id
      );
    }
  }

  public getContatoUsrLight(id: string): Observable<Contato[]> {
    if (parseInt(id, 10) > 0) {
      return this.http.get<Contato[]>(
        environment.api + 'contatos/getContatosUsrLight/' + id
      );
    }
  }

  public getListaChatAtv(id: string): Observable<ListaChat[]> {
    if (parseInt(id, 10) > 0) {
      return this.http.get<ListaChat[]>(
        environment.api + 'ListaChat/GetListaAtivos/' + id
      );
    }
  }

  public getListaChatCont(id: string): Observable<ListaChat[]> {
    if (parseInt(id, 10) > 0) {
      return this.http.get<ListaChat[]>(
        environment.api + 'ListaChat/GetListaContatos/' + id
      );
    }
  }

  public getListaChatEsp(id: string): Observable<ListaChat[]> {
    if (parseInt(id, 10) > 0) {
      return this.http.get<ListaChat[]>(
        environment.api + 'ListaChat/GetListaEspera/' + id
      );
    }
  }

  public getContatoUsr(id: string): Observable<Contato[]> {
    if (parseInt(id, 10) > 0) {
      return this.http.get<Contato[]>(
        environment.api + 'contatos/getContatosUsr/' + id
      );
    }
  }

  public Usrs(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(environment.api + 'auth/getUsuarios');
  }

  public CheckConversa(c: Conversa): Observable<AjaxResponse> {
    //this.util.debug('check Conv!');

    return ajax({
      url: environment.api + 'conversas/CheckConversa',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'rxjs-custom-header': 'Rxjs',
      },
      body: c,
    });
  }

  public IniciaSessao(c: Contato): Observable<boolean> {
    return this.http.post<boolean>(environment.api + 'sessao/IniciaSessao', c);
  }

  public CriaSessao(c: Sessao): Observable<Sessao> {
    return this.http.post<Sessao>(environment.api + 'sessao/CriaSessao', c);
  }

  public FechaSessao(c: Contato): Observable<boolean> {
    return this.http.post<boolean>(environment.api + 'sessao/FechaSessao', c);
  }

  public TransSessao(c: Contato): Observable<boolean> {
    return this.http.post<boolean>(environment.api + 'sessao/TransfSessao', c);
  }

  public getContatoEspera(): Observable<Contato[]> {
    return this.http.get<Contato[]>(
      environment.api + 'contatos/GetContatosEspera/'
    );
  }
  public setContato(c: Contato): Observable<Contato> {
    return this.http.post<Contato>(environment.api + 'contatos/SetContato/', c);
  }

  public setMensagem(chat: ChatMenssagem): Observable<Conversa> {
    return this.http.post<Conversa>(environment.api + 'conversas/post', chat);
  }

  public getContatoChave(chavve: string): Observable<Contato[]> {
    return this.http.get<Contato[]>(
      environment.api + 'contatos/getContatosChave/' + chavve
    );
  }

  public getContatoConfig(idconfig: number): Observable<Contato[]> {
    return this.http.get<Contato[]>(
      environment.api + 'contatos/GetContatoConfig/' + idconfig.toString()
    );
  }

  public validURL(str: string): boolean {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(str);
  }
}
