import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/Services/data.service';
import { ValidateEmail } from '../contact/contact.component';
import { MeetingTime } from 'src/app/Services/contact.service';
import { Account } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
    private data: DataService) {
  }

  sub?: Subscription
  $MeetingTimes: Observable<MeetingTime[]> | undefined
  email?: string
  confirm: boolean = false
  code?: number
  response: any[] = []
  date: any
  newDate: any
  host: any
  hostemail: any
  hosturl: any
  newcodeResponses: any[] = []
  hide = (name:string, display:string)=>{
    const v = document.getElementById(name)
    if(v)
    {
      v.style.display = display
    }
  }


  getUser(s: string | undefined) {
    if (s) {
      var _s = s.split(":")[1]
      console.log(_s)
      return _s
    } else {
      return "user"
    }
  }
  newCode() {
    let a = this.data.Account.value
    if (a) {
      this.data.__newCode(this.data.encrypt.encrypt(a.email), false).subscribe(x => {
        this.newcodeResponses = x
      })
    } else {
      this.data.__newCode(this.email ?? "", true).subscribe(x => {
        this.newcodeResponses = x
      })
    }
  }
  changeDate(confirm: boolean) {
    console.log(this.date)
    if (!confirm) {
      this.date = undefined
      this.getMeetingTimes()
    }
  }

  updateConfirmationtime(time: any, mt: MeetingTime) {
    console.log(mt)
    console.log(time + " for " + mt.host + " at " + mt.url)
    this.newDate = time + " for " + mt.host + " at " + mt.url

  }



  verify() {
    let a = this.data.Account.value
    let email_
    if(a){
      email_ = this.data.encrypt.encrypt(a.email)
      if(this.code){
        const c = this.data.__verifyAccount(email_, this.code, false).subscribe(x=>{
          this.newcodeResponses = x
        })
        if(c){
          setTimeout(()=>{
            c.unsubscribe()
            this.newcodeResponses = []
            this.hide("verify", "none")
          }, 5000)
        }
      }else{
        this.newcodeResponses = [false, "You must enter the code sent to your email to verify your account before confirming your attendance for the business meeting."]
        setTimeout(()=>{
          this.newcodeResponses = []
        }, 5000)
      }
    }else{
      email_ = this.email
      if(this.code){
        const c = this.data.__verifyAccount(email_ ?? "", this.code, true).subscribe(x=>{
          this.newcodeResponses = x
        })
        if(c){
          setTimeout(()=>{
            c.unsubscribe()
            this.newcodeResponses = []
            this.hide("verify", "none")
          }, 5000)
        }
      }else{
        this.newcodeResponses = [false, "You must enter the code sent to your email to verify your account before confirming your attendance for the business meeting."]
        setTimeout(()=>{
          this.newcodeResponses = []
        }, 5000)
      }
    }

  }

  getMeetingTimes() {
    let a = this.data.Account.value
    if(a){
      this.$MeetingTimes = this.data.__getMeetingTimes(this.data.encrypt.encrypt(a.email), false)
    }else{
      this.$MeetingTimes = this.data.__getMeetingTimes(this.email ?? "", true)
    }
  }

  sendConfirmation() {
    let email_
    if (this.newDate) {
      this.date = this.newDate
    }
    let a: Account | undefined = this.data.GETACCOUNT_VAL()
    if (a) {
      email_ = this.data.encrypt.encrypt(a.email)
      if (this.confirm) {
        const c = this.data.__sendEmailMeetingConfirmation(email_, this.confirm, this.code ?? 0, this.date, false).subscribe(x => {
          console.log(x)
          this.response = x
        })

        if (c) {
          setTimeout(() => {
            c.unsubscribe()
          }, 5000)
        }
      }
    }
    else {
      console.log("no account")
      if (this.email) {
        if (this.confirm) {
          const c = this.data.__sendEmailMeetingConfirmation(this.email, this.confirm, this.code ?? 0, this.date, true).subscribe(x => {
            console.log(x)
            this.response = x
          })

          if (c) {
            setTimeout(() => {
              c.unsubscribe()
            }, 5000)
          }
        }

      }
    }
  }

  ngOnInit(): void {
    let email_
    this.sub = this.activatedRoute.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(decodeURIComponent(params['user'])) //log the value of id
      let a: Account | undefined = this.data.GETACCOUNT_VAL()
      if (a) {
        // email_ = this.data.encrypt.encrypt(a.email)
        email_ = a.email
      } else {
        // email_ = this.getUser(params['user'])
        this.email = this.getUser(params['user'])

      }
      if (params['pageType'] == "verify") {
        this.data.StartNextFormProcess(["verify"], ["confirm"])
      }

      // this.$MeetingTimes = this.data.__getMeetingTimes(email_, true)
    })
  }

}
