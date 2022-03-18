import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Component({
  selector: 'c-bottom-pane',
  templateUrl: './bottom-pane.component.html',
  styleUrls: ['./bottom-pane.component.scss'],
})
export class BottomPaneComponent implements AfterViewInit, OnDestroy {
  // Child Component Ref
  childComponentType!: Type<any>;
  _bottomPaneEvent$ = new BehaviorSubject<boolean>(false);
  bottomPane$ = this._bottomPaneEvent$.asObservable();
  parent: HTMLElement = this.element.nativeElement.parentElement;
  bottomSheet: HTMLElement | null = this.element.nativeElement;
  @HostBinding('class') class = 'c-bottom-pane';
  @ViewChild('bottomSheetWindow') bottomSheetWindow!: ElementRef;
  // Capture the element template where the child component will be inserted we let Angular know that it's a ViewContainerRef
  @ViewChild('componentPortal', {read: ViewContainerRef, static: true}) componentPortal!: ViewContainerRef;
  constructor(private element: ElementRef, private render: Renderer2, private zone: NgZone) {
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.closeBottomSheet = this.closeBottomSheet.bind(this);
  }

  private onTransitionEnd(ev: TransitionEvent, destroy?: boolean) {
    if (destroy) {
      this.destroyComponent();
    }
    requestAnimationFrame(() => {
      this.render.removeClass(this.bottomSheet, 'c-bottom-pane--animate');
      this.bottomSheet?.removeEventListener('transitionend', this.onTransitionEnd);
    });
  }

  private destroyComponent(): void {
    if (this.componentPortal) {
      this.componentPortal.clear();
      this._bottomPaneEvent$.next(false);
    }
  }

  private createComponent(): void {
    // We use the element template to create and insert the child component
    this.componentPortal.clear();
    this.componentPortal.createComponent(this.childComponentType);
    requestAnimationFrame(() => {
      this.render.addClass(this.bottomSheet, 'c-bottom-pane--animate');
      this.render.addClass(this.bottomSheet, 'c-bottom-pane--visible');
      this.bottomSheet!.addEventListener('transitionend', this.onTransitionEnd);
    });
  }

  closeBottomSheet() {
    this.render.addClass(this.bottomSheet, 'c-bottom-pane--animate');
    this.render.removeClass(this.bottomSheet, 'c-bottom-pane--visible');
    this.bottomSheet!.addEventListener('transitionend', (e) => this.onTransitionEnd(e, true));
  }

  ngAfterViewInit(): void {
    this.createComponent();
    this.zone.runOutsideAngular(() => {
      this.bottomSheet!.addEventListener('click', this.closeBottomSheet);
      this.bottomSheetWindow.nativeElement.addEventListener('click', (e: Event) => e.stopPropagation());
    });
  }

  ngOnDestroy(): void {
    this.destroyComponent();
  }
}
