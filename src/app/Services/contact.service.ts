import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact, ValidateEmail } from '../Comp/contact/contact.component';
import { environment as env } from 'src/environments/environment.production';
import { isDevMode } from '@angular/core';
import { set } from '../app.module';
import { MSEncrypt } from '../Operations/operations';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient, private encrypt: MSEncrypt) {
  }
  API: string = set()
  Contact_endpoint = "api/Contact/"
  ACN_INTEREST_ENDPOINT = "send-email-message"
  ACN_INTEREST_CONFIRM_ENDPOINT = "update-email-confirmation"

  SendEmailMessage(Contact: Contact, typeOfMessage: string) {
    if (typeOfMessage == "BI") {
      return this.http.post<any[]>(this.API + this.Contact_endpoint + this.ACN_INTEREST_ENDPOINT, Contact)
    }
    else if (typeOfMessage == "GI") {
      return this.http.post<any[]>(this.API + this.Contact_endpoint + this.ACN_INTEREST_ENDPOINT, Contact)
    } else {
      return this.http.post<any[]>(this.API + this.Contact_endpoint + this.ACN_INTEREST_ENDPOINT, Contact)
    }
  }
  
  SendEmailMeetingConfirmation(email: string,confirmation: boolean, code: number, date: string, v2_or_client:boolean, time:MeetingTime) {
    
    const ret = {
      "email": email,
      "confirmation": confirmation,
      "code": code,
      "date": date, 
      "v2_or_client":v2_or_client,
      "time":time
    }

    return this.http.put<any[]>(this.API + this.Contact_endpoint + this.ACN_INTEREST_CONFIRM_ENDPOINT, ret)
  }

  newCode(email:string, v2_or_client:boolean ){
    const ret = {
      "encryptedUser": email,
      "v2_or_client_Encryption":v2_or_client
    }

    return this.http.put<any[]>(this.API + this.Contact_endpoint + "new-email-confirmation-code", {},{params:ret})
  }


  CheckEmailConfirmation(email: string) {
    return this.http.get<any>(this.API + this.Contact_endpoint + "check-email-notifications", {
      params: {
        "encryptedUser": this.encrypt.checkEmailThenEncrypt(email)
      }
    })
  }

  GetEmailConfirmations(email: string) {
    return this.http.get<any>(this.API + this.Contact_endpoint + "get-email-confirmations", {
      params: {
        "encryptedUser": this.encrypt.checkEmailThenEncrypt(email)
      }
    })
  }

  AddMeetingTimes(o: _meetingTimes) {

    return this.http.post<any[]>(this.API + this.Contact_endpoint + "portal/add-meeting-time", o)
  }

  UpdateMeetingTimes(o: _meetingTimes) {

    return this.http.put<any[]>(this.API + this.Contact_endpoint + "portal/update-meeting-time", o)
  }

  GetMeetingTimes(email: string, v2_or_client_Encryption:boolean, get_all:string) {
    const h = new HttpHeaders({
      "get_all": get_all
    })
    return this.http.get<MeetingTime[]>(this.API + this.Contact_endpoint + "get-meeting-times", {
      headers:h,
      params: {
        encryptedUser:email,
        v2_or_client_Encryption:v2_or_client_Encryption
      }
    })
  }

  GetMeetingConfirmations(email: string, v2_or_client_Encryption:boolean) {
    return this.http.get<MeetingConfirmation[]>(this.API + this.Contact_endpoint + "portal/get-email-confirmations", {
      params: {
        encryptedUser:email,
        v2_or_client_Encryption:v2_or_client_Encryption
      }
    })
  }


}

export class _meetingTimes {
  email?: string
  times?: MeetingTime[]
}
export class MeetingTime {
  id?: string
  timezone?: string
  url?: string
  host?: string
  hostemail?:string
  frequency: MeetingFrequency = MeetingFrequency.Daily
  day?: string
  time?: string
  added?: Date
  updated?: Date
  creator?: string
}

export enum MeetingFrequency {
  OneTime,
  Daily,
  Weekly,
  BiWeekly,
  Monthly,
  Yearly

}
export class MeetingConfirmation
    {
        id?:string
        code?:number
        confirmation?:boolean
        date?:string
        added?:Date
        updated?:Date
        email?:string
        v2_or_client?:boolean
        time?:MeetingTime
    }