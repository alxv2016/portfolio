import {Injectable} from '@angular/core';
import Prism from 'prismjs';

import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
//import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';

@Injectable({
  providedIn: 'root',
})
export class PrismHighlightService {
  highlightAll(): void {
    Prism.manual = true;
    // console.log(Prism.plugins['NormalizeWhitespace']);
    // Prism.plugins['NormalizeWhitespace'].setDefaults({
    //   'remove-trailing': true,
    //   'remove-indent': true,
    //   'left-trim': true,
    //   'right-trim': true,
    //   'break-lines': 60,
    //   'spaces-to-tabs': 4,
    // });
    Prism.hooks.add('before-highlight', function (env: any) {
      env.code = env.element.innerText;
    });
    Prism.highlightAll();
  }
}
