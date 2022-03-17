import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[bottomPaneHose]',
})
export class BottomPaneDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
