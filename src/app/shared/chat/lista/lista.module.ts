import { ImageChatComponent } from './../image-chat/image-chat.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './lista.component';
import { ListaAgendaComponent } from './agenda/agenda.component';
import { ListaSeguimentoComponent } from './seguimento/seguimento.component';
import { ListaDefaultComponent } from './default/default.component';
import { ListaChipComponent } from './chip/chip.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip'
import { FormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../../shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import {  MatIconModule } from '@angular/material/icon'
import { MyFilterPipe } from 'src/app/pipes/my-filter.pipe';

@NgModule({
  declarations: [ListaComponent,
                 ListaAgendaComponent,
                 ListaSeguimentoComponent,
                 ListaDefaultComponent,
                 ListaChipComponent,
                 MyFilterPipe],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule,
    FormsModule,
    SharedComponentsModule,
    MatIconModule,


  ],
  exports:[ListaComponent,
          MatToolbarModule,
          MatTooltipModule,
          MatDialogModule,
          MatIconModule,
          MyFilterPipe
      ]})
export class ChatListaModule { }
