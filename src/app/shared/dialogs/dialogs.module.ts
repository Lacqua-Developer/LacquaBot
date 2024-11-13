
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogsComponent } from './dialogs.component';
import { AbreAtendimentoComponent } from './abre-atendimento/abre-atendimento.component';
import { FechaAtendimentoComponent } from './fecha-atendimento/fecha-atendimento.component';
import { TransfereAtendimentoComponent } from './transfere-atendimento/transfere-atendimento.component';
import { ClienteDetalheComponent } from './cliente-detalhe/cliente-detalhe.component';
import { SugestaoDialogComponent } from './texto-sugestao/texto-sugestao.component';
import { MatFormFieldModule}  from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { FormsModule } from '@angular/forms';
import { PlayMediaComponent } from './play-media/play-media.component'
@NgModule({
  declarations: [DialogsComponent,
                 AbreAtendimentoComponent,
                 FechaAtendimentoComponent,
                 TransfereAtendimentoComponent,
                 ClienteDetalheComponent,
                 SugestaoDialogComponent,
                 PlayMediaComponent],
  imports: [
      CommonModule,
      MatFormFieldModule,
      MatSelectModule,
      FormsModule

  ],
  exports:[ DialogsComponent,
            AbreAtendimentoComponent,
            FechaAtendimentoComponent,
            TransfereAtendimentoComponent,
            ClienteDetalheComponent,
            SugestaoDialogComponent,
            MatSelectModule,
            PlayMediaComponent
          ]
})
export class DialogsModule { }
