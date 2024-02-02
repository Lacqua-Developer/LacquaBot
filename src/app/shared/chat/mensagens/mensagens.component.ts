import { ResetChatAtivos } from './../../../store/actions/chat-ativos.actions';
import { ResetChatContatos } from './../../../store/actions/chat-contatos.actions';
import { ResetChatEspera } from './../../../store/actions/chat-espera.actions';
import { ChatState } from 'src/app/store/interfaces/states';
import { Store } from '@ngrx/store';
import { TransfereAtendimentoComponent } from './../../dialogs/transfere-atendimento/transfere-atendimento.component';
import { ClienteDetalheComponent } from './../../dialogs/cliente-detalhe/cliente-detalhe.component';
import { SugestaoDialogComponent } from './../../dialogs/texto-sugestao/texto-sugestao.component';
import { AbreAtendimentoComponent } from './../../dialogs/abre-atendimento/abre-atendimento.component';
import { Conversa } from './../../../models/conversa';
import { UtilService } from '../../../services/util.service';
import { CoreService } from '../../../services/core.service';
import { ConfigService } from '../../../services/config.service';
import { environment } from '../../../../environments/environment';
import { Usuario } from '../../../models/usuario';
import { LoginService } from '../../../services/login.service';
import { ChatMenssagem } from '../../../models/ChatMenssagem';
import { Contato } from '../../../models/contato';
import { ChatMessageState } from './../../../store/interfaces/states';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, config } from 'rxjs';
import { ChatService } from '../../../services/chat.service';
import { Config } from 'src/app/models/config';
import { Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sessao } from 'src/app/models/sessao';
import { TPChat } from 'src/app/models/tipo-chat';
import { AppState } from 'src/app/store/app-reducers';

@Component({
  selector: 'app-historico-mensagem',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.scss'],
})
export class HistoricoMensagemComponent implements OnInit, OnDestroy {
  public storage: Observable<ChatState>;
  private storeChat: string = 'default';
  private routeSub: Subscription[] = [];
  public MsgText = '';
  public imgcli: string = null;
  private subscription: Subscription[] = [];
  public usr: Usuario = new Usuario();
  public OutImg = '';
  public OutImgLink = '';
  private ngUnsubscribe = new Subject();
  public conf: Config[] = [];
  public NroSaida = 0;
  public sessaoLogin: Config;
  private contAtu = 0;
  public itemchip = 0;
  public ConversaSelecao: Conversa[];
  private usrs: Usuario[] = [];
  public MsgAnexo = '';
  public imageRefrsh = environment.app + 'assets/Images/refresh.jfif';
  public configAtivo : Config;

  @Input() currentsessao = 0;
  @Input() contato: Contato = new Contato();
  @Input() chipSelecionado: boolean;
  @Input() contatoSelecao: Contato;
  @Input() TipoChat: string = '-1';
  @Input() events: Observable<Contato>;

  private eventsSubscription: Subscription;

  constructor(
    private chatService: ChatService,
    private ls: LoginService,
    private config: ConfigService,
    private core: CoreService,
    private util: UtilService,
    private dialog: MatDialog,
    private store: Store<ChatMessageState>,
    private storeApp: Store<AppState>

  ) {  }

