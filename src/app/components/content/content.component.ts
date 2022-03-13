import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {fromEvent, map, Subject, takeUntil, throttleTime} from 'rxjs';
import {ContentService} from 'src/app/services/content.service';
import {AlxvCollection} from 'src/app/services/models/content.interface';
import {gsap} from 'gsap';

@Component({
  selector: 'c-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject();
  siteContent?: AlxvCollection;
  @HostBinding('class') class = 'c-content';
  // @ViewChild('discipline') discipline!: ElementRef;
  @ViewChildren('discipline', {read: ElementRef}) discipline!: QueryList<ElementRef>;
  constructor(private element: ElementRef, private render: Renderer2, private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.siteContent$.pipe(takeUntil(this.unsubscribe$)).subscribe((resp) => {
      this.siteContent = resp;
    });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }
}
