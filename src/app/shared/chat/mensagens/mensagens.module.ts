import { DialogsModule } from './../../dialogs/dialogs.module';
import { SharedComponentsModule, } from './../../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricoMensagemComponent } from './mensagens.component';
import { MessageAjustComponent } from './message-ajust/message-ajust.component';

@NgModule({
  declarations: [HistoricoMensagemComponent, MessageAjustComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    DialogsModule
  ],
  exports:[HistoricoMensagemComponent,
            SharedComponentsModule,
            DialogsModule],


})
export class ChatMensagensModule { }
