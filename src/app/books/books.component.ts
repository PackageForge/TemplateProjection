import { Component, ViewChildren, TemplateRef, AfterViewInit, QueryList } from '@angular/core';
import { Deferred } from '@packageforge/deferred';
import { ITemplateLibrary, TemplateLibraryService, ITemplateSize } from 'projects/template-projection/src/public-api';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html'
})
export class BooksComponent implements ITemplateLibrary, AfterViewInit {
  @ViewChildren(TemplateRef) templateRefs!: QueryList<TemplateRef<any>>;

  constructor(private templateLibraryService: TemplateLibraryService) {
  }
  private initDefer = new Deferred();

  ngAfterViewInit(): void {
    this.initDefer.resolve();
  }

  getTemplate(key: any): Promise<TemplateRef<any> | undefined> {
    return this.initDefer.promise.then(() => {
      const id = typeof (key) === "string" ? key : key.name;
      return this.templateLibraryService.findTemplateById(this.templateRefs, id);
    });
  }
  getSize(template: TemplateRef<any> | undefined): ITemplateSize | undefined {
    return this.templateLibraryService.getTemplateSize(template);
  }

}
