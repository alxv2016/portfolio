import {DOCUMENT} from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  HostBinding,
  Inject,
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
  host: {class: 'c-off-canvas'},
  selector: 'c-off-canvas',
  templateUrl: './off-canvas.component.html',
  styleUrls: ['./off-canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffCanvasComponent implements AfterViewInit, OnDestroy {
  componentType!: Type<any>;
  private childComponent?: ComponentRef<any> | null = null;
  state$ = new BehaviorSubject<boolean>(false);
  title?: null | string;
  host: HTMLElement = this.element.nativeElement;
  clickedElement!: HTMLElement;
  transitionEventHandler: any;
  keydownEventHandler: any;
  clickEventHandlers: any[] = [];
  @Input() contentData: any = null;
  @ViewChild('offCanvasWindow') offCanvasWindow!: ElementRef;
  @ViewChild('offCanvasHeader') offCanvasHeader!: ElementRef;
  @ViewChild('offCanvasContent') offCanvasContent!: ElementRef;
  @ViewChild('componentPortal', {read: ViewContainerRef, static: true}) componentPortal!: ViewContainerRef;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private element: ElementRef,
    private render: Renderer2,
    private zone: NgZone
  ) {
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.close = this.close.bind(this);
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
        this.close();
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
      this.render.removeClass(this.host, 'c-off-canvas--animate');
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
    const scrollable = this.checkScroll(this.offCanvasWindow.nativeElement, this.offCanvasContent.nativeElement);
    const bounds = this.offCanvasWindow.nativeElement.getBoundingClientRect();
    console.log(bounds);
    if (scrollable) {
      this.render.setStyle(this.offCanvasHeader.nativeElement, 'width', `calc(90% - ${scrollbarWidth}px)`);
      this.render.setStyle(this.offCanvasHeader.nativeElement, 'max-width', `${bounds.width - scrollbarWidth}px`);
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
      this.render.addClass(this.host, 'c-off-canvas--animate');
      this.render.addClass(this.host, 'c-off-canvas--visible');
      this.transitionEventHandler = this.render.listen(this.host, 'transitionend', this.onTransitionEnd);
    });
    // this.checkScrollbar();
  }

  close() {
    this.render.addClass(this.host, 'c-off-canvas--animate');
    this.render.removeClass(this.host, 'c-off-canvas--visible');
    this.transitionEventHandler = this.render.listen(this.host, 'transitionend', (e) => this.onTransitionEnd(e, true));
    this.clickedElement.focus();
  }

  ngAfterViewInit(): void {
    this.render.setAttribute(this.host, 'tabIndex', '-1');
    this.zone.runOutsideAngular(() => {
      this.createComponent();
      this.clickEventHandlers.push(
        this.render.listen(this.host, 'click', this.close),
        this.render.listen(this.offCanvasWindow.nativeElement, 'click', (e: MouseEvent) => e.stopPropagation())
      );
    });
  }

  ngOnDestroy(): void {
    // Remove all events
    this.clickEventHandlers.forEach((fn) => fn());
    this.destroyComponent();
  }
}
