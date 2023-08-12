import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuyComponent } from './Comp/buy/buy.component';
import { SellComponent } from './Comp/sell/sell.component';
import { NavComponent } from './Comp/nav/nav.component';
import { FooterComponent } from './Comp/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    BuyComponent,
    SellComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
