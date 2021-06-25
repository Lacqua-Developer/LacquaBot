import { ConfigAtivos } from './../../../store/actions/config.actions';
import { RelatorioService } from './../../../services/relatorio.service';
import { Relatorio } from './../../../models/relatorio';
import { UtilService } from './../../../services/util.service';

import { ConfigService } from './../../../services/config.service';
import { Config } from 'src/app/models/config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from './../../../models/usuario';
import { LoginService } from './../../../services/login.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginAtivos } from 'src/app/store/actions';
import { ChatState } from 'src/app/store/interfaces/states';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private login: LoginService,
    private cs: ConfigService,
    private router: Router,
    private util: UtilService,
    private rels: RelatorioService,
    private store: Store<ChatState>
  ) {
    this.cs.RetConfig.subscribe((c) =>{
       this.config = c;


      });
  }
  public config: Config[] = [];
  public usr: Usuario = new Usuario();
  public rel: Relatorio[] = [];


  form: FormGroup = new FormGroup({
    login: new FormControl(''),
    senha: new FormControl(''),
    sessao: new FormControl(''),
  });

  ngOnInit(): void {
    this.store.select<any>('login').subscribe((state) => {
      this.usr = state['usuario'];
      this.usr.SessionWhats = this.form.value.sessao;
      this.error = state['errorLoginMessage'];
    });
  }

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  submit(): void {
    if (this.form.valid) {
      this.store.dispatch(ConfigAtivos( { id: this.form.value.sessao }));
      this.store.dispatch(
        LoginAtivos({
          Login: this.form.value.login,
          Senha: this.form.value.senha,
          sessao: this.form.value.sessao,
        })
      );
    }
  }
}

/*


import { RelatorioService } from './../../../services/relatorio.service';
import { Relatorio } from './../../../models/relatorio';
import { UtilService } from './../../../services/util.service';

import { ConfigService } from './../../../services/config.service';
import { Config } from 'src/app/models/config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from './../../../models/usuario';
import { LoginService } from './../../../services/login.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup  } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginAtivos } from 'src/app/store/actions';
import { ChatState } from 'src/app/store/interfaces/states';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent  {
    constructor(private login: LoginService,
                private cs: ConfigService,
                private router: Router,
                private util: UtilService,
                private rels: RelatorioService,
                private store: Store<ChatState>
                ){
                  this.cs.RetConfig.subscribe(c => this.config = c);
                }
    public config: Config[] = [];
    public usr: Usuario  = new Usuario();
    public rel: Relatorio[] = [];
    form: FormGroup = new FormGroup({
    login: new FormControl(''),
    senha: new FormControl(''),
    sessao: new FormControl('')
  });


  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  submit(): void {
    if (this.form.valid) {
      this.store.dispatch(LoginAtivos( { Login: this.form.value.login,
      Senha: this.form.value.senha,
      Sessao: this.form.value.sessao}));

      this.store
      .select<any>('login')
      .subscribe((state  => {

      } ));

      this.login.Autentica(this.form.value.login,
                           this.form.value.senha,
                           this.form.value.sessao).subscribe(us => {
                  if (us.Logado)
                  {
                      this.util.debug( 'Logado' );
                      this.util.debug(us);
                      this.usr = us;
                      this.usr.SessionWhats = this.form.value.sessao;

                      this.rels
                          .ListaRelatorio(this.usr.Permissao)
                          .subscribe((x) => {
                        this.rel = x;
                      });
                  }
                  else
                  {
                    this.util.debug('Deslogado');
                    this.usr.NomeUsuario = 'Deslogado';
                  }
                });
    }
  }

}

*/
