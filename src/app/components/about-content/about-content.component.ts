import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {ContentService} from 'src/app/services/content.service';
import {AlxvCollection} from 'src/app/services/models/content.interface';

@Component({
  selector: 'c-about-content',
  templateUrl: './about-content.component.html',
  styleUrls: ['./about-content.component.scss'],
})
export class AboutContentComponent implements OnInit, OnDestroy, AfterViewInit {
  private unsubscribe$ = new Subject();
  contentCheck = false;
  @Input() data: any;
  constructor(
    private cd: ChangeDetectorRef,
    private contentService: ContentService,
    private render: Renderer2,
    private element: ElementRef
  ) {}

  ngOnInit(): void {
    this.render.addClass(this.element.nativeElement, 'c-about-content');
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }
}
