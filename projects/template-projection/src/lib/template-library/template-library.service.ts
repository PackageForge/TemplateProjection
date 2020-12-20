import { Injectable, QueryList, TemplateRef } from '@angular/core';
import { ITemplateSize } from '../interfaces/i-template-size';

interface PromiseWithResolve extends Promise<any> {
  resolve: () => any;
}
@Injectable({
  providedIn: 'root'
})
export class TemplateLibraryService {

  public findTemplateById(templateList: QueryList<TemplateRef<any>> | undefined, id: string): TemplateRef<any> | undefined {
    return templateList ? templateList.find(tr => this.getTemplateId(tr) === id) : undefined;
  }
  public getTemplateId(template: TemplateRef<any>): string | undefined {
    const t = <any>template;
    let name:string;
    if (t._declarationTContainer && t._declarationTContainer.localNames && Array.isArray(t._declarationTContainer.localNames) && (name=t._declarationTContainer.localNames.find((ln:any)=>typeof(ln)==="string")))
      return name;
    if (t._def && t._def.references) {
      let names = Object.getOwnPropertyNames(t._def.references);
      if (names.length === 1)
        return names[0];
    }
    return;
  }
  public getTemplateSize(template: TemplateRef<any> | undefined): ITemplateSize | undefined {
    try {
      const t = <any>template;
      const width = parseFloat(this.getAttr(t._def.element.template.nodes[0].element, "width") || "");
      const height = parseFloat(this.getAttr(t._def.element.template.nodes[0].element, "height") || "");
      if (!isNaN(width) && !isNaN(height))
        return { width: width, height: height };
    } catch (e) {
    }
    return;
  }
  private getAttr(element: any, name: string): string | undefined {
    for (let i = 0; i < element.attrs.length; i++)
      try {
        if (element.attrs[i][1] === name)
          return element.attrs[i][2];
      } catch (e) {
      }
    return;
  }
}
