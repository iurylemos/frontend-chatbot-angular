import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, NO_ERRORS_SCHEMA } from '@angular/core';
import localePt from "@angular/common/locales/pt";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './guards/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './guards/jwt.interceptor';
import { ErrorInterceptor } from './guards/error.interceptor';
import { registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatbotService } from './guards/chatbot.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    ChatbotService,
    { provide: LOCALE_ID, useValue: 'pt' } ,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
registerLocaleData(localePt);
