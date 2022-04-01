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
    if (element.type === 'heading1') {
      return `<h1 class="display-1">${children}</h1>`;
    }
    if (element.type === 'heading2') {
      return `<h2 class="display-2">${children}</h2>`;
    }
    if (element.type === 'heading3') {
      return `<h3 class="display-3">${children}</h3>`;
    }
    // if (element.data?.label === 'overline') {
    //   return `<p class="overline">${children}</p>`;
    // }
    if (element.data?.label === 'code-block') {
      return `<pre><code>${children}</code></pre>`;
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
}
