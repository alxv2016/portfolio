import {Pipe, PipeTransform, Sanitizer, SecurityContext} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import * as prismicH from '@prismicio/helpers';

@Pipe({
  name: 'asHTML',
})
export class AsHTMLPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(content: any, blog: boolean = false): SafeHtml {
    if (blog) {
      const asBlogHTML = prismicH.asHTML<any>(content, null, this.blogHtmlSerializer);
      if (asBlogHTML) {
        return this.sanitizer.bypassSecurityTrustHtml(asBlogHTML);
      }
    } else {
      const asHTML = prismicH.asHTML<any>(content, null, this.htmlSerializer);
      if (asHTML) {
        return this.sanitizer.bypassSecurityTrustHtml(asHTML);
      }
    }
    return 'Missing content';
  }

  private blogHtmlSerializer(type: any, element: any, content: any, children: any) {
    if (element.type === 'heading1') {
      return `<h1 class="heading-1">${children}</h1>`;
    }
    if (element.type === 'heading2') {
      return `<h2 class="heading-2">${children}</h2>`;
    }
    if (element.type === 'heading3') {
      return `<h3 class="heading-3">${children}</h3>`;
    }
    if (element.type === 'heading4') {
      return `<h4 class="heading-4">${children}</h4>`;
    }
    if (element.type === 'list-item') {
      return `<li class="ul-list-item">${children}</li>`;
    }
    if (element.data?.label === 'code-block') {
      return `<code>${children}</code>`;
    }
    if (element.data?.label === 'code-css') {
      return `<pre><code class="language-css">${children}</code></pre>`;
    }
    if (element.data?.label === 'code-scss') {
      return `<pre><code class="language-scss">${children}</code></pre>`;
    }
    if (element.data?.label === 'code-js') {
      return `<pre><code class="language-javascript">${children}</code></pre>`;
    }
    if (element.data?.label === 'code-ts') {
      return `<pre><code class="language-typescript">${children}</code></pre>`;
    }
    if (element.data?.label === 'iframe') {
      return `<iframe class="codepen-iframe" scrolling="no" frameborder="no" loading="lazy" allowtransparency="true" src="${children}"></iframe>`;
    }
    return null;
  }

  private htmlSerializer(type: any, element: any, content: any, children: any) {
    if (element.type === 'heading1') {
      return `<h1 class="display-1">${children}</h1>`;
    }
    if (element.type === 'heading2') {
      return `<h2 class="display-2">${children}</h2>`;
    }
    if (element.type === 'heading3') {
      return `<h3 class="display-3">${children}</h3>`;
    }
    if (element.data?.label === 'underline') {
      return `<span class="underline">${children}</span>`;
    }
    return null;
  }
}
