import { Routes } from '@angular/router';
import { TextoSugestaoListComponent } from './texto-sugestao-list/texto-sugestao-list.component';
import { TextoSugestaoEditComponent } from './texto-sugestao-edit/texto-sugestao-edit.component';

export const TEXTOSUGESTAO_ROUTES: Routes = [
  {
    path: 'textoSugestaos',
    component: TextoSugestaoListComponent
  },
  {
    path: 'textoSugestaos/:id',
    component: TextoSugestaoEditComponent
  }
];
