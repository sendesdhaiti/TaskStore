import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from '../Comp/contact/contact.component';
import { ContactService, MeetingTime, _meetingTimes } from './contact.service';
import { Account, AuthService } from './auth.service';
import { Auth } from '../Comp/auth/auth.component';
import { MSEncrypt, NextFormProcess } from '../Operations/operations';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( 
    public encrypt:MSEncrypt,
    private router:Router,
    private NextFormProcess:NextFormProcess,
    private contact: ContactService,
    private auth: AuthService) { 
    this.Contact = new  BehaviorSubject<Contact>({})
    this.Account =  new BehaviorSubject<Account | undefined>(undefined)
    this.Auth =  new BehaviorSubject<Auth>(Auth.Login)
    this.MeetingTimes = new BehaviorSubject<MeetingTime[]>([])
  }
  Contact: BehaviorSubject<Contact>
  Account: BehaviorSubject<Account | undefined>
  MeetingTimes:BehaviorSubject<MeetingTime[]>
  Auth:BehaviorSubject<Auth>

  StartNextFormProcess(show:string[], hide:string[]){
    this.NextFormProcess.nextFormInputProcess(show, "show")
    this.NextFormProcess.nextFormInputProcess(hide, "hide")
  }
  Route(goTo:string){
    this.router.navigate(["/" + goTo])
  }
  setContact(Contact: Contact){
    this.Contact.next(Contact)
  }
  setAccount(account:Account){
    this.Account.next(account)
  }
  setAuthPage(auth:Auth){
    this.Auth.next(auth)
  }

  GETACCOUNT(){
    return this.Account.pipe()
  }

  GETACCOUNT_VAL(){
    return this.Account.value
  }
  GETAUTHPAGE(){
    return this.Auth.pipe()
  }

  GETCONTACT(){
    return this.Contact.pipe()
  }

  __updateAccount(account:Account){
    return this.auth.updateAccount(this.Account.value?.email ?? "", account)
  }

  __verifyAccount(email:string, code:number, v_or_c:boolean){
    return this.auth.verifyAccount(email, code, v_or_c)
  }

  __checkusername(username:string){
    return this.auth.checkUsername(username)
  }

  __checkemail(email:string){
    return this.auth.checkEmail(email)
  }

  __deleteAccount(email:string){
    let e:string
    if(this.Account.value?.email?.toLowerCase() == email.toLowerCase()){
      e = email
    }else{
      e = ""
    }
    return this.auth.deleteAccount( e)
  }

  __sendBI(){
    return this.contact.SendEmailMessage(this.Contact.value, "BI")
  }

  __login(account:Account){
    return this.auth.login(account)
  }

  __register(account:Account){
    return this.auth.register(account)
  }

  __sendEmailMeetingConfirmation(email:string, confirm:boolean, code:number, date:string, v2_or_client:boolean){
    return this.contact.SendEmailMeetingConfirmation(email, confirm, code, date, v2_or_client)
  }

  __addMeetingTimes(o:_meetingTimes){
    return this.contact.AddMeetingTimes(o)
  }
  __newCode(email:string, v2_or_client:boolean){
    return this.contact.newCode(email, v2_or_client)
  }

  __getMeetingTimes(email:string, v2_or_client_Encryption:boolean){
    return this.contact.GetMeetingTimes(email, v2_or_client_Encryption)
  }


}
