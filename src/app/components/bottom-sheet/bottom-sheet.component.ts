import {AfterViewInit, Component, ElementRef, HostBinding, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'c-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
})
export class BottomSheetComponent implements OnInit, AfterViewInit {
  parent: HTMLElement = this.element.nativeElement.parentElement;
  bottomSheet: HTMLElement | null = this.element.nativeElement;
  @HostBinding('class') class = 'c-bottom-sheet';
  @ViewChild('bottomSheetWindow') bottomSheetWindow!: ElementRef;
  constructor(private element: ElementRef, private render: Renderer2) {
    this.openBottomSheet = this.openBottomSheet.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }

  private onTransitionEnd(ev: TransitionEvent) {
    this.render.removeClass(this.bottomSheet, 'c-bottom-sheet--animate');
    this.bottomSheet?.removeEventListener('transitionend', this.onTransitionEnd);
  }

  openBottomSheet(e: any) {
    const sourceBtn = e.target.className === 'js-bs-trigger';
    if (sourceBtn) {
      this.render.addClass(this.bottomSheet, 'c-bottom-sheet--animate');
      this.render.addClass(this.bottomSheet, 'c-bottom-sheet--visible');
      this.bottomSheet?.addEventListener('transitionend', this.onTransitionEnd);
    }
    console.log(this.bottomSheet, e);
  }

  closeBottomSheet() {
    this.render.addClass(this.bottomSheet, 'c-bottom-sheet--animate');
    this.render.removeClass(this.bottomSheet, 'c-bottom-sheet--visible');
    this.bottomSheet?.addEventListener('transitionend', this.onTransitionEnd);
  }

  ngOnInit(): void {
    console.log(this.bottomSheet);
  }

  ngAfterViewInit(): void {
    this.bottomSheet = this.element.nativeElement;
    this.bottomSheet?.addEventListener('click', this.closeBottomSheet);
    this.bottomSheetWindow.nativeElement.addEventListener('click', (e: Event) => e.stopPropagation());
    const triggerBtn = this.parent.querySelector('.js-bs-trigger');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', this.openBottomSheet);
      console.log(triggerBtn);
    }
  }
}
