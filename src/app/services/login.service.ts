import { Store } from '@ngrx/store';
import { RelatorioService } from './relatorio.service';
import { Relatorio } from '../models/relatorio';
import { UtilService } from './util.service';
import { ConfigService } from './config.service';
import { Usuario } from '../models/usuario';
import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { AsyncSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class LoginService {


  constructor(private http: HttpClient,
              private cs: ConfigService ,
              private util: UtilService,
              private rels: RelatorioService,
              private store: Store) {}



  public usr = new Usuario();
  public RetornaUsr = new AsyncSubject<Usuario>();
  public emitUser = new EventEmitter<Usuario>();

  public MenuRels: Subject<Relatorio[]> = new Subject();

  public Autentica(
    login: string,
    Senha: string,
    Sessao: string
  ): Observable<Usuario> {

      // Crie um objeto de cabeçalhos com os headers necessários
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Defina os headers necessários, como o tipo de conteúdo
    });

    // Opções de requisição com os headers
    const options = { headers: headers };


    this.usr.Login = login;
    this.usr.Senha = Senha;
    this.util.debug(environment.api + 'auth/post');
    const ret = this.http.post<Usuario>(
      environment.api + 'auth/post',
      this.usr,options
    );
    ret.subscribe((u) => {


      this.usr = u;
      this.usr.SessionWhats = Sessao;
      this.cs.RetConfig.subscribe((c) => {
        c.forEach((y) => {
          if (y.ID == Number.parseInt(Sessao)) {
            u.Config = y;
          }
        });
      });
      this.emitUser.emit(u);
      this.RetornaUsr.next(u);
      this.RetornaUsr.complete();

      if (u.Logado) {
        this.rels.ListaRelatorio(this.usr.Permissao).subscribe((x) => {
          this.MenuRels.next(x);
        });
      }
      this.util.debug(u);
    });

    this.util.debug(ret);

    return ret;
  }
}
