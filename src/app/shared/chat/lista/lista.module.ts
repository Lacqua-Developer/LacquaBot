import { GroupByPipe } from './../../../pipes/group-by.pipe';
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
import { MatIconModule } from '@angular/material/icon'
import { MyFilterPipe } from 'src/app/pipes/my-filter.pipe';
import {MatExpansionModule} from '@angular/material/expansion';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [ListaComponent,
                 ListaAgendaComponent,
                 ListaSeguimentoComponent,
                 ListaDefaultComponent,
                 ListaChipComponent,
                 MyFilterPipe,
                 GroupByPipe],
  imports: [

    CommonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule,
    FormsModule,
    SharedComponentsModule,
    MatIconModule,
    MatExpansionModule,
    ScrollingModule  ],
  exports:[ListaComponent,
          MatToolbarModule,
          MatTooltipModule,
          MatDialogModule,
          MatIconModule,
          MyFilterPipe,
          GroupByPipe,
          MatExpansionModule,
          ScrollingModule
      ]})
export class ChatListaModule { }
