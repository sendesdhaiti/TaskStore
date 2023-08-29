import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Account } from 'src/app/Services/auth.service';
import { MeetingConfirmation, MeetingTime } from 'src/app/Services/contact.service';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-my-confirmations',
  templateUrl: './my-confirmations.component.html',
  styleUrls: ['./my-confirmations.component.scss']
})
export class MyConfirmationsComponent implements OnInit {
  constructor(private data: DataService, private aR: ActivatedRoute) { }
  Account?: Account
  MeetingConfirmations: Observable<MeetingConfirmation[]> | undefined
  ngOnInit(): void {

    let email_
    this.Account = this.data.GETACCOUNT_VAL()
    this.aR.params.subscribe(x=>{
      const p = this.data.getRouteParam(x['user'])
      console.log(p)
      email_ = p
      let v2_or_client = true
      if(this.Account){
        email_ = this.data.encrypt.encrypt(this.Account.email)
        v2_or_client = false
      }
      this.MeetingConfirmations = this.data.__getMeetingConfirmations(email_, v2_or_client )
    })
  }
}
