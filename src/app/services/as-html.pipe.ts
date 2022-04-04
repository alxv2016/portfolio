import {ElementRef, Pipe, PipeTransform, Sanitizer, SecurityContext} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import * as prismicH from '@prismicio/helpers';

@Pipe({
  name: 'asHTML',
})
export class AsHTMLPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer, private element: ElementRef) {}

  transform(content: any): SafeHtml {
    const asHTML = prismicH.asHTML<any>(content, null, this.htmlSerializer);
    if (asHTML) {
      return this.sanitizer.bypassSecurityTrustHtml(asHTML);
    }
    return 'Missing content';
  }

  private htmlSerializer(type: any, element: any, content: any, children: any) {
    switch (true) {
      case element.label === 'display1':
        return `<h1 class="rt-display-1">${children}</h1>`;
      case element.label === 'display2':
        return `<h2 class="rt-display-2">${children}</h2>`;
      case element.label === 'display3':
        return `<h3 class="rt-display-3">${children}</h3>`;
      case element.type === 'heading1':
        return `<h1 class="rt-heading-1">${children}</h1>`;
      case element.type === 'heading2':
        return `<h2 class="rt-heading-2">${children}</h2>`;
      case element.type === 'heading3':
        return `<h3 class="rt-heading-3">${children}</h3>`;
      case element.type === 'heading4':
        return `<h4 class="rt-heading-4">${children}</h4>`;
      case element.type === 'heading5':
        return `<h5 class="rt-heading-5">${children}</h5>`;
      case element.type === 'heading6':
        return `<h6 class="rt-heading-6">${children}</h6>`;
      case element.label === 'overline':
        return `<span class="rt-overline">${children}</span>`;
      case element.label === 'code':
        return `<code class="rt-code-block">${children}</code>`;
      case element.label === 'iframe':
        return `<iframe class="rt-iframe" scrolling="no" frameborder="no" loading="lazy" allowtransparency="true" src="${children}"></iframe>`;
      case element.type === 'group-list-item':
        return `<ul class="rt-list">${children}</ul>`;
      default:
        return null;
    }
  }
}
