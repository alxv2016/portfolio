import {DOCUMENT} from '@angular/common';
import {
  ApplicationRef,
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {Observable} from 'rxjs';
import {BottomPaneComponent} from './bottom-pane.component';
import {BottomPaneDirective} from './bottom-pane.directive';
import {BottomPaneModule} from './bottom-pane.module';

@Injectable({
  providedIn: BottomPaneModule,
})
export class BottomPaneService {
  private componentRef!: ComponentRef<BottomPaneComponent>;
  // The view container's ref
  private viewContainerRef!: ViewContainerRef;
  @ViewChild(BottomPaneDirective, {static: true}) bottomPaneHost!: BottomPaneDirective;
  constructor(@Inject(DOCUMENT) private document: Document) {}

  createBottomPane(childComponent: Type<any>, title?: string | null, data?: any): void {
    // If an instance already exist destroy it first
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef.instance.state$.next(false);
    }
    // Create new instance of child component
    this.insertChildComponent(childComponent);
    if (title) {
      this.componentRef.instance.title = title;
    }
    if (data) {
      this.componentRef.instance.contentData = data;
    }
    this.componentRef.instance.state$.next(true);
    const doc = this.document.querySelector('html');
    doc?.classList.add('no-scroll');
    // Watch component's state to destroy
    this.getState().subscribe((state) => {
      if (!state) {
        doc?.classList.remove('no-scroll');
        this.componentRef.destroy();
      }
    });
  }

  getBottomPaneHost(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef;
  }

  closeBottomPane(): void {
    if (this.componentRef) {
      this.componentRef.instance.closeBottomSheet();
    }
  }

  private insertChildComponent(childComponent: Type<any>): void {
    this.componentRef = this.viewContainerRef.createComponent(BottomPaneComponent);
    this.componentRef.instance.componentType = childComponent;
  }

  private getState(): Observable<boolean> {
    return this.componentRef.instance.state$.asObservable();
  }

  // private destroyComponent(componentRef: ComponentRef<BottomPaneComponent>): void {
  //   componentRef.instance.state$.asObservable().subscribe((bool) => {
  //     if (!bool) {
  //       requestAnimationFrame(() => {
  //         componentRef.destroy();
  //       });
  //     }
  //   });
  // }
}
