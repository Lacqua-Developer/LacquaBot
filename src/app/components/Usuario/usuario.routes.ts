import { Routes } from '@angular/router';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';

export const USUARIO_ROUTES: Routes = [
  {
    path: 'usuarios',
    component: UsuarioListComponent
  },
  {
    path: 'usuarios/:id',
    component: UsuarioEditComponent
  }
];
