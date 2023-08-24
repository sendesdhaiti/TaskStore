import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/Services/auth.service';
import { DataService } from 'src/app/Services/data.service';
import { ValidateEmail } from '../contact/contact.component';
import { wait_Forsec_then_return_undefined } from 'src/app/Operations/operations';
import { Router } from '@angular/router';
import { MeetingTime } from 'src/app/Services/contact.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(private data: DataService, private route: Router) {
    this.$Auth = Auth.Login
    this.Account = new Account()
  }

  Auth: Observable<Auth> | undefined
  $Account: Observable<Account | undefined> | undefined
  Account: Account
  setTimeout_Time = 2500
  $Auth: Auth
  msgs: any = {
    "email": undefined,
    "fn": undefined,
    "ln": undefined,
    "username": undefined,
    "password": undefined,
    "response": undefined,
    "saved": undefined
  }

  changeTab(type: Auth) {
    this.$Auth = type;
    this.data.setAuthPage(this.$Auth)
  }
  check_if_loggedin(account: Account | undefined) {
    if (account?.email) {
      this.changeTab(2)
    } else {
      this.changeTab(0)
    }
  }
  logOut() {
    this.data.setAccount({})
    this.changeTab(0)
  }

  backToHome() {
    this.route.navigate(['/portal'])
  }



  login() {
    if(!ValidateEmail(this.Account.email)){
      this.msgs.email = "Your email cannot be empty."
      setTimeout(()=>{this.msgs.email = undefined}, this.setTimeout_Time)
      return;
    }
    if (this.Account.password == undefined || this.Account.password == "" ) {
      this.msgs.password = "Your password cannot be empty."
      setTimeout(()=>{this.msgs.password = undefined}, this.setTimeout_Time)
      return;
    }
    if (ValidateEmail(this.Account.email)) {
      const s = this.data.__login(this.Account).subscribe(x => {
        console.log(x)
        this.data.setAccount(x[0] ?? {})
        this.msgs.response = x[1]
        setTimeout(()=>{this.msgs.response = undefined}, this.setTimeout_Time)
      }, o => {
        console.log(JSON.stringify(o.error[1]))
        this.data.setAccount({})
        this.msgs.response = o.error[1]
        setTimeout(()=>{this.msgs.response = undefined}, this.setTimeout_Time)
      })

      if (s) {
        setTimeout(() => {
          s.unsubscribe()
        }, this.setTimeout_Time * 2)
      }
    } else {
      this.msgs.response = "Your email is not valid."
      setTimeout(()=>{this.msgs.response = undefined}, this.setTimeout_Time)
      return;
    }
  }

  register() {
    if (!this.Account.email) {
      this.msgs.email = "Your email cannot be empty."
      setTimeout(()=>{this.msgs.email = undefined}, this.setTimeout_Time)
      return;
    }
    if (!this.Account.username) {
      this.msgs.username = "Your username cannot be empty."
      setTimeout(()=>{this.msgs.username = undefined}, this.setTimeout_Time)
      return;
    }
    if (!this.Account.password) {
      this.msgs.password = "Your password cannot be empty."
      setTimeout(()=>{this.msgs.password = undefined}, this.setTimeout_Time)
      return;
    }
    if (!this.Account.firstname) {
      this.msgs.firstname = "Your first name cannot be empty."
      setTimeout(()=>{this.msgs.firstname = undefined}, this.setTimeout_Time)
      return;
    }
    if (!this.Account.lastname) {
      this.msgs.lastname = "Your last name cannot be empty."
      setTimeout(()=>{this.msgs.lastname = undefined}, this.setTimeout_Time)
      return;
    }
    if (ValidateEmail(this.Account.email) && this.Account.password && this.Account.username) {
      const s = this.data.__register(this.Account).subscribe(x => {
        console.log(x)
        if (x.length > 1) {
          this.data.setAccount({})
          this.msgs.saved = JSON.stringify(x[0])
          this.msgs.response = JSON.stringify(x[1])
          setTimeout(()=>{this.msgs.response = undefined}, this.setTimeout_Time)
        } else {
          this.data.setAccount({})
          this.msgs.saved = JSON.stringify(x[0])
          this.msgs.response = JSON.stringify(x[1])
          setTimeout(()=>{this.msgs.response = undefined}, this.setTimeout_Time)
        }
      }, o => {
        console.log(o.error)
        this.data.setAccount({})
        this.msgs.saved = o.error[0]
        this.msgs.response = o.error[1]
        setTimeout(()=>{this.msgs.response = undefined}, this.setTimeout_Time)
      })

      if (s) {
        setTimeout(() => {
          s.unsubscribe()
        }, this.setTimeout_Time * 2)
      }
    } else {
      this.msgs.response = "One of the fields have not been completed."
      setTimeout(()=>{this.msgs.response = undefined}, this.setTimeout_Time)
      return;
    }
  }
  ngOnInit(): void {
    this.Auth = this.data.GETAUTHPAGE()
    this.Auth.subscribe(x => {
      this.$Auth = x
    })

    this.$Account = this.data.GETACCOUNT()
    if (this.$Account) {
      this.$Account.subscribe(x => {
        this.check_if_loggedin(x)
      })
    }

  }



}

export enum Auth {
  Login,
  Register,
  Logout
}