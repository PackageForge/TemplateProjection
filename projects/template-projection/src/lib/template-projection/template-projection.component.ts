import { Component, Input, TemplateRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { ITemplateLibrary } from '../interfaces/i-template-library';
import { IProjectedEntity } from '../interfaces/i-projected-entity';

@Component({
  selector: '[template-projection]',
  template: `<ng-container *ngTemplateOutlet="template; context: context || cookedKey"></ng-container>`
})
export class TemplateProjectionComponent implements AfterViewInit {

  library: ITemplateLibrary | undefined;
  @Input('template-projection') set _library(value: ITemplateLibrary) {
    this.library = value;
    this.updateTemplate();
  }
  key: any;
  @Input('key') set _key(value: any) {
    this.key = value;
    this.updateTemplate();
  }
  cookedKey: any;
  entity: IProjectedEntity | undefined;
  @Input('entity') set _entity(value: IProjectedEntity | undefined) {
    this.entity = value;
    this.updateTemplate();
  }

  @Input('context') context: any;
  template: TemplateRef<any> | null = null;
  private ready: boolean = false;

  constructor(private cdRef: ChangeDetectorRef) { 
  }

  ngAfterViewInit(): void {
    this.ready = true;
    this.updateTemplate(true);
  }
  private getKey(): any {
    let key = this.entity ? this.entity.getTemplateKey(this.key) : this.key;
    return key;
  }
  private updateTemplate(detect?: boolean) {
    if (this.ready && this.library) {
      let cookedKey = this.getKey();
      this.library.getTemplate(cookedKey).then(template => {
        this.cookedKey = cookedKey;
        if (template != this.template) {
          this.template = template || null;
          if (detect)
            this.cdRef.detectChanges();
        } else if (!this.context && detect)
          this.cdRef.detectChanges();
      });
    }
  }
}
