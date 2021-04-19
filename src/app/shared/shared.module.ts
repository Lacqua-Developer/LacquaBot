import { ImageChatComponent } from './chat/image-chat/image-chat.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextoSugestaoComponent } from './texto-sugestao/texto-sugestao.component';

@NgModule({
  declarations: [
    ImageChatComponent,
    TextoSugestaoComponent,
 ],
  imports: [
    CommonModule
  ],
  exports: [ImageChatComponent,
           TextoSugestaoComponent]

})
export class SharedComponentsModule { }