  ngOnInit(): void {

     this.util.debug('Tipo Chat:',  this.TipoChat);
    switch (this.TipoChat.trim()) {
      case '1':
        this.storeChat = 'chatContatos';

         this.util.debug('Subscribe:', this.storeChat);
        this.store.select<any>('chatContatos').subscribe((state) => {
           this.util.debug('Retorno Subs:',  state);
          if (state) {
             this.util.debug('state: ', state);
             this.util.debug('Resultado: ', state['loaded'] == true);
            if (state['contatoAtivo'] != null) {
              this.contato = state['contatoAtivo'];
              this.contatoSelecao = state['contatoAtivo'];

               this.util.debug('Conversas:', this.contato.Conversa);

              const conv: Conversa[] = this.contato.Conversa;
              this.itemchip = this.NroSaida;
              this.ConversaSelecao = conv;
            }
          }
        });
        break;
      case '2':
        this.storeChat = 'chatAtivos';

         this.util.debug('Subscribe:', this.storeChat);
        this.store.select<any>('chatAtivos').subscribe((state) => {
           this.util.debug('Retorno Subs:',  state);
          if (state) {
             this.util.debug('state: ', state);
             this.util.debug('Resultado: ', state['loaded'] == true);
            if (state['contatoAtivo'] != null) {
              this.contato = state['contatoAtivo'];
              this.contatoSelecao = state['contatoAtivo'];

               this.util.debug('Conversas:', this.contato.Conversa);

              const conv: Conversa[] = this.contato.Conversa;
              this.itemchip = this.NroSaida;
              this.ConversaSelecao = conv;
            }
          }
        });
        break;
      case '3':
        this.storeChat = 'chatEspera';
         this.util.debug('Subscribe:', this.storeChat);
        this.store.select<any>('chatEspera').subscribe((state) => {
           this.util.debug('Retorno Subs:',  state);
          if (state) {
             this.util.debug('state: ', state);
             this.util.debug('Resultado: ', state['loaded'] == true);
            if (state['contatoAtivo'] != null) {
              this.contato = state['contatoAtivo'];
              this.contatoSelecao = state['contatoAtivo'];

               this.util.debug('Conversas:', this.contato.Conversa);

              const conv: Conversa[] = this.contato.Conversa;
              this.itemchip = this.NroSaida;
              this.ConversaSelecao = conv;
            }
          }
        });

        break;

      default:
         this.util.debug('Não entrou no switch', this.TipoChat);
        break;
    }

    this.ls.RetornaUsr.subscribe((u) => (this.usr = u));


    this.store.select<any>('config').subscribe(state => {

      this.configAtivo = state['configAtivo'];
      console.log('ConfigAtivo:', this.configAtivo);


    })

    this.conf = this.usr.Configs;

    this.storage = this.store.select<any>(this.storeChat);


    console.log('Configs',this.conf);


    window.onbeforeunload = () => this.ngOnDestroy();
  }

  convRet(conv: Conversa[]): void {
    this.itemchip = this.NroSaida;

    this.contAtu++;
    if (this.currentsessao == this.core.CurrentIdContato) {
      this.contAtu = 0;
      this.ConversaSelecao = conv;
    } else {
      this.contAtu = 0;
      this.contato = new Contato();
      this.contatoSelecao = new Contato();
      this.ConversaSelecao = [];
      this.currentsessao = 0;
    }
  }

  refresh(): void {
    this.chatService
      .getContatoId(this.contatoSelecao.IdContato.toString())
      .subscribe((cont) => {
         this.util.debug('Conversa: ', cont.Conversa);
        const conv: Conversa[] =
          cont.Conversa.length > 0 ? cont.Conversa : new Conversa[0]();
        this.itemchip = this.NroSaida;

        this.contAtu++;
        if (this.currentsessao == this.core.CurrentIdContato) {
          this.contAtu = 0;
          this.ConversaSelecao = conv;
        } else {
          this.contAtu = 0;
          this.contato = new Contato();
          this.contatoSelecao = new Contato();
          this.ConversaSelecao = [];
          this.currentsessao = 0;
        }
      });
  }

  selectChangeHandler(event: any): void {
    this.util.debug('Event:', event);
    this.NroSaida = event;
    this.chipSelecionado = true;

    this.util.debug('Selecionado:', this.NroSaida);
  }

  ImageUploased(event): void {
    this.OutImg = event;
    this.OutImgLink = environment.api + 'DocFile/GetFile?fileName=' + event;
    this.MsgAnexo = event;
  }

