import { WebsocketService } from './websocket.service';
import { UtilService } from './util.service';
import { Usuario } from '../models/usuario';
import { ChatService } from './chat.service';
import { Conversa } from '../models/conversa';
import { Subject,  Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { Contato } from '../models/contato';
import { TPChat } from '../models/tipo-chat';
import { ListaChat } from '../models/ListaChat';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(
    private chat: ChatService,
    private util: UtilService,
    private ws: WebsocketService
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

  private SubscrAtv: Subscription;
  private SubscrCont: Subscription;
  private SubscrEsp: Subscription;

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

    this.IniciaServAtv(Usr);
    this.IniciaServCont(Usr);
    this.IniciaServEsp(Usr);

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


}
