import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
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
  bottomSheet: HTMLElement = this.element.nativeElement;
  _hostEvents: any[] = [];
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
      this.bottomSheet.removeEventListener('transitionend', this.onTransitionEnd);
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
      this.render.listen(this.bottomSheet, 'transitionend', this.onTransitionEnd);
    });
  }

  closeBottomSheet() {
    this.render.addClass(this.bottomSheet, 'c-bottom-pane--animate');
    this.render.removeClass(this.bottomSheet, 'c-bottom-pane--visible');
    this.render.listen(this.bottomSheet, 'transitionend', (e) => this.onTransitionEnd(e, true));
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.createComponent();
      this._hostEvents.push(
        this.render.listen(this.bottomSheet, 'click', this.closeBottomSheet),
        this.render.listen(this.bottomSheetWindow.nativeElement, 'click', (e: MouseEvent) => e.stopPropagation()),
        this.render.listen('window', 'keydown', (e: KeyboardEvent) => {
          console.log(e);
          if (e.key === 'Escape') {
            this.closeBottomSheet();
          }
        })
      );
    });
  }

  ngOnDestroy(): void {
    this._hostEvents.forEach((fn) => fn());
    this.destroyComponent();
  }
}
