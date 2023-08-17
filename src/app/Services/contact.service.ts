import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../Comp/contact/contact.component';
import { environment_prod as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }
  API = env.prod_api
  Contact_endpoint = "api/Contact/"

  SendEmailMessage(Contact:Contact, typeOfMessage:string){
    if(typeOfMessage == "BI"){
      return this.http.post<boolean>(this.API + this.Contact_endpoint, Contact)
    }
    else if(typeOfMessage == "GI"){
      return this.http.post<boolean>(this.API + this.Contact_endpoint, Contact)
    }else{
      return this.http.post<boolean>(this.API + this.Contact_endpoint, Contact)
    }
  }
}
