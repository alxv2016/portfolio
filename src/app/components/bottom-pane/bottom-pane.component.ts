import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  Renderer2,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  host: {class: 'c-bottom-pane'},
  selector: 'c-bottom-pane',
  templateUrl: './bottom-pane.component.html',
  styleUrls: ['./bottom-pane.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomPaneComponent implements AfterViewInit, OnDestroy {
  // Child component type i.e ExampleComponent
  componentType!: Type<any>;
  // Child component reference (Component being inserted into bottom pane)
  private childComponent?: ComponentRef<any> | null = null;
  state$ = new BehaviorSubject<boolean>(false);
  title?: null | string;
  host: HTMLElement = this.element.nativeElement;
  clickedElement!: HTMLElement;
  transitionEventHandler: any;
  keydownEventHandler: any;
  clickEventHandlers: any[] = [];
  @Input() contentData: any = null;
  @ViewChild('bottomSheetWindow') bottomSheetWindow!: ElementRef;
  @ViewChild('bottomSheetHeader') bottomSheetHeader!: ElementRef;
  @ViewChild('bottomSheetContent') bottomSheetContent!: ElementRef;
  // Capture the element template where the child component will be inserted we let Angular know that it's a ViewContainerRef
  @ViewChild('componentPortal', {read: ViewContainerRef, static: true}) componentPortal!: ViewContainerRef;
  constructor(private element: ElementRef, private render: Renderer2, private zone: NgZone) {
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.closeBottomSheet = this.closeBottomSheet.bind(this);
    this.focusTrap = this.focusTrap.bind(this);
  }

  private getScrollbarWidth() {
    // Creating invisible container
    const outer = this.element.nativeElement.ownerDocument.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    document.body.appendChild(outer);
    // Creating inner element and placing it in the container
    const inner = this.element.nativeElement.ownerDocument.createElement('div');
    outer.appendChild(inner);
    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    // Removing temporary elements from the DOM
    outer.parentNode?.removeChild(outer);
    return scrollbarWidth;
  }

  private checkScroll(parent: HTMLElement, child: HTMLElement): boolean {
    return parent.clientHeight < child.scrollHeight;
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
      this.render.removeClass(this.host, 'c-bottom-pane--animate');
      // remove transitionend event
      this.handleFocusTrap();
      this.transitionEventHandler();
    });
  }

  private destroyComponent(): void {
    if (this.componentPortal) {
      this.componentPortal.clear();
    }
    if (this.childComponent) {
      this.childComponent.changeDetectorRef.detach();
    }
    // remove keydownevent
    this.keydownEventHandler();
    this.state$.next(false);
  }

  private handleFocusTrap() {
    // Save element clicked
    const ownerDocument = this.element.nativeElement.ownerDocument;
    this.clickedElement = ownerDocument.activeElement;
    // Listen to keydown events
    // Focus first element
    const focusElsNodeList = this.host.querySelectorAll<HTMLElement>(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    );
    // Convert NodeList to Array
    const focusEls = Array.from<HTMLElement>(focusElsNodeList);
    const firstTabStop = focusEls[0];
    const lastTabStob = focusEls[focusEls.length - 1];
    this.keydownEventHandler = this.render.listen('window', 'keydown', (e) =>
      this.focusTrap(e, ownerDocument, firstTabStop, lastTabStob)
    );
    // Focus on first element;
    firstTabStop.focus();
  }

  private checkScrollbar(): void {
    // Adjust the header so it doesn't block scroll bar dynamically
    const scrollbarWidth = this.getScrollbarWidth();
    const scrollable = this.checkScroll(this.bottomSheetWindow.nativeElement, this.bottomSheetContent.nativeElement);
    if (scrollable) {
      this.render.setStyle(this.bottomSheetHeader.nativeElement, 'width', `calc(100% - ${scrollbarWidth - 7}px)`);
    }
  }

  private createComponent(): void {
    // We use the element template to create and insert the child component
    this.componentPortal.clear();
    this.childComponent = this.componentPortal.createComponent(this.componentType);
    if (this.contentData) {
      // Pass data
      this.childComponent.instance.data$ = this.contentData;
      // Manually active change detector for dynamic components
      this.childComponent.changeDetectorRef.detectChanges();
    }
    // Manually active change detector for dynamic components
    this.childComponent.changeDetectorRef.detectChanges();
    requestAnimationFrame(() => {
      this.render.addClass(this.host, 'c-bottom-pane--animate');
      this.render.addClass(this.host, 'c-bottom-pane--visible');
      this.transitionEventHandler = this.render.listen(this.host, 'transitionend', this.onTransitionEnd);
    });
    this.checkScrollbar();
  }
  // Close the modal
  closeBottomSheet() {
    this.render.addClass(this.host, 'c-bottom-pane--animate');
    this.render.removeClass(this.host, 'c-bottom-pane--visible');
    this.transitionEventHandler = this.render.listen(this.host, 'transitionend', (e) => this.onTransitionEnd(e, true));
    this.clickedElement.focus();
  }

  ngAfterViewInit(): void {
    this.render.setAttribute(this.host, 'tabIndex', '-1');
    this.zone.runOutsideAngular(() => {
      this.createComponent();
      this.clickEventHandlers.push(
        this.render.listen(this.host, 'click', this.closeBottomSheet),
        this.render.listen(this.bottomSheetWindow.nativeElement, 'click', (e: MouseEvent) => e.stopPropagation())
      );
    });
  }

  ngOnDestroy(): void {
    // Remove all events
    this.clickEventHandlers.forEach((fn) => fn());
    this.destroyComponent();
  }
}
