import { Component } from '@angular/core';
import { buy, sell, contact } from 'src/app/app-routing.module';
import { TitleCasePipe } from '@angular/common';
// import { titleCaseWord } from 'src/app/app.component';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private titlecasePipe: TitleCasePipe) {
  }
  buy = buy
  sell = sell
  contact = contact

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
  transformName(word: string) {
    return this.titlecasePipe.transform(word);
  }

}

