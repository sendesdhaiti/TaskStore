import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TitleCasePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuyComponent } from './Comp/buy/buy.component';
import { SellComponent } from './Comp/sell/sell.component';
import { NavComponent } from './Comp/nav/nav.component';
import { FooterComponent } from './Comp/footer/footer.component';
import { ContactComponent } from './Comp/contact/contact.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MonitorInterceptor } from './Services/Interceptors/monitor.service';
import { ConfirmComponent } from './Comp/confirm/confirm.component';
import { MSEncrypt, NextFormProcess, logGapFormat } from './Operations/operations';
import { environment } from 'src/environments/environment.production';
// import { environment_prod } from 'src/environments/environment.production';
import { isDevMode } from '@angular/core';
import { AuthComponent } from './Comp/auth/auth.component';
import { HomeComponent } from './Comp/home/home.component';
import { Account } from './Services/auth.service';
/**
 * 
 * @returns gets the 
production of localhost domain */
export function set() {
  let _env
  if (isDevMode() == true) {
    _env = environment.localhost_api
  } else {
    _env = environment.prod_api
  }
  return _env
}


@NgModule({
  declarations: [
    AppComponent,
    BuyComponent,
    SellComponent,
    NavComponent,
    FooterComponent,
    ContactComponent,
    ConfirmComponent,
    AuthComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TitleCasePipe, HttpClient, MSEncrypt, logGapFormat, Account, NextFormProcess,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MonitorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
