import {AfterViewInit, Component, ElementRef, HostBinding, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'c-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
})
export class BottomSheetComponent implements OnInit, AfterViewInit {
  @HostBinding('class') class = 'c-bottom-sheet c-bottom-sheet--open';
  constructor(private element: ElementRef, private render: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
