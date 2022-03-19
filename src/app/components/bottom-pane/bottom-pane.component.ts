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
import {BehaviorSubject, first, Subject} from 'rxjs';

@Component({
  selector: 'c-bottom-pane',
  templateUrl: './bottom-pane.component.html',
  styleUrls: ['./bottom-pane.component.scss'],
})
export class BottomPaneComponent implements AfterViewInit, OnDestroy {
  // Child Component Ref
  childComponentType!: Type<any>;
  bottomPaneEvent$ = new BehaviorSubject<boolean>(false);
  bottomPane$ = this.bottomPaneEvent$.asObservable();
  hostTitle?: null | string;
  hostElement: HTMLElement = this.element.nativeElement;
  triggerElement!: HTMLElement;
  transitionEventHandler: any;
  keydownEventHandler: any;
  clickEventHandlers: any[] = [];
  @HostBinding('class') class = 'c-bottom-pane';
  @ViewChild('bottomSheetWindow') bottomSheetWindow!: ElementRef;
  // Capture the element template where the child component will be inserted we let Angular know that it's a ViewContainerRef
  @ViewChild('componentPortal', {read: ViewContainerRef, static: true}) componentPortal!: ViewContainerRef;
  constructor(private element: ElementRef, private render: Renderer2, private zone: NgZone) {
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.closeBottomSheet = this.closeBottomSheet.bind(this);
    this.focusTrap = this.focusTrap.bind(this);
  }
  // Controls Bottom Pane focus trap
  private focusTrap(ev: KeyboardEvent, ownerDocument: Document, firstTabStop: HTMLElement, lastTabStob: HTMLElement) {
    // Focus trap
    function tabPrevious() {
      if (ownerDocument.activeElement === firstTabStop) {
        ev.preventDefault();
        lastTabStob.focus();
      }
    }
    function tabNext() {
      if (ownerDocument.activeElement === lastTabStob) {
        ev.preventDefault();
        firstTabStop.focus();
      }
    }

    switch (ev.key) {
      case 'Tab':
        if (ev.shiftKey) {
          tabPrevious();
        } else {
          tabNext();
        }
        break;
      case 'Escape':
        this.closeBottomSheet();
        break;
      default:
        break;
    }
  }
  // Listens for transitionend event
  private onTransitionEnd(ev: TransitionEvent, destroy: boolean = false) {
    if (destroy) {
      this.destroyComponent();
    }
    requestAnimationFrame(() => {
      this.render.removeClass(this.hostElement, 'c-bottom-pane--animate');
      this.transitionEventHandler();
    });
  }

  private destroyComponent(): void {
    if (this.componentPortal) {
      this.componentPortal.clear();
    }
    this.keydownEventHandler();
    this.bottomPaneEvent$.next(false);
  }

  private createComponent(): void {
    // Save element clicked
    const ownerDocument = this.element.nativeElement.ownerDocument;
    this.triggerElement = ownerDocument.activeElement;
    // We use the element template to create and insert the child component
    this.componentPortal.clear();
    this.componentPortal.createComponent(this.childComponentType);
    requestAnimationFrame(() => {
      this.render.addClass(this.hostElement, 'c-bottom-pane--animate');
      this.render.addClass(this.hostElement, 'c-bottom-pane--visible');
      this.transitionEventHandler = this.render.listen(this.hostElement, 'transitionend', this.onTransitionEnd);
    });
    // Listen to keydown events
    // Focus first element
    const focusElsNodeList = this.hostElement.querySelectorAll<HTMLElement>(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    );
    // Convert NodeList to Array
    const focusEls = Array.from<HTMLElement>(focusElsNodeList);
    const firstTabStop = focusEls[0];
    const lastTabStob = focusEls[focusEls.length - 1];
    this.keydownEventHandler = this.render.listen('window', 'keydown', (e) =>
      this.focusTrap(e, ownerDocument, firstTabStop, lastTabStob)
    );
    // Focus first element after transition ends - visibility initially hidden
    const focusEvent = this.render.listen(this.bottomSheetWindow.nativeElement, 'transitionend', (e) => {
      firstTabStop.focus();
      focusEvent();
    });
  }
  // Close the modal
  closeBottomSheet() {
    this.render.addClass(this.hostElement, 'c-bottom-pane--animate');
    this.render.removeClass(this.hostElement, 'c-bottom-pane--visible');
    this.transitionEventHandler = this.render.listen(this.hostElement, 'transitionend', (e) =>
      this.onTransitionEnd(e, true)
    );
    this.triggerElement.focus();
  }

  ngAfterViewInit(): void {
    this.render.setAttribute(this.hostElement, 'tabIndex', '-1');
    this.zone.runOutsideAngular(() => {
      this.createComponent();
      this.clickEventHandlers.push(
        this.render.listen(this.hostElement, 'click', this.closeBottomSheet),
        this.render.listen(this.bottomSheetWindow.nativeElement, 'click', (e: MouseEvent) => e.stopPropagation())
      );
    });
  }

  ngOnDestroy(): void {
    this.clickEventHandlers.forEach((fn) => fn());
    this.destroyComponent();
  }
}
