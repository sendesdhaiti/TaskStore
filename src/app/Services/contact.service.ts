import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../Comp/contact/contact.component';
import { environment_dev as env } from 'src/environments/environment.development';
import { isDevMode } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) {
    if(isDevMode()){
      this.API = env.localhost_api
    }else{
      this.API = env.prod_api
    }
   }
  API:string
  Contact_endpoint = "api/Contact/"
  ACN_INTEREST_ENDPOINT = "send-email-message"

  SendEmailMessage(Contact:Contact, typeOfMessage:string){
    if(typeOfMessage == "BI"){
      return this.http.post<boolean>(this.API + this.Contact_endpoint + this.ACN_INTEREST_ENDPOINT, Contact)
    }
    else if(typeOfMessage == "GI"){
      return this.http.post<boolean>(this.API + this.Contact_endpoint + this.ACN_INTEREST_ENDPOINT, Contact)
    }else{
      return this.http.post<boolean>(this.API + this.Contact_endpoint + this.ACN_INTEREST_ENDPOINT, Contact)
    }
  }
}
