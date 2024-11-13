import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DialogsModule } from './../../dialogs/dialogs.module';
import { SharedComponentsModule, } from './../../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricoMensagemComponent } from './mensagens.component';
import { MessageAjustComponent } from './message-ajust/message-ajust.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { UploaderComponent } from './uploader/uploader.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [HistoricoMensagemComponent, MessageAjustComponent, UploaderComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    DialogsModule,
    FormsModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    PdfViewerModule
  ],
  exports:[HistoricoMensagemComponent,
            MessageAjustComponent,
            SharedComponentsModule,
            DialogsModule,
            FormsModule,
            MatIconModule],


})
export class ChatMensagensModule { }
