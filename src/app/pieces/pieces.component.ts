import { Component, TemplateRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Deferred } from '@packageforge/deferred';

import { ITemplateLibrary, TemplateLibraryService, ITemplateSize } from 'projects/template-projection/src/public-api';

@Component({
  selector: 'piece-library',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.css']
})
export class PiecesComponent implements ITemplateLibrary, AfterViewInit {
  @ViewChildren(TemplateRef) templateRefs!: QueryList<TemplateRef<any>>;

  constructor(private templateLibraryService: TemplateLibraryService) {
  }
  private initDefer = new Deferred();

  ngAfterViewInit(): void {
    this.initDefer.resolve();
  }

  getTemplate(key: any): Promise<TemplateRef<any> | undefined> {
    return this.initDefer.promise.then(() => {
      const id = key.type + key.team + (key.type === 'King' && key.resigned ? 'Resigned' : '') + (key.small ? 'Small' : '');
      return this.templateLibraryService.findTemplateById(this.templateRefs, id);
    });
  }
  getSize(template: TemplateRef<any> | undefined): ITemplateSize | undefined {
    return this.templateLibraryService.getTemplateSize(template);
  }

}
