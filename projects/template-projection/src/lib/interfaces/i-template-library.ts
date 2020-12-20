import { TemplateRef } from "@angular/core";
import { ITemplateSize } from "./i-template-size";

export interface ITemplateLibrary {
  getTemplate(key?: any): Promise<TemplateRef<any> | undefined>;
  getSize(template: TemplateRef<any> | undefined): ITemplateSize | undefined;
}