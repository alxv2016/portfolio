import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, switchMap, take} from 'rxjs';
import {PrismicResult} from 'src/app/services/models/prismic.interface';
import {PrismService} from 'src/app/services/prism.service';
import {PrismicService} from 'src/app/services/prismic.service';

@Component({
  host: {
    class: 'c-blog',
  },
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent implements OnInit, AfterViewInit {
  blogData$?: Observable<PrismicResult | null>;
  @ViewChildren('htmlContent', {read: ElementRef}) htmlContent!: QueryList<ElementRef>;
  constructor(
    private route: ActivatedRoute,
    private prismic: PrismicService,
    private cd: ChangeDetectorRef,
    private element: ElementRef,
    private prism: PrismService
  ) {}

  ngOnInit(): void {
    this.blogData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        return this.prismic.getBlog(id);
      })
    );
  }

  ngAfterViewInit(): void {
    this.htmlContent.changes.subscribe((_) => {
      //
      console.log(_);
      this.prism.highlightAll();
    });
  }
}
