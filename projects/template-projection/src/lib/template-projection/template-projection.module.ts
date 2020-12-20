import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateProjectionComponent } from './template-projection.component';


@NgModule({
  declarations: [
    TemplateProjectionComponent
  ],
  exports: [
    TemplateProjectionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TemplateProjectionModule {
}
