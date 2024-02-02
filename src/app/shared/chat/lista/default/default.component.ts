import { CoreService } from './../../../../services/core.service';
import { SelecionaContatoChatEspera } from './../../../../store/actions/chat-espera.actions';
import { SelecionaContatoChatContato } from './../../../../store/actions/chat-contatos.actions';
import { ChatMessageState } from './../../../../store/interfaces/states';
import { Component, Input, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Config } from 'src/app/models/config';
import { ListaChat } from 'src/app/models/ListaChat';
import { Usuario } from 'src/app/models/usuario';
import { ChatState } from 'src/app/store/interfaces/states';
import { SelecionaContatoChatAtivos } from 'src/app/store/actions';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],

})
export class ListaDefaultComponent implements OnInit {

  constructor(
    private store: Store<ChatState>,
    private storeMsg: Store<ChatMessageState>,
    private core: CoreService
    ) { }

  @Input() srcCont: string;
  @Input() cfg: Config;
  @Input() lista: string;

  public contatos: ListaChat[] =[];
  public loading: any;
  public error: any;
  public user: Usuario;

  ngOnInit(): void {

     this.store
    .select<any> (this.lista)
    .subscribe((state  => {
      this.contatos = state['chat'];
      if(this.contatos !=null)  console.log('Lista Default:', this.lista,this.contatos);
    } ));

    this.store
    .select<any> ('login')
    .subscribe((state  => {
      this.user = state['usuario'];
    //  console.log('Usuario Logado:',  this.user);
    } ));


  }

  onClick(el: { getAttribute: (arg0: string) => any }): void {
    console.log('Click');

    const messageId = el.getAttribute('data-message-id');
    const messageTel = el.getAttribute('data-message-tel');

    switch(this.lista){
      case  'chatContatos':
        this.storeMsg.dispatch(SelecionaContatoChatContato( { IdContato: messageId }))
        break;

        case 'chatAtivos':
          this.storeMsg.dispatch(SelecionaContatoChatAtivos( { IdContato: messageId }))
          //this.core.CurrentIdContato = +messageId;
          //this.core.verificaConversasStore('chatAtivos', messageId);
          break;

        case 'chatEspera':
          this.storeMsg.dispatch(SelecionaContatoChatEspera( { IdContato: messageId }))
          break;
    }


    console.log('Message Id: ', messageId);
  }

}