  triggerFunction(event): void {
    if (event.ctrlKey && event.key === 'Enter') {
      this.EnviaMsg();
    }

    if (event.ctrlKey && event.keyCode === 51) {
      let configTexto = this.NroSaida > 0 ? this.NroSaida : this.usr.Config.ID;

      if (configTexto > 0) {
        const dialogRef = this.dialog.open(SugestaoDialogComponent, {
          width: '400px',
          height: '350px',
          data: {
            contato: this.contatoSelecao,
            chip: this.conf.filter((x) => x.ID == configTexto),
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          this.MsgText = result;
        });
      }
    }
  }

  EnviaMsg(): void {
    if (this.contato.IdContato > 0) {
      if (this.MsgText != null || this.OutImg != null) {
        if (this.MsgText.length > 0 || this.OutImg.trim().length > 0) {
          this.util.debug('Saida', this.NroSaida);
          const ms = new ChatMenssagem();
          ms.content = this.MsgText == null ? '' : this.MsgText;
          ms.id = this.contato.IdContato;
          ms.username = this.usr.IdUsr;
          ms.attachmet = this.OutImg == null ? '' : this.OutImg.trim();
          ms.config =
            this.NroSaida > 0
              ? this.NroSaida.toString()
              : this.usr.Config.ID.toString();

          this.chatService.setMensagem(ms).subscribe(() => {
            this.MsgText = '';
            this.OutImg = '';
            this.MsgAnexo = 'Mensagem Enviada!';
            this.util.debug('Mensagem Enviada!');
            this.refresh();
          });
        } else {
          this.MsgAnexo = 'Selecione meio de saida e texto!';
          return;
        }
      } else {
        this.MsgAnexo = 'Selecione meio de saida e texto!';
      }
    } else {
      this.MsgAnexo = 'Selecione o contato!';
    }
  }

  compare = (a, b) => {
    // Create arrays of property names
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
      return false;
    }

    for (var i = 0; i < aProps.length; i++) {
      const propName = aProps[i];

      // If values of same property are not equal,
      // objects are not equivalent
      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  };

  fechaSessao(): void {
    this.chatService.FechaSessao(this.contatoSelecao).subscribe(() => {
      alert('Sessão Fechada!');




      switch (this.TipoChat.trim()) {
        case '1':
          this.storeChat = 'chatContatos';

          this.storeApp.dispatch(ResetChatContatos());

          break;
        case '2':
          this.storeChat = 'chatAtivos';
          this.storeApp.dispatch(ResetChatAtivos());

          break;
        case '3':

          this.storeApp.dispatch(ResetChatEspera());
          break;

        default:
           this.util.debug('Não entrou no switch', this.TipoChat);
          break;
      }


      this.contato = new Contato();
      this.contatoSelecao = new Contato();
      this.ConversaSelecao = [];
      this.currentsessao = 0;
       this.util.debug('Ckeck listas');
      this.core.CurrentIdContato = 0;
      this.core.verificaEspera();
      this.core.verificaAtivos(this.usr.IdUsr.toString());
      this.core.verificaContatos(
        this.usr.IdUsr.toString(),
        this.usr.Permissao.toString()
      );
    });
  }

  DetalheCliente(): void {
    const dialogRef = this.dialog.open(ClienteDetalheComponent, {
      width: '350px',
      height: '250px',
      data: {
        contato: this.contatoSelecao,
        usuarios: this.usr,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.util.debug('The dialog was closed', result);
    });
  }

  AbreSessao(): void {
    this.util.debug('Abre Dialog');
    if (this.contatoSelecao.Sessao?.IdSession == null) {
      this.contatoSelecao.Sessao = new Sessao();
    }
    this.contatoSelecao.Sessao.Usuario_IdUsuario = this.usr.IdUsr;
    const dialogRef = this.dialog.open(AbreAtendimentoComponent, {
      width: '350px',
      height: '250px',
      data: {
        contato: this.contatoSelecao,
        usuarios: this.usr,
        tipoChat: this.TipoChat
      },
    });
    if (this.TipoChat == '3') {
      dialogRef.afterClosed().subscribe((result) => {
        this.util.debug('The dialog was closed', result);
        this.contato = new Contato();
        this.contatoSelecao = new Contato();
        this.ConversaSelecao = [];
        this.currentsessao = 0;
         this.util.debug('Ckeck listas');
        this.core.CurrentIdContato = 0;
        this.core.verificaEspera();
        this.core.verificaAtivos(this.usr.IdUsr.toString());
        this.core.verificaContatos(
          this.usr.IdUsr.toString(),
          this.usr.Permissao.toString()
        );
      });
    }

    this.core.verificaEspera();
    this.core.verificaAtivos(this.usr.IdUsr.toString());
    this.core.verificaContatos(
      this.usr.IdUsr.toString(),
      this.usr.Permissao.toString()
    );
  }

  transfer(): void {
    if (this.usrs.length == 0) {
      this.chatService.Usrs().subscribe((u) => {
        this.util.debug('Users:', u);
        this.usrs = u;
      });
    }
    const dialogRef = this.dialog.open(TransfereAtendimentoComponent, {
      width: '350px',
      height: '250px',
      data: {
        contato: this.contatoSelecao,
        usuarios: this.usrs,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.util.debug('The dialog was closed', result);
      this.contato = new Contato();
      this.contatoSelecao = new Contato();
      this.ConversaSelecao = [];
      this.currentsessao = 0;
    });

    this.core.verificaEspera();
    this.core.verificaAtivos(this.usr.IdUsr.toString());
    this.core.verificaContatos(
      this.usr.IdUsr.toString(),
      this.usr.Permissao.toString()
    );
  }

  ngOnDestroy(): void {
    //this.util.debug('Sessao Fechada:', this.id, this.TipoChat);
    this.core.CurrentIdContato = 0;
    this.subscription.forEach((s) => {
      s.unsubscribe();
      s.closed = true;
    });
    this.subscription.forEach((s) => s.remove(s));
    this.routeSub.forEach((s) => {
      s.unsubscribe();
      s.closed = true;
    });

    //this.eventsSubscription.unsubscribe();

    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
