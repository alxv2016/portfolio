import {Injectable} from '@angular/core';
import Prism from 'prismjs';

import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';

@Injectable({
  providedIn: 'root',
})
export class PrismHighlightService {
  highlightAll(): void {
    Prism.manual = true;
    Prism.highlightAll();
  }
}
