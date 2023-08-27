import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Account } from 'src/app/Services/auth.service';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  constructor(
    private data:DataService,
    private router:Router,
    private activatedRoute:ActivatedRoute
    ){
    this.Account = this.data.GETACCOUNT()
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(x=>{
      // this.Path = x
    })
  }

  Account:Observable<Account | undefined>
  Path:string = ""
}
