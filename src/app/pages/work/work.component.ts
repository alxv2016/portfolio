import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, switchMap, tap} from 'rxjs';
import {AppComponent} from 'src/app/app.component';
import {OffCanvasService} from 'src/app/components/off-canvas/off-canvas.service';
import {PrismicResult} from 'src/app/services/models/prismic.interface';
import {PrismService} from 'src/app/services/prism.service';
import {PrismicService} from 'src/app/services/prismic.service';
import {WorkDiscoveryComponent} from '../work-discovery/work-discovery.component';

@Component({
  host: {class: 'c-work'},
  selector: 'c-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  //encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkComponent implements OnInit, AfterViewInit {
  workData$?: Observable<PrismicResult | null>;
  @ViewChildren('htmlContent', {read: ElementRef}) htmlContent!: QueryList<ElementRef>;
  constructor(
    private route: ActivatedRoute,
    private offCanvas: OffCanvasService,
    private prismic: PrismicService,
    private cd: ChangeDetectorRef,
    private element: ElementRef,
    private prism: PrismService,
    private inject: Injector
  ) {}

  ngOnInit(): void {
    this.workData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        console.log(id);
        return this.prismic.getWork(id);
      })
    );
    this.workData$.subscribe();
  }

  ngAfterViewInit(): void {
    const parent = this.inject.get<AppComponent>(AppComponent);
    this.offCanvas.getViewRef(parent.offCanvasHost.viewContainerRef);
    this.htmlContent.changes.subscribe((_) => {
      //
      console.log(_);
      this.prism.highlightAll();
    });
  }

  openOffCanvas(): void {
    this.offCanvas.createOffCanvas(WorkDiscoveryComponent, 'Discovery');
  }
}
