import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from './Services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit ,OnDestroy {
  constructor(private data:DataService){}
  title = 'Mint Soup Services';
  ngOnDestroy(): void {
      this.data.setStorage()
  }
  ngOnInit(): void {
      this.data.GETSTORAGE()
  }
}

export function titleCaseWord(word: string) {
  if (!word) return word;
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}

