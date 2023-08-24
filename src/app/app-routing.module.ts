import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './Comp/contact/contact.component';
import { BuyComponent } from './Comp/buy/buy.component';
import { SellComponent } from './Comp/sell/sell.component';
import { ConfirmComponent } from './Comp/confirm/confirm.component';
import { AuthComponent } from './Comp/auth/auth.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './Comp/home/home.component';

export const general: Routes = [
  { path: "home", component: HomeComponent },
    { path: "", component: HomeComponent },
  ];

export const auth: Routes = [
{ path: "login", component: AuthComponent },
  { path: "register", component: AuthComponent },
  { path: "logout", component: AuthComponent }
];

export const contact: Routes = [
  { path: "contact", component: ContactComponent },
  { path: "confirm/:user", component: ConfirmComponent },
  { path: "verify/:user/:pageType", component: ConfirmComponent },
  {path: "meetings/:user", component: HomeComponent}
];
// export const confrim: Routes = [
//   { path: "confirm/:user", component: ConfirmComponent }
// ]

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
    RouterModule.forRoot(sell),
    // RouterModule.forRoot(confrim),
    RouterModule.forRoot(auth),
    RouterModule.forRoot(general),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
