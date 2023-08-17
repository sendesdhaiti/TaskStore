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

@NgModule({
  declarations: [
    AppComponent,
    BuyComponent,
    SellComponent,
    NavComponent,
    FooterComponent,
    ContactComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TitleCasePipe, HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MonitorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
