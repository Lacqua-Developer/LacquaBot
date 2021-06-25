import { ChatProducaoModule } from './../chat-producao/chat-producao.module';
import { LoginModule } from './login/login.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import {  MatSidenavModule } from '@angular/material/sidenav';
import {  MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [HomeComponent,
                 HeaderComponent,
                 FooterComponent,
                 MenuComponent],
  imports: [
    MatListModule,
    MatIconModule,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    LoginModule,
    MatButtonModule,

    ChatProducaoModule
  ],
  exports: [

    MatSidenavModule,
    MatToolbarModule,
    HomeComponent
  ]
})
export class HomeModule { }
