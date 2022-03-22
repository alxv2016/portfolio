import {ComponentRef, Injectable, ViewChild, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs';
import {RevealComponent} from './reveal.component';
import {RevealDirective} from './reveal.directive';
import {RevealModule} from './reveal.module';

@Injectable({
  providedIn: RevealModule,
})
export class RevealService {
  private componentRef!: ComponentRef<RevealComponent>;
  private viewContainerRef!: ViewContainerRef;
  @ViewChild(RevealDirective, {static: true}) revealHost!: RevealDirective;
  constructor() {}

  createReveal(): void {
    // If an instance already exist destroy it first
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef.instance.state$.next(false);
    }
    this.componentRef = this.viewContainerRef.createComponent(RevealComponent);
    this.componentRef.instance.state$.next(true);
    // Watch component's state to destroy
    this.getState().subscribe((state) => {
      if (!state) {
        this.componentRef.destroy();
      }
    });
  }

  getRevealHost(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef;
  }

  private getState(): Observable<boolean> {
    return this.componentRef.instance.state$.asObservable();
  }
}
