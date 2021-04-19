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
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { ChatService } from '../../../services/chat.service';
import { Config } from 'src/app/models/config';
import { Input } from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import { Sessao } from 'src/app/models/sessao';
import { TPChat } from 'src/app/models/tipo-chat';


@Component({
  selector: 'app-historico-mensagem',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.scss'],
})
export class HistoricoMensagemComponent implements OnInit, OnDestroy {
  constructor(
    private chatService: ChatService,
    private ls: LoginService,
    private config: ConfigService,
    private core: CoreService,
    private util: UtilService,
    private dialog: MatDialog
  ) {
    this.ls.RetornaUsr.subscribe((u) => (this.usr = u));
  }

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

  @Input() currentsessao = 0;
  @Input() contato: Contato = new Contato();
  @Input() chipSelecionado: boolean;
  @Input() contatoSelecao: Contato;
  @Input() TipoChat: number;
  @Input() events: Observable<Contato>;

  private eventsSubscription: Subscription;

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.util.debug('Sessao Modificada:', this.currentsessao);
  //   this.core.CurrentIdContato = this.currentsessao;
  //   this.contAtu = 40;
  //   this.ngOnInit();
  // }

  ngOnInit(): void {
    this.ConversaSelecao = [];
    this.eventsSubscription = this.events.subscribe((id) => {
      this.util.debug('Conversa:', id);

      this.currentsessao = id.IdContato;
      this.core.TipoChat = this.TipoChat;
      this.core.CurrentIdContato = id.IdContato;
      this.core.CurrentContato = id;
      this.core.TipoChatClass = new TPChat(this.TipoChat, id.IdContato);
      this.core.IniciaConv(this.usr, this.TipoChat);
      this.contatoSelecao = id;

      switch (this.TipoChat.toString()) {
        case '1':
          const tp1 = this.core.VerificaConversasEsperaSbj.subscribe((conv) => {
            this.util.debug('Popula Espera:', conv.length);
            this.convRet(conv);
          });
          this.util.debug('tp1:', tp1);
          break;

        case '2':
          const tp2 = this.core.VerificaConversasAtivosSbj.subscribe((conv) => {
            this.util.debug('Popula Ativos:', conv.length);
            this.convRet(conv);
          });
          this.util.debug('tp2:', tp2);
          break;

        case '3':
          const tp3 = this.core.VerificaConversasContatosSbj.subscribe(
            (conv) => {
              this.util.debug('Popula Contatos:', conv.length);
              this.convRet(conv);
            }
          );
          this.util.debug('tp3:', tp3);
          break;
        default:
          const def = this.core.VerificaConversasAtivosSbj.subscribe((conv) => {
            this.util.debug('Popula Ativos - Default:', conv.length);
            this.convRet(conv);
          });
          this.util.debug('tp Defaul:', def);
          break;
      }
      this.refresh();
    });

    this.config.RetConfig.subscribe((c) => (this.conf = c));
    this.chatService.Usrs().subscribe((u) => {
      this.util.debug('Users:', u);
      this.usrs = u;
    });

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

    if (event.keyCode === 51) {
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
    this.chatService
        .FechaSessao(this.contatoSelecao).subscribe(() => {
      alert('Sessão Fechada!');
      this.contato = new Contato();
      this.contatoSelecao = new Contato();
      this.ConversaSelecao = [];
      this.currentsessao = 0;
      console.log('Ckeck listas');
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
      },
    });
    if (this.TipoChat == 3) {
      dialogRef.afterClosed().subscribe((result) => {
        this.util.debug('The dialog was closed', result);
        this.contato = new Contato();
        this.contatoSelecao = new Contato();
        this.ConversaSelecao = [];
        this.currentsessao = 0;
        console.log('Ckeck listas');
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

    this.eventsSubscription.unsubscribe();

    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
