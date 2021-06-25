import { Component, OnInit } from '@angular/core';
import { ContatoFilter } from '../contato-filter';
import { ContatoService } from '../contato.service';
import { Contato } from '../contato';

@Component({
  selector: 'app-contato',
  templateUrl: 'contato-list.component.html',
  styleUrls: ['contato-list.component.scss']
})
export class ContatoListComponent implements OnInit {

  filter = new ContatoFilter();
  selectedContato: Contato;
  feedback: any = {};

  get contatoList(): Contato[] {
    return this.contatoService.contatoList;
  }

  constructor(private contatoService: ContatoService) {
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.contatoService.load(this.filter);
  }

  select(selected: Contato): void {
    this.selectedContato = selected;
  }

  delete(contato: Contato): void {
    if (confirm('Are you sure?')) {
      this.contatoService.delete(contato).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.search();
          }, 1000);
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
        }
      );
    }
  }
}
