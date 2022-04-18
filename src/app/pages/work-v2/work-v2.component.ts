import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, switchMap, tap} from 'rxjs';
import {PrismicResult} from 'src/app/services/models/prismic.interface';
import {PrismService} from 'src/app/services/prism.service';
import {PrismicService} from 'src/app/services/prismic.service';

@Component({
  host: {class: 'c-work-v2'},
  selector: 'c-work-v2',
  templateUrl: './work-v2.component.html',
  styleUrls: ['./work-v2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkV2Component implements OnInit, AfterViewInit {
  workData$?: Observable<PrismicResult | null>;
  @ViewChildren('htmlContent', {read: ElementRef}) htmlContent!: QueryList<ElementRef>;
  constructor(
    private route: ActivatedRoute,
    private prismic: PrismicService,
    private cd: ChangeDetectorRef,
    private element: ElementRef,
    private prism: PrismService
  ) {}

  ngOnInit(): void {
    this.workData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        console.log(id);
        return this.prismic.getWork2(id).pipe(tap((d) => console.log(d)));
      })
    );
    this.workData$.subscribe();
  }

  ngAfterViewInit(): void {
    this.htmlContent.changes.subscribe((_) => {
      //
      console.log(_);
      this.prism.highlightAll();
    });
  }
}
