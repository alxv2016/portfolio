import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[offCanvasHost]',
})
export class OffCanvasDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
