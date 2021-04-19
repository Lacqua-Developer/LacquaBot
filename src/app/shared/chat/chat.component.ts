import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Config } from 'src/app/models/config';
import { Contato } from 'src/app/models/contato';
import { Usuario } from 'src/app/models/usuario';
import { CoreService } from 'src/app/services/core.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges  {

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.IdContatoSelecao = 0;
    this.ContatoSelecao = new Contato();
  }

  public IdContatoSelecao = 0;
  public ContatoSelecao: Contato = new Contato();

  @Input() TipoChat: string;

  eventsSubject: Subject<Contato> = new Subject<Contato>();

  emitEventToChild() {}

  ngOnInit(): void {
    //this.util.debug('Tipochat:', this.TipoChat);
  }

  selecionaContato(event: Contato): void {
    console.log('Contato Selecionado:', event, this.TipoChat);
    this.IdContatoSelecao = event.IdContato;
    this.ContatoSelecao = event;
    this.eventsSubject.next(event);
  }
}
