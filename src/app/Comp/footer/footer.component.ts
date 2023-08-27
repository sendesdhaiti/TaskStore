import { Component } from '@angular/core';
import { buy, sell, contact } from 'src/app/app-routing.module';
import { TitleCasePipe } from '@angular/common';
import { Routes } from '@angular/router';
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
  contact_excluded = ["my-confirmations/:user", "verify/:user/:pageType", "confirm/:user"]
  contact = this.filter(contact, this.contact_excluded)
  filter(l: Routes, excl: string[]) {
    l = l.filter(function (item) {
      for (var key in excl) {
        if (item.path?.toLowerCase() === excl[key].toLowerCase())
          return false;
      }
      return true;
    });
    return l
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
  transformName(word: string) {
    return this.titlecasePipe.transform(word);
  }

}

