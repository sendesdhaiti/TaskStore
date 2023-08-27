import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MeetingTime } from 'src/app/Services/contact.service';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private data:DataService){}
  $MeetingTimes:Observable<MeetingTime[]> | undefined
  ngOnInit(): void {
      this.$MeetingTimes = this.data.__getMeetingTimes( this.data.encrypt.encrypt('example@gmail.com'),false, "get_all")
  }
}
