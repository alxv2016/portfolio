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
import {BlogService} from 'src/app/services/blog.service';
import {PrismicResult} from 'src/app/services/models/prismic.interface';
import {PrismHighlightService} from 'src/app/services/prism-highlight.service';

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
    private blogService: BlogService,
    private cd: ChangeDetectorRef,
    private element: ElementRef,
    private prism: PrismHighlightService
  ) {}

  ngOnInit(): void {
    this.blogData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        return this.blogService.getBlog(id);
      })
    );
  }

  ngAfterViewInit(): void {
    this.htmlContent.changes.pipe(take(1)).subscribe((_) => {
      this.prism.highlightAll();
    });
  }
}
