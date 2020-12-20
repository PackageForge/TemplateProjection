import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PiecesComponent } from './pieces/pieces.component';
import { TemplateLibraryModule, TemplateProjectionModule } from 'projects/template-projection/src/public-api';
import { BooksComponent } from './books/books.component';

@NgModule({
  declarations: [
    AppComponent,
    PiecesComponent,
    BooksComponent
  ],
  imports: [
    BrowserModule,
    TemplateProjectionModule,
    TemplateLibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
