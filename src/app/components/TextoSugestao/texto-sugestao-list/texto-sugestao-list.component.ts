import { Component, OnInit } from '@angular/core';
import { TextoSugestaoFilter } from '../texto-sugestao-filter';
import { TextoSugestaoService } from '../texto-sugestao.service';
import { TextoSugestao } from '../texto-sugestao';

@Component({
  selector: 'app-texto-sugestao',
  templateUrl: 'texto-sugestao-list.component.html'
})
export class TextoSugestaoListComponent implements OnInit {

  filter = new TextoSugestaoFilter();
  selectedTextoSugestao: TextoSugestao;
  feedback: any = {};

  get textoSugestaoList(): TextoSugestao[] {
    return this.textoSugestaoService.textoSugestaoList;
  }

  constructor(private textoSugestaoService: TextoSugestaoService) {
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.textoSugestaoService.load(this.filter);
  }

  select(selected: TextoSugestao): void {
    this.selectedTextoSugestao = selected;
  }

  delete(textoSugestao: TextoSugestao): void {
    if (confirm('Are you sure?')) {
      this.textoSugestaoService.delete(textoSugestao).subscribe(() => {
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
