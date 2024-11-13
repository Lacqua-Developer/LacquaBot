import { ChatMensagensModule } from './shared/chat/mensagens/mensagens.module';
import { HomeModule } from './components/home/home.module';
import { ChatModule } from './shared/chat/chat.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EffectsModule  } from '@ngrx/effects'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { appReducers } from './store/app-reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsArray } from './store/effects/index';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [AppComponent],
  imports: [
    ChatMensagensModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HomeModule,
    ChatModule,
    MatDialogModule,
    StoreModule.forRoot( appReducers ),
    EffectsModule.forRoot( EffectsArray ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
