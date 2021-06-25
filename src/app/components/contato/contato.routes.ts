import { Routes } from '@angular/router';
import { ContatoListComponent } from './contato-list/contato-list.component';
import { ContatoEditComponent } from './contato-edit/contato-edit.component';

export const CONTATO_ROUTES: Routes = [
  {
    path: 'contatoes',
    component: ContatoListComponent
  },
  {
    path: 'contatoes/:id',
    component: ContatoEditComponent
  }
];
