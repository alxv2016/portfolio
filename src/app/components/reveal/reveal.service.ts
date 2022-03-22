import {ComponentRef, Injectable, ViewChild, ViewContainerRef} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {RevealComponent} from './reveal.component';
import {RevealDirective} from './reveal.directive';
import {RevealModule} from './reveal.module';

@Injectable({
  providedIn: RevealModule,
})
export class RevealService {
  animationState$ = new BehaviorSubject<boolean>(false);
  private componentRef!: ComponentRef<RevealComponent>;
  private viewContainerRef!: ViewContainerRef;
  @ViewChild(RevealDirective, {static: true}) revealHost!: RevealDirective;
  constructor() {}

  createReveal(reverse: boolean = false, colors?: string[], amount?: number): void {
    this.componentRef = this.viewContainerRef.createComponent(RevealComponent);
    if (amount) {
      this.componentRef.instance.amount = amount;
    }
    if (colors) {
      this.componentRef.instance.colors = colors;
    }
    if (reverse) {
      this.componentRef.instance.reverse = reverse;
    }
    this.animationState$.next(false);
    this.componentRef.instance.state$.next(true);
    // Watch component's state to destroy
    this.getState().subscribe((state) => {
      if (!state) {
        this.animationState$.next(true);
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
    return this.animationState$.asObservable();
  }

  resetAnimationState(): void {
    this.animationState$.next(false);
  }
}
