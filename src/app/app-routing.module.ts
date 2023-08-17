import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './Comp/contact/contact.component';
import { BuyComponent } from './Comp/buy/buy.component';
import { SellComponent } from './Comp/sell/sell.component';

export const contact: Routes = [
  { path: "contact", component: ContactComponent }
];

export const buy: Routes = [
  { path: "store", component: BuyComponent }
];

export const sell: Routes = [
  { path: "portal", component: SellComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(contact),
    RouterModule.forRoot(buy),
    RouterModule.forRoot(sell)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
