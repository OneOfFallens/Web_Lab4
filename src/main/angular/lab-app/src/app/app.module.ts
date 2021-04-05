import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import {CanvasComponent} from "./components/canvas/canvas.component";
import {TableComponent} from "./components/table/table.component";
import {WelcomeCardComponent} from "./components/welcome-card/welcome-card.component";
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {ToolbarModule} from 'primeng/toolbar';
import {AuthService} from './services/auth.service';
import {HitService} from './services/hit.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {PasswordModule} from 'primeng/password';
import {TableModule} from 'primeng/table';
import {ListboxModule} from 'primeng/listbox';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {CheckboxModule} from 'primeng/checkbox';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    MainPageComponent,
    CanvasComponent,
    WelcomeCardComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    PanelModule,
    ToolbarModule,
    HttpClientModule,
    PasswordModule,
    TableModule,
    ListboxModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    ToastModule,
    CheckboxModule,
    SliderModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
  ],
  providers: [  AuthService,
    HitService,
    HttpClient,
    MessageService,
    {
      provide: 'loginUrl',
      useValue: '/api/auth/login'
    },
    {
      provide: 'registerUrl',
      useValue: '/api/auth/register'
    },
    {
      provide: 'hitsUrl',
      useValue: '/api/hits'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
