import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[reveal]',
})
export class RevealDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
