import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Contact } from '../Comp/contact/contact.component';
import { ContactService, MeetingTime, _meetingTimes } from './contact.service';
import { Account, AuthService } from './auth.service';
import { Auth } from '../Comp/auth/auth.component';
import { MSEncrypt, NextFormProcess } from '../Operations/operations';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    public encrypt: MSEncrypt,
    private router: Router,
    private NextFormProcess: NextFormProcess,
    private contact: ContactService,
    private auth: AuthService,
    private jwtHelper: JwtHelperService) {
    this.Contact = new BehaviorSubject<Contact>({})
    this.Account = new BehaviorSubject<Account | undefined>(undefined)
    this.Auth = new BehaviorSubject<Auth>(Auth.Login)
    this.MeetingTimes = new BehaviorSubject<MeetingTime[]>([])
    this.Storage = new BehaviorSubject<Storage>({ Account: {}, MeetingTimes: [] })
    this._isUserAuthenticated = new BehaviorSubject<boolean>(false)
  }
  Storage: BehaviorSubject<Storage>
  #storageStr = "MS"
  Contact: BehaviorSubject<Contact>
  Account: BehaviorSubject<Account | undefined>
  MeetingTimes: BehaviorSubject<MeetingTime[]>
  Auth: BehaviorSubject<Auth>
  _isUserAuthenticated: BehaviorSubject<boolean>

  isUserAuthenticated = (): boolean => {
    let a = this.Account.value
    if(a){
      const token = a.token;
      if (token && !this.jwtHelper.isTokenExpired(token)) {
        return true;
      }
    }
    return false;
  }
  setMeetingTimes(mt?: MeetingTime[]) {
    if (mt) {
      this.Storage.next({ Account: this.Storage.value.Account, MeetingTimes: mt })
    }
    sessionStorage.setItem(this.#storageStr, JSON.stringify(this.Storage.value))
  }
  setStorage(account?: Account, meetingTimes?: MeetingTime[]) {
    if (account) {
      this.Storage.next({ Account: account, MeetingTimes: this.Storage.value.MeetingTimes })
    }
    if (meetingTimes) {
      this.Storage.next({ Account: this.Storage.value.Account, MeetingTimes: meetingTimes })
    }
    sessionStorage.setItem(this.#storageStr, JSON.stringify(this.Storage.value))
    // this.GETSTORAGE()
  }

  GETSTORAGE() {
    let a = this.Account.value
    if (!a) {
      let s = sessionStorage.getItem(this.#storageStr)
      let t = JSON.parse(s ?? "")
      this.setStorage(t.Account, t.MeetingTimes)
      this.Account.next(this.Storage.value.Account)
      this.MeetingTimes.next(this.Storage.value.MeetingTimes ?? [])
      if (!this.isUserAuthenticated()) {
        // this.Route('/login')
        // this.setStorage({}, [])

      }
      // this.Account.next(this.Storage.value.Account)
    }

  }

  StartNextFormProcess(show: string[], hide: string[]) {
    this.NextFormProcess.nextFormInputProcess(show, "show")
    this.NextFormProcess.nextFormInputProcess(hide, "hide")
  }
  Route(goTo: string) {
    this.router.navigate(["/" + goTo])
  }
  setContact(Contact: Contact) {
    this.Contact.next(Contact)
  }
  setAccount(account: Account) {
    this.Account.next(account)
  }
  setAuthPage(auth: Auth) {
    this.Auth.next(auth)
  }


  GETACCOUNT() {
    return this.Account.pipe()
  }

  GETACCOUNT_VAL() {
    return this.Account.value
  }
  GETAUTHPAGE() {
    return this.Auth.pipe()
  }

  GETCONTACT() {
    return this.Contact.pipe()
  }

  __updateAccount(account: Account) {
    return this.auth.updateAccount(this.Account.value?.email ?? "", account)
  }

  __verifyAccount(email: string, code: number, v_or_c: boolean) {
    return this.auth.verifyAccount(email, code, v_or_c)
  }

  __checkusername(username: string) {
    return this.auth.checkUsername(username)
  }

  __checkemail(email: string) {
    return this.auth.checkEmail(email)
  }

  __deleteAccount(email: string) {
    let e: string
    if (this.Account.value?.email?.toLowerCase() == email.toLowerCase()) {
      e = email
    } else {
      e = ""
    }
    return this.auth.deleteAccount(e)
  }

  __sendBI() {
    return this.contact.SendEmailMessage(this.Contact.value, "BI")
  }

  __login(account: Account) {
    return this.auth.login(account)
  }

  __register(account: Account) {
    return this.auth.register(account)
  }

  __sendEmailMeetingConfirmation(email: string, confirm: boolean, code: number, date: string, v2_or_client: boolean, time: MeetingTime) {
    return this.contact.SendEmailMeetingConfirmation(email, confirm, code, date, v2_or_client, time)
  }

  __addMeetingTimes(o: _meetingTimes) {
    return this.contact.AddMeetingTimes(o)
  }
  __newCode(email: string, v2_or_client: boolean) {
    return this.contact.newCode(email, v2_or_client)
  }

  __getMeetingTimes(email: string, v2_or_client_Encryption: boolean, get_all:string) {
    return this.contact.GetMeetingTimes(email, v2_or_client_Encryption, get_all)
    // .pipe(map(x=>{
    //   let o =[]
    //   this.setStorage(undefined,x)
    //   for(let i = 0; i < x.length - 1; i++){
    //     if(x[i].frequency?.valueOf() == 0){
    //       o.push(x[i])
    //     }
    //   }
    //   if(o.length > 0){
    //     return o
    //   }
    //   return x
    // }))
  }


}

class Storage {
  Account: Account | undefined
  MeetingTimes: MeetingTime[] | undefined
}