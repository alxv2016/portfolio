import {ApplicationRef, ComponentRef, Injectable, Injector, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {AppComponent} from 'src/app/app.component';
import {BottomPaneComponent} from './bottom-pane.component';
import {BottomPaneDirective} from './bottom-pane.directive';
import {BottomPaneModule} from './bottom-pane.module';

@Injectable({
  providedIn: BottomPaneModule,
})
export class BottomPaneService {
  // Our component's ref
  private componentRef!: ComponentRef<BottomPaneComponent>;
  // The view container's ref
  private viewContainerRef!: ViewContainerRef;
  @ViewChild(BottomPaneDirective, {static: true}) bottomPaneHost!: BottomPaneDirective;
  constructor() {}

  createBottomPane(childComponent: Type<any>, title?: string): void {
    // If an instance already exist destroy it first
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef.instance.bottomPaneEvent$.next(false);
    }
    // Create new instance of child component
    this.insertChildComponent(childComponent);
    if (title) {
      this.componentRef.instance.hostTitle = title;
    }
    this.componentRef.instance.bottomPaneEvent$.next(true);
    // Watch onClose subject to destroy component ref
    this.destroyComponent(this.componentRef);
  }

  hookOnHost(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef;
  }

  private insertChildComponent(childComponent: Type<any>): void {
    this.componentRef = this.viewContainerRef.createComponent(BottomPaneComponent);
    this.componentRef.instance.childComponentType = childComponent;
  }

  private destroyComponent(componentRef: ComponentRef<BottomPaneComponent>): void {
    componentRef.instance.bottomPane$.subscribe((bool) => {
      if (!bool) {
        requestAnimationFrame(() => {
          componentRef.destroy();
        });
      }
    });
  }
}
