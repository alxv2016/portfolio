import {DOCUMENT} from '@angular/common';
import {ComponentRef, Inject, Injectable, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs';
import {OffCanvasComponent} from './off-canvas.component';
import {OffCanvasDirective} from './off-canvas.directive';
import {OffCanvasModule} from './off-canvas.module';

@Injectable({
  providedIn: OffCanvasModule,
})
export class OffCanvasService {
  private componentRef!: ComponentRef<OffCanvasComponent>;
  // View ref
  private viewContainerRef!: ViewContainerRef;
  @ViewChild(OffCanvasDirective, {static: true}) OffCanvasHost!: OffCanvasDirective;
  constructor(@Inject(DOCUMENT) private document: Document) {}

  createOffCanvas(childComponent: Type<any>, title?: string | null, data?: any): void {
    const doc = this.document.body;
    // const main = this.document.querySelector('main');
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
    doc?.classList.add('no-scroll');
    // main?.classList.add('off-set');
    // Watch component's state to destroy
    this.getState().subscribe((state) => {
      if (!state) {
        doc?.classList.remove('no-scroll');
        // main?.classList.remove('off-set');
        this.componentRef.destroy();
      }
    });
  }

  getViewRef(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef;
  }

  close(): void {
    if (this.componentRef) {
      this.componentRef.instance.close();
    }
  }

  private insertChildComponent(childComponent: Type<any>): void {
    this.componentRef = this.viewContainerRef.createComponent(OffCanvasComponent);
    this.componentRef.instance.componentType = childComponent;
  }

  private getState(): Observable<boolean> {
    return this.componentRef.instance.state$.asObservable();
  }
}
