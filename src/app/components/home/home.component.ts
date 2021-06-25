import { CoreService } from './../../services/core.service';
import { Config } from './../../models/config';
import { Store } from '@ngrx/store';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { ChatState } from 'src/app/store/interfaces/states';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private login: LoginService,
    private store: Store<ChatState>,
    private core: CoreService
  ) {}

  private _mobileQueryListener: () => void;
  public emitUser = new EventEmitter<Usuario>();
  public configAtivo: Config;
  public usr: Usuario = this.login.usr;
  public logado: boolean = false;
  public showMenuRel = true;
  public showMenuMan = false;
  public showMenuCad = false;
  @Input() UsuarioSessao: Usuario = this.usr;
  mobileQuery: MediaQueryList;
  public rel = [];

  ngOnInit(): void {
    this.store.select<any>('login').subscribe((state) => {
      this.usr = state['usuario'];
      this.logado = this.usr.Logado;
      if (state['logged']) {
        this.core.verificaListaChat(
           this.usr.IdUsr.toString()
         );
        //console.log('Usuario:', this.usr);
        //console.log('Logado:', this.logado);
      }
    });

    this.store.select<any>('config').subscribe((state) => {
      this.configAtivo = state['configAtivo'];
    });
  }

  toggleMenu(): void {
    this.showMenuRel = !this.showMenuRel;
  }
}
