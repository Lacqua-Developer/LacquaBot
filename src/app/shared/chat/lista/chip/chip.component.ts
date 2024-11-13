import { Usuario } from './../../../../models/usuario';
import { Config } from 'src/app/models/config';
import { ChatState } from './../../../../store/interfaces/states';
import { ListaChat } from './../../../../models/ListaChat';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-lista-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ListaChipComponent implements OnInit {

  constructor(private store: Store<ChatState>) {

  }

  @Input() srcCont: string;
  @Input() TipoChat: number;
  @Input() cfg: Config;


  public contatos: ListaChat[] =[];
  public loading: any;
  public error: any;
  public user: Usuario;

  @Input() lista: string;

  ngOnInit(): void {

     this.store
    .select<any> (this.lista)
    .subscribe((state  => {
      this.contatos = state['chat'];
    }));

    this.store
    .select<any> ('login')
    .subscribe((state  => {
      this.user = state['usuario'];
      console.log('Usuario Logado:', this.user);
    } ));


  }
}
