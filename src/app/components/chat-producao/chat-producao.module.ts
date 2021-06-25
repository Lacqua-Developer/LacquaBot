import { ChatModule } from './../../shared/chat/chat.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatProducaoComponent } from './chat-producao.component'
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [ ChatProducaoComponent ],
  imports: [
    CommonModule,
    MatTabsModule,
    ChatModule
  ],
  exports:[
    ChatProducaoComponent
  ]
})
export class ChatProducaoModule { }
