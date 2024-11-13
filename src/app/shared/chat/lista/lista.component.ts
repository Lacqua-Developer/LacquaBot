import { ChatEspera } from './../../../store/actions/chat-espera.actions';
import { ChatContatos } from './../../../store/actions/chat-contatos.actions';
import { Sessao } from './../../../models/sessao';
import { Observable, Subject, Subscription } from 'rxjs';
import { UtilService } from '../../../services/util.service';
import { CoreService } from '../../../services/core.service';
import { LoginService } from '../../../services/login.service';
import { Config } from './../../../models/config';
import { ConfigService } from '../../../services/config.service';
import { Contato } from './../../../models/contato';
import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { ContatoProfile } from 'src/app/models/contatoProfile';
import { ChatService } from '../../../services//chat.service';
import { GetProfileService } from '../../../services//get-profile.service';
import { Usuario } from '../../../models/usuario';
import { MatDialog } from '@angular/material/dialog';

import { Output, OnDestroy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChatAtivos, LoginAtivos } from 'src/app/store/actions';
import { ChatState } from 'src/app/store/interfaces/states';

@Component({
  selector: 'app-contato-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit, OnDestroy {
  public contatos: Contato[] = [];
  public imgs: ContatoProfile[] = [];

  public IdContatoSelecao = 0;

  public srcCont: string;

  public configAtivo: Config;

  public storeChat: string;

  public ico = 0;

  constructor(
    private router: Router,
    private chatService: ChatService,
    private profile: GetProfileService,
    private ls: LoginService,
    private config: ConfigService,
    public dialog: MatDialog,
    private core: CoreService,
    private util: UtilService,
    private store: Store<ChatState>
  ) {

    this.store
    .select<any> ('login')
    .subscribe((state  => {
      this.usr =  state['usuario'];
     } ));


     this.store
     .select<any> ('config')
     .subscribe((state  => {
       this.configAtivo =  state['configAtivo'];
      } ));


  }

  @Input() NroSaida: Config;
  @Input() usr: Usuario;
  @Output() contatoSel = new EventEmitter<Contato>();
  @Input() TipoChat: string ;

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.ico = 0;

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






  }

  iconlist(): void {
    this.ico = 0;
  }

  iconChip(): void {

    this.ico = 2;
  }

  iconAgenda(): void {
    this.ico = 3;
  }

  iconSeg(): void {
    this.ico = 1;
  }

  addContato(): void {
    if (this.srcCont) {
      this.util.debug(this.srcCont);
      this.profile
        .getTelefoneStatus(this.srcCont + '@c.us', this.configAtivo.Apelido)
        .subscribe((x) => {
          this.util.debug(x);
          if (x.numberExists) {
            const co: Contato = new Contato();
            co.IdWhatsApp = this.srcCont + '@c.us';
            co.IdConfig = this.configAtivo.ID;
            co.Telefone = this.srcCont;
            this.chatService.setContato(co)
                .subscribe((c) => {
              const s: Sessao = new Sessao();
              s.Contato_Idcontato = c.IdContato;
              s.Usuario_IdUsuario = this.usr.IdUsr;
              this.chatService.CriaSessao(s).subscribe((ss) => {
                if (ss.Usuario_IdUsuario == this.usr.IdUsr) {
                  this.util.debug('Sessao Criada:', ss);
                } else {
                  this.util.debug('Sessao alocada:', ss.Usuario.NomeUsuario);
                  alert(
                    'Sessão iniciada por outro operador! ' +
                      ss.Usuario.NomeUsuario
                  );
                }
              });
              this.ngOnInit();
            });
          } else {
            alert('Cliente não possui WhatsApp!');
          }
        });
    } else {
      alert('Telefone inválido!');
    }
  }

  onClick(el: { getAttribute: (arg0: string) => any }): void {
    this.util.debug('Click');

    const messageId = el.getAttribute('data-message-id');
    const messageTel = el.getAttribute('data-message-tel');
    this.IdContatoSelecao = messageId;
    this.contatos.forEach((x) => {
      if (x.IdContato == this.IdContatoSelecao) {
        this.util.debug('Emitindo:', x);
        this.contatoSel.emit(x);
      }
    });
    this.util.debug('Message Id: ', messageId);
  }
}
