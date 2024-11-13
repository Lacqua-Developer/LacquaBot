import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TextoSugestaoListComponent } from './texto-sugestao-list/texto-sugestao-list.component';
import { TextoSugestaoEditComponent } from './texto-sugestao-edit/texto-sugestao-edit.component';
import { TextoSugestaoService } from './texto-sugestao.service';
import { TEXTOSUGESTAO_ROUTES } from './texto-sugestao.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(TEXTOSUGESTAO_ROUTES)
  ],
  declarations: [
    TextoSugestaoListComponent,
    TextoSugestaoEditComponent
  ],
  providers: [TextoSugestaoService],
  exports: []
})
export class TextoSugestaoModule { }
