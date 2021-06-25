import { Usuario } from './../../models/usuario';
import { CoreService } from './../../services/core.service';
import { ListaChat } from 'src/app/models/ListaChat';
import { Store } from '@ngrx/store';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ChatState, LoginState } from 'src/app/store/interfaces/states';

@Component({
  selector: 'app-chat-producao',
  templateUrl: './chat-producao.component.html',
  styleUrls: ['./chat-producao.component.scss'],
})
export class ChatProducaoComponent implements OnInit {
  public contatosEspera: number;
  public contatosAtivos: number;
  public usr: Usuario;

  constructor(private store: Store<ChatState>,
    private storeLogin: Store<LoginState>,
    private core: CoreService) {
    this.store.select<any>('chatAtivos').subscribe((state) => {
      let contatos: ListaChat[] = state['chat'];
      this.contatosAtivos =
        contatos != null || contatos != undefined ? contatos.length : 0;
    });

    this.store.select<any>('chatEspera').subscribe((state) => {
      let contatos: ListaChat[] = state['chat'];
      this.contatosEspera =
        contatos != null || contatos != undefined ? contatos.length : 0;
    });
  }

  ngOnDestroy(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  zeraContato(): void {}

  ngOnInit(): void {
    this.storeLogin.select<any>('login').subscribe( (state) => {
      this.usr = state['usuario'];
      this.core.Inicializa(this.usr);
    })

  }
}
