import {AfterViewInit, Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'c-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
})
export class PlaygroundComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() data: any;
  @HostBinding('class') class = 'c-playground';
  constructor() {}

  ngOnInit(): void {
    console.log(this.data);
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}
}
