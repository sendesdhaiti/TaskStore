import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/Services/data.service';
import { ValidateEmail } from '../contact/contact.component';
import { MeetingFrequency, MeetingTime } from 'src/app/Services/contact.service';
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
  filteredMeetingTimes: MeetingTime[] = []
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
  MeetingFrequency: any = MeetingFrequency
  frequencyFilter: MeetingFrequency[] = []
  frequencyNamesFilter: string[] = []
  hostFilter: string[] = []
  filter: any = { frequency: undefined, host: undefined }

  Filter() {
    this.filteredMeetingTimes = []
    this.$MeetingTimes?.subscribe(x => {
      for (let i = 0; i < x.length; i++) {
        const fcheck = MeetingFrequency[x[i].frequency] == MeetingFrequency[this.filter.frequency]
        const hcheck = x[i].host == this.filter.host
        if (fcheck && hcheck) {
          if (this.filteredMeetingTimes.find(t => {
            if (t.id == x[i].id) {
              //do not add
              return
            } else {
              return t
            }
          })) {
            //do not add
          } else {
            this.filteredMeetingTimes.push(x[i])
          }
        } 
        else if (fcheck == true && hcheck == false) {
          if (this.filteredMeetingTimes.find(t => {
            if (t.frequency == x[i].frequency) {
              //do not add
              return
            } else {
              return t
            }
          })) {
            //do not add
          } else {
            this.filteredMeetingTimes.push(x[i])
          }
        }
        else if (fcheck == false && hcheck == true) {
          if (this.filteredMeetingTimes.find(t => {
            if (t.host == x[i].host) {
              //do not add
              return
            } else {
              return t
            }
          })) {
            //do not add
          } else {
            this.filteredMeetingTimes.push(x[i])
          }
        }
      }

    })
  }

  hide = (name: string, display: string) => {
    const v = document.getElementById(name)
    if (v) {
      v.style.display = display
    }
  }


  getUser(s: string | undefined) {
    if (s) {
      var _s = s.split(":")[1]
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
    if (!confirm) {
      this.date = undefined
      // this.getMeetingTimes()
    }
  }

  updateConfirmationtime(time: any, mt: MeetingTime) {
    this.newDate = time + " for " + mt.host + " at " + mt.url

  }



  verify() {
    let a = this.data.Account.value
    let email_
    if (a) {
      email_ = this.data.encrypt.encrypt(a.email)
      if (this.code) {
        const c = this.data.__verifyAccount(email_, this.code, false).subscribe(x => {
          this.newcodeResponses = x
        })
        if (c) {
          setTimeout(() => {
            c.unsubscribe()
            this.newcodeResponses = []
            this.hide("verify", "none")
          }, 5000)
        }
      } else {
        this.newcodeResponses = [false, "You must enter the code sent to your email to verify your account before confirming your attendance for the business meeting."]
        setTimeout(() => {
          this.newcodeResponses = []
        }, 5000)
      }
    } else {
      email_ = this.email
      if (this.code) {
        const c = this.data.__verifyAccount(email_ ?? "", this.code, true).subscribe(x => {
          this.newcodeResponses = x
        })
        if (c) {
          setTimeout(() => {
            c.unsubscribe()
            this.newcodeResponses = []
            this.hide("verify", "none")
          }, 5000)
        }
      } else {
        this.newcodeResponses = [false, "You must enter the code sent to your email to verify your account before confirming your attendance for the business meeting."]
        setTimeout(() => {
          this.newcodeResponses = []
        }, 5000)
      }
    }

  }

  getMeetingTimes() {
    let a = this.data.Account.value
    if (a) {
      this.$MeetingTimes = this.data.__getMeetingTimes(this.data.encrypt.encrypt(a.email), false, "get_all")
    } else {
      this.$MeetingTimes = this.data.__getMeetingTimes(this.email ?? "", true, "get_all")
    }
    if (this.$MeetingTimes) {
      this.$MeetingTimes.subscribe(x => {
        this.SetMeetingTimeFilters(x)

      })
    }
  }
  SetMeetingTimeFilters(mt: MeetingTime[]) {
    for (let i = 0; i < mt.length ; i++) {
      //Frequency Filter
      const freq = mt[i].frequency
      if (freq) {
        if (this.frequencyFilter.find(o => {
          if (o == freq) {
            return o
          } else {
            return
          }
        })) {
          //Do not add
        } else {
          this.frequencyFilter.push(freq)
          this.frequencyNamesFilter.push(MeetingFrequency[freq])
        }
      }


      //Host Filter
      const host = mt[i].host
      if (host) {
        if (this.hostFilter.find(o => {
          if (o == host) {
            return o
          } else {
            return
          }
        })) {
          //Do not add
        } else {
          this.hostFilter.push(host)
        }
      }


    }
  }

  sendConfirmation(time:MeetingTime) {
    let email_
    if (this.newDate) {
      this.date = this.newDate
    }
    let a: Account | undefined = this.data.GETACCOUNT_VAL()
    if (a) {
      email_ = this.data.encrypt.encrypt(a.email)
      if (this.confirm) {
        const c = this.data.__sendEmailMeetingConfirmation(email_, this.confirm, this.code ?? 0, this.date, false, time).subscribe(x => {
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
      if (this.email) {
        if (this.confirm) {
          const c = this.data.__sendEmailMeetingConfirmation(this.email, this.confirm, this.code ?? 0, this.date, true, time).subscribe(x => {
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
      this.getMeetingTimes()

    })
  }

}
