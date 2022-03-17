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
    console.log(ev);
    this.render.removeClass(this.bottomSheet, 'c-bottom-pane--animate');
    if (destroy) {
      this.destroyComponent();
    }
    this.bottomSheet?.removeEventListener('transitionend', (ev) => this.onTransitionEnd(ev));
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
    this.bottomPane$.subscribe((bool) => {
      if (bool) {
        this.render.addClass(this.bottomSheet, 'c-bottom-pane--faded-out');
        this.render.addClass(this.bottomSheet, 'c-bottom-pane--visible');
        this.render.removeClass(this.bottomSheet, 'c-bottom-pane--faded-out');
        this.bottomSheet!.addEventListener('transitionend', this.onTransitionEnd);
      }
    });
  }

  // openBottomSheet(e: any) {
  //   const sourceBtn = e.target.className === 'js-bs-trigger';
  //   if (sourceBtn) {
  //     this.render.addClass(this.bottomSheet, 'c-bottom-sheet--animate');
  //     this.render.addClass(this.bottomSheet, 'c-bottom-sheet--visible');
  //     this.bottomSheet!.addEventListener('transitionend', this.onTransitionEnd);
  //   }
  // }

  closeBottomSheet() {
    this.render.addClass(this.bottomSheet, 'c-bottom-pane--animate');
    this.render.addClass(this.bottomSheet, 'c-bottom-pane--hide');
    this.bottomSheet!.addEventListener('transitionend', (e) => this.onTransitionEnd(e, true));
  }

  ngAfterViewInit(): void {
    // const triggerBtn = this.parent.querySelector('.js-bs-trigger');
    this.createComponent();
    this.zone.runOutsideAngular(() => {
      this.bottomSheet!.addEventListener('click', this.closeBottomSheet);
      this.bottomSheetWindow.nativeElement.addEventListener('click', (e: Event) => e.stopPropagation());
      // if (triggerBtn) {
      //   this.render.setAttribute(triggerBtn, 'aria-haspopup', 'true');
      //   this.render.setAttribute(triggerBtn, 'aria-expanded', 'false');
      //   triggerBtn.addEventListener('click', this.openBottomSheet);
      // }
    });
  }

  ngOnDestroy(): void {
    this.destroyComponent();
  }
}
