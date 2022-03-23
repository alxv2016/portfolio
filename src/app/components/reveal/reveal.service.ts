import {ComponentRef, Injectable, ViewChild, ViewContainerRef} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
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

  createReveal(reverse: boolean = false): void {
    this.componentRef = this.viewContainerRef.createComponent(RevealComponent);
    if (reverse) {
      this.componentRef.instance.reverse = reverse;
    }
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

  getAnimationState(): Observable<boolean> {
    return this.componentRef.instance.animationState$.asObservable();
  }
}
