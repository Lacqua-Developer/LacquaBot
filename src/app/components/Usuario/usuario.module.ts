import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { UsuarioService } from './usuario.service';
import { USUARIO_ROUTES } from './usuario.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(USUARIO_ROUTES)
  ],
  declarations: [
    UsuarioListComponent,
    UsuarioEditComponent
  ],
  providers: [UsuarioService],
  exports: []
})
export class UsuarioModule { }
