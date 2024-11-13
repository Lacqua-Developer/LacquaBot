import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContatoListComponent } from './contato-list/contato-list.component';
import { ContatoEditComponent } from './contato-edit/contato-edit.component';
import { ContatoService } from './contato.service';
import { CONTATO_ROUTES } from './contato.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(CONTATO_ROUTES)
  ],
  declarations: [
    ContatoListComponent,
    ContatoEditComponent
  ],
  providers: [ContatoService],
  exports: []
})
export class ContatoModule { }
