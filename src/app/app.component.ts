import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TemplateProjection';
  bookInfo = { color: 'red', thickness: 70, height: 300, title: 'Moby Dick' };
  constructor() {
    setTimeout(() => {
      this.bookInfo.title = "Herman Melville";
    }, 1000);
  }
}
