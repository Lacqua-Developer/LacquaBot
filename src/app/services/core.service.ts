import { WebsocketService } from './websocket.service';
import { UtilService } from './util.service';
import { Usuario } from '../models/usuario';
import { ChatService } from './chat.service';
import { Conversa } from '../models/conversa';
import {
  Subject,
  interval,
  EMPTY,
  Subscription,
  Subscriber,
  concat,
  Observable,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { DataService } from './data-service.service';
import { Contato } from '../models/contato';
import {
  concatMap,
  exhaustMap,
  observeOn,
  takeUntil,
  takeWhile,
} from 'rxjs/operators';
import { ConditionalExpr } from '@angular/compiler';
import { TPChat } from '../models/tipo-chat';
import { ListaChat } from '../models/ListaChat';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(
    private chat: ChatService,
    private util: UtilService,
    private ws: WebsocketService,
    private wsNew: DataService
  ) {}

  public VerificaAtivosSbj: Subject<Contato[]> = new Subject();
  public VerificaEsperaSbj: Subject<Contato[]> = new Subject();
  public VerificaContatoSbj: Subject<Contato[]> = new Subject();

  public VerificaListaChatSbj: Subject<ListaChat[]> = new Subject();

  public VerificaConversasAtivosSbj: Subject<Conversa[]> = new Subject();
  public VerificaConversasContatosSbj: Subject<Conversa[]> = new Subject();
  public VerificaConversasEsperaSbj: Subject<Conversa[]> = new Subject();

  public TipoChat = 0;
  public TipoChatClass: TPChat;
  public CurrentContato: Contato;
  public CurrentIdContato = 0;
  public contAtu = 0;
  public UltimaMsg = 0;
  public Timeout = 0;
  public UltimaConversa: Conversa;

  public StopCheck: Subject<any>;

  private intevalAtivos = interval(5000);
  private intevalEspera = interval(5000);
  private intevalContatos = interval(5000);
  private intevalConversas = interval(3000);

  private PAtivo = 0;
  private PEspera = 0;
  private PContato = 0;
  private PConversa = 0;

  private NAtivo: number[] = [];
  private NEspera: number[] = [];
  private NContato: number[] = [];
  private NConversa: number[] = [];

  private SubscrAtv: Subscription;
  private SubscrCont: Subscription;
  private SubscrEsp: Subscription;

  private SubscripitionConv: Subscription[] = [];
  public Inicializa(Usr: Usuario): void {
    this.Timeout = 30;

    //this.wsNew.sendMessage('0|4');
    this.SubscrAtv = this.ws.VerificaAtivosSbj.subscribe((x) => {
      this.util.debug('Recebido core Ativos:', x);
      this.verificaAtivos(Usr.IdUsr.toString());
    });

    this.SubscrCont = this.ws.VerificaContatoSbj.subscribe((x) => {
      this.util.debug('Recebido core Contato:', x);
      this.verificaContatos(Usr.IdUsr.toString(), Usr.Permissao.toString());
    });

    this.SubscrEsp = this.ws.VerificaEsperaSbj.subscribe((x) => {
      this.util.debug('Recebido core Espera:', x);
      this.verificaEspera();
    });

    this.ws.VerificaReconnect.subscribe(() => {
      this.util.debug('Reconectando...');
      this.SubscrAtv.unsubscribe();
      this.SubscrCont.unsubscribe();
      this.SubscrEsp.unsubscribe();

      setTimeout(() => {
        this.IniciaServAtv(Usr);
        this.IniciaServCont(Usr);
        this.IniciaServEsp(Usr);
      }, 3000);
    });
  }

  public IniciaConv(usr: Usuario, tp: number): void {
    const c = this.CurrentIdContato;

    if (this.SubscripitionConv) {
      this.util.debug('Limpa check');
      this.SubscripitionConv.forEach((x) => x.unsubscribe());
      this.SubscripitionConv.forEach((x) => x.remove);
      this.SubscripitionConv = [];
    }
    this.util.debug('Subscriptiom', this.SubscripitionConv.length);
    this.SubscripitionConv.push(this.verificaConversas(usr, tp));
    this.util.debug('Subscriptiom apos', this.SubscripitionConv);
  }

  public IniciaServAtv = (Usr) => {
    this.util.debug('Inicia servico:');
    this.ws.sendMessage('0|' + Usr.IdUsr.toString());
  };

  public IniciaServCont = (Usr) => {
    this.util.debug('Inicia servico:');
    this.ws.sendMessage('1|' + Usr.IdUsr.toString());
  };

  public IniciaServEsp = (Usr) => {
    this.util.debug('Inicia servico:');
    this.ws.sendMessage('2|' + Usr.IdUsr.toString());
  };

  public ContatoFilter(chave: string): void {
    this.chat.getContatoChave(chave).subscribe((r) => {
      this.VerificaContatoSbj.next(r);
    });
  }

  public verificaListaChat(id: string): void {
    this.chat.getListaChatAtv(id).subscribe((c) => {
      this.VerificaListaChatSbj.next(c);
    });
  }

  public verificaAtivos(IdUsr: string): void {
    this.chat.getContatoSessao(IdUsr).subscribe((c) => {
      this.util.debug('Ativos', c);
      this.VerificaAtivosSbj.next(c);
    });
  }

  public verificaEspera(): void {
    this.chat.getContatoEspera().subscribe((c) => {
      this.util.debug('Espera', c);
      this.VerificaEsperaSbj.next(c);
    });
  }

  public verificaContatos(IdUsr: string, Permissao: string): void {
    if (Permissao == '3') {
      this.chat.getContatoUsrLight(IdUsr).subscribe((c: Contato[]) => {
        this.util.debug('Cosulta Contato', c);
        this.VerificaContatoSbj.next(c);
      });
    } else {
      this.chat.getContatoLight().subscribe((c) => {
        this.VerificaContatoSbj.next(c);
      });
    }
  }

  public verificaConversas(Usr: Usuario, tp: number): Subscription {
    this.util.debug('Inicia Check-Conversa', this.CurrentContato.IdContato);
    return this.intevalConversas
      .pipe(takeWhile((x) => this.CurrentIdContato > 0))
      .subscribe(
        (next) => {
          this.util.debug('Check', next);
          let cont = 0;
          const par: Conversa = !this.UltimaConversa
            ? new Conversa()
            : this.UltimaConversa;
          if (
            this.TipoChatClass.IdContato > 0 &&
            this.TipoChatClass.TipoChat == tp
          ) {
            this.chat
              .CheckConversa(par)
              .pipe(exhaustMap(async (x) => x))
              .subscribe((x) => {
                console.log(
                  'Consulta Convesa:',
                  x.response,
                  this.contAtu,
                  this.CurrentIdContato
                );
                if (x.response === true || this.contAtu > 20) {
                  if (this.CurrentIdContato > 0) {
                    this.chat
                      .getContatoId(this.CurrentIdContato.toString())
                      .pipe(exhaustMap(async (y) => y))
                      .subscribe((cont) => {
                        this.contAtu = 0;
                        const UltimaMsgCheck: number =
                          cont.Conversa.length > 0
                            ? cont.Conversa[0].IdConversa
                            : 0;

                        if (this.CurrentIdContato == cont.IdContato) {
                          //  if (UltimaMsgCheck !== this.UltimaMsg || this.contAtu > 30) {
                          this.UltimaMsg = UltimaMsgCheck;
                          this.UltimaConversa =
                            cont.Conversa.length > 0
                              ? cont.Conversa[0]
                              : new Conversa();
                          this.util.debug('Check Tp:', this.TipoChat);
                          switch (this.TipoChat.toString()) {
                            case '1':
                              this.util.debug(
                                'Atualiza Contato',
                                cont.Conversa.length
                              );
                              this.VerificaConversasContatosSbj.next(
                                cont.Conversa
                              );
                              break;

                            case '2':
                              this.util.debug(
                                'Atualiza Ativos',
                                cont.Conversa.length
                              );
                              this.VerificaConversasAtivosSbj.next(
                                cont.Conversa
                              );
                              break;

                            case '3':
                              this.util.debug(
                                'Atualiza Espera',
                                cont.Conversa.length
                              );
                              this.VerificaConversasEsperaSbj.next(
                                cont.Conversa
                              );
                              break;

                            default:
                              this.util.debug(
                                'Atualiza defaut',
                                cont.Conversa.length
                              );
                              this.VerificaConversasEsperaSbj.next(
                                cont.Conversa
                              );
                              this.VerificaConversasAtivosSbj.next(
                                cont.Conversa
                              );
                              this.VerificaConversasContatosSbj.next(
                                cont.Conversa
                              );
                              break;
                          }

                          // }
                        }
                      });
                  }
                }
                this.contAtu++;
              });
          }
        },
        (erro) => {
          this.util.debug('erro Intervalo:', erro);
        },
        () => {
          this.util.debug('Fim Intervalo!');
        }
      );
  }
}
