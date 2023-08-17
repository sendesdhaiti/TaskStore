import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from '../Comp/contact/contact.component';
import { ContactService } from './contact.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( 
    private contact: ContactService,
    private auth: AuthService) { 
    this.Contact = new  BehaviorSubject<Contact>({})
  }
  Contact: BehaviorSubject<Contact>
  setContact(Contact: Contact){
    this.Contact.next(Contact)
  }

  GETCONTACT(){
    return this.Contact.pipe()
  }

  __sendBI(){
    return this.contact.SendEmailMessage(this.Contact.value, "BI")
  }


}
