import { SharedComponentsModule } from './../shared.module';
import { ChatMensagensModule } from './mensagens/mensagens.module';
import { ChatListaModule } from './lista/lista.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs'
import {MatGridListModule} from '@angular/material/grid-list';
@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    ChatListaModule,
    ChatMensagensModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule,
    MatTabsModule,
    SharedComponentsModule,
    MatGridListModule],
  exports:[ChatComponent,

  ]
})
export class ChatModule { }
