import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Config } from 'src/app/models/config';
import { ListaChat } from 'src/app/models/ListaChat';
import { Usuario } from 'src/app/models/usuario';
import { ChatState } from 'src/app/store/interfaces/states';

@Component({
  selector: 'app-lista-seguimento',
  templateUrl: './seguimento.component.html',
  styleUrls: ['./seguimento.component.scss']
})
export class ListaSeguimentoComponent implements OnInit {

  constructor(private store: Store<ChatState>) {

  }

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
      console.log('Lista Chip:', this.contatos);
    } ));

    this.store
    .select<any> ('login')
    .subscribe((state  => {
      this.user = state['usuario'];
      console.log('Usuario Logado:', this.user);
    } ));
  }

}
