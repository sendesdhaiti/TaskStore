import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/Services/auth.service';
import { MeetingFrequency, MeetingTime } from 'src/app/Services/contact.service';
import { DataService } from 'src/app/Services/data.service';
import { ValidateEmail } from '../contact/contact.component';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {
  constructor(private data: DataService) {

  }

  $Account: Observable<Account | undefined> | undefined
  Account?: Account
  MeetingTime: MeetingTime = new MeetingTime()
  MeetingTimes: MeetingTime[] = []
  MyMeetingTimes: Observable<MeetingTime[]> | undefined
  msgs: any = {
    "terms": false,
    "showingAddMeeting": false,
    "addMeetingTime": undefined,
    "updateAccount": undefined,
  }
  editingAccount = false
  edittedAccount: any = {
    email: undefined,
    username: undefined,
    verifiedCode: undefined,
    password: undefined,
    re_password: undefined
  }
  edittedAccountMsgs: any = {
    email: undefined,
    emailGood: undefined,
    username: undefined,
    usernameGood: undefined,
    verifiedCode: undefined,
    password: undefined,
    passwordGood: undefined,
    uploaded: undefined,
    uploadedMsg: undefined
  }
  edittedMeetingTimeMsgs: any = {
    updatedMsg: undefined
  }
  newMeetingFormSections = []

  __deleteAccount() {
    if (this.Account) {
      let del = prompt("Are you sure you want to delete your account? All information associated will be deleted. If you are, type your email below. THIS PROCESS CANNOT BE REVERSED.")
      let a: Account = this.Account
      if (del) {
        if (del.toLowerCase() == a.email) {
          this.data.__deleteAccount(a.email).subscribe(x => {
            this.msgs.updateAccount = x[1]
            if (x[0]) {
              this.data.setAccount({})
              this.data.Route('login')
            }
          })
        }
      }

    }
  }
  _checkPassword() {
    let pass = this.edittedAccount.password
    let repass = this.edittedAccount.re_password
    if (pass !== repass) {
      this.edittedAccountMsgs.password = "Your passwords do not match"
      this.edittedAccountMsgs.passwordGood = false
    } else {
      this.edittedAccountMsgs.passwordGood = true

    }

    return <boolean>this.edittedAccountMsgs.passwordGood;
  }
  __checkEmail() {
    const e = this.edittedAccount.email
    if (ValidateEmail(e)) {
      const c = this.data.__checkemail(e).subscribe(x => {
        this.edittedAccountMsgs.emailGood = !x[0]
        this.edittedAccountMsgs.email = x[1]
      }, error => {
        this.edittedAccountMsgs.emailGood = !error.error[0]
        this.edittedAccountMsgs.email = error.error[1]
      })
      if (c) {
        setTimeout(() => {
          c.unsubscribe()
        }, 500)
      }
    } else {
      this.edittedAccountMsgs.email = "Your new email is not valid. Make some changes and try again!"
    }
  }

  __checkUsername() {
    const username = this.edittedAccount.username
    if (username) {
      const c = this.data.__checkusername(username).subscribe(x => {
        this.edittedAccountMsgs.usernameGood = !x[0]
        this.edittedAccountMsgs.username = x[1]
      }, error => {
        this.edittedAccountMsgs.usernameGood = !error.error[0]
        this.edittedAccountMsgs.username = error.error[1]
      })

      if (c) {
        setTimeout(() => {
          c.unsubscribe()
        }, 500)
      }
    } else {
      this.edittedAccountMsgs.username = "Your new email is not valid. Make some changes and try again!"
    }
  }
  _editingAccount() {
    if (this.editingAccount) {
      this.editingAccount = false
    } else {
      this.editingAccount = true
    }
  }

  __updateAccount() {
    if (this.editingAccount == false) {
      return;
    }

    if (this.edittedAccountMsgs.emailGood == false) {
      return;
    }
    if (this.edittedAccountMsgs.usernameGood == false) {
      return;
    }

    if (ValidateEmail(this.edittedAccount.email)) {
      // this._checkPassword()
      const c = this.data.__updateAccount({ email: this.edittedAccount.email, username: this.edittedAccount.username, password: this.edittedAccount.password }).subscribe(x => {
        this.msgs.updateAccount = x[1]
      })

      if (c) {
        setTimeout(() => {
          c.unsubscribe()
          this.edittedAccount = {
            email: undefined,
            username: undefined,
            verifiedCode: undefined,
            password: undefined
          }
          this._editingAccount()
        }, 2000)
      }


    }
  }



  _typeof(any: any) {
    if (typeof (any) == "string") {
      return true;
    } else {
      return false
    }

  }
  AddMeetingFormProcess(show: string[], hide: string[]) {
    this.data.StartNextFormProcess(show, hide)
  }
  addMeetingTime() {
    if (this.Account) {
      const a = this.data.GETACCOUNT_VAL()
      if (a) {
        this.MeetingTime.creator = this.data.encrypt.encrypt(a.email)
        const c = this.MeetingTimes.find(t => {
          const c = t.day == this.MeetingTime.day && t.time == this.MeetingTime.time
          return c;
        })
        if (c) {
          this.msgs.addMeetingTime = `${this.MeetingTime.day} at ${this.MeetingTime.time} was added already.`
        } else {
          this.MeetingTimes.push(this.MeetingTime)
          this.MeetingTime = { frequency: MeetingFrequency.Daily }
        }
      }
    }
  }
  hideEditTimes = true
  toggleMeetingTimeEdit(){
    if(this.hideEditTimes){
      this.hideEditTimes = false
    }else{
      this.hideEditTimes = true
    }
  }
  updateMeetingTime() {
    console.log(this.MeetingTime)
    var email = this.data.encrypt.encrypt(this.Account?.email ?? "")
    const c = this.data.__updateMeetingTimes({ email: email, times: [this.MeetingTime] }).subscribe({
      next: x => {
        this.edittedMeetingTimeMsgs.updatedMsg = x[1]
      },
      error: x => {
        this.edittedMeetingTimeMsgs.updatedMsg = "an error occur while updating the meeting time"
      }
    })
    if (c) {
      setTimeout(() => {
        this.MeetingTime = {frequency:0}
        c.unsubscribe()
        this.edittedMeetingTimeMsgs.updatedMsg = undefined
      }, 2000)
    }
  }

  uploadMeetingTimes() {
    if (this.MeetingTimes.length > 0) {
      var email = this.data.encrypt.encrypt(this.Account?.email ?? "")
      const c = this.data.__addMeetingTimes({ email: email, times: this.MeetingTimes }).subscribe(x => {
        if (x) {
          this.edittedAccountMsgs.uploaded = x[0]
          this.edittedAccountMsgs.uploadedMsg = x[1]
          for (let i = 0; i < this.MeetingTimes.length - 1; i++) {
            this.MeetingTimes.pop()
          }
          this.edittedAccount = {
            email: undefined,
            username: undefined,
            verifiedCode: undefined,
            password: undefined,
            re_password: undefined
          }

          this.MeetingTimes = []
        } else {
          this.edittedAccountMsgs.uploaded = false
          this.edittedAccountMsgs.uploadedMsg = "Saving the Meeting Times did not complete successfully."
        }
      }, e => {
        this.edittedAccountMsgs.uploaded = false
        this.edittedAccountMsgs.uploadedMsg = "Your request could not be sent."
      })

      if (c) {
        setTimeout(() => {
          c.unsubscribe()
          if (this.edittedAccountMsgs.uploaded == true) {
            this.MyMeetingTimes = this.data.__getMeetingTimes(email, false, "")
          }

          setTimeout(() => {
            this.edittedAccountMsgs.uploaded = undefined
            this.edittedAccountMsgs.uploadedMsg = undefined
            this.msgs.terms = false
          }, 5000)
        }, 2000)
      }
    }
  }

  ngOnInit(): void {
    this.$Account = this.data.GETACCOUNT()
    this.$Account.subscribe(x => {
      if (x) {
        this.Account = x
      }
    })
    var email = this.data.encrypt.encrypt(this.Account?.email ?? "")
    this.MyMeetingTimes = this.data.__getMeetingTimes(email, false, "")
    this.AddMeetingFormProcess(['newMeetingForm', '_host'], ['_howoften', '_date', '_url', '_terms'])
  }

}
