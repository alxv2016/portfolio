import {Pipe, PipeTransform, Sanitizer, SecurityContext} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import * as prismicH from '@prismicio/helpers';

@Pipe({
  name: 'asHTML',
})
export class AsHTMLPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(content: any): SafeHtml {
    // console.log(content);
    const asHTML = prismicH.asHTML<any>(content, null, this.htmlSerializer);
    if (asHTML) {
      return this.sanitizer.bypassSecurityTrustHtml(asHTML);
    }
    return 'Missing content';
  }

  private htmlSerializer(type: any, element: any, content: any, children: any) {
    if (element.type === 'heading2') {
      return `<h2 class="display-2">${children}</h2>`;
    }
    if (element.type === 'heading3') {
      return `<h3 class="display-3">${children}</h3>`;
    }
    return null;
  }
}
