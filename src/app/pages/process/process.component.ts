import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {gsap} from 'gsap';
@Component({
  selector: 'c-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss'],
})
export class ProcessComponent implements OnInit, AfterViewInit {
  @HostBinding('class') class = 'c-process';
  @ViewChild('halfCircle') halfCircle!: ElementRef;
  @ViewChild('smallCircle') smallCircle!: ElementRef;
  @ViewChild('smallSquare') smallSquare!: ElementRef;
  @ViewChildren('centerCircle', {read: ElementRef}) centerCircle!: QueryList<ElementRef>;

  @ViewChild('curve') curve!: ElementRef;
  @ViewChild('curveBase') curveBase!: ElementRef;
  @ViewChild('balancer') balancer!: ElementRef;
  @ViewChild('block') block!: ElementRef;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
