import { Usuario } from './../../models/usuario';
import { ChatState } from './../../store/interfaces/states';
import { Store } from '@ngrx/store';
import { CoreService } from './../../services/core.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { Contato } from 'src/app/models/contato';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges  {

  constructor(private core: CoreService,
              private store: Store<ChatState>) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.IdContatoSelecao = 0;
    this.ContatoSelecao = new Contato();
  }

  public IdContatoSelecao = 0;
  public ContatoSelecao: Contato = new Contato();
  public usr: Usuario;

  @Input() TipoChat: string;

  eventsSubject: Subject<Contato> = new Subject<Contato>();

  emitEventToChild() {}

  ngOnInit(): void {

    this.store
    .select<any> ('login')
    .subscribe((state  => {
      this.usr =  state['usuario'];
     } ));

     console.log( 'Tipo Chat:', ' Form Comp', this.TipoChat)

  }

  selecionaContato(event: Contato): void {
/*  console.log('Contato Selecionado:', event, this.TipoChat);
    this.IdContatoSelecao = event.IdContato;
    this.ContatoSelecao = event;
    this.eventsSubject.next(event); */
  }
}
