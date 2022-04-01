import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  NgZone,
  OnInit,
} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AppComponent} from 'src/app/app.component';
import {BottomPaneService} from 'src/app/components/bottom-pane/bottom-pane.service';
import {RevealService} from 'src/app/components/reveal/reveal.service';
import {BlogService} from 'src/app/services/blog.service';
import {PrismicResult} from 'src/app/services/models/prismic.interface';

@Component({
  host: {
    class: 'c-blog-list',
  },
  selector: 'c-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListComponent implements OnInit, AfterViewInit {
  blogList$?: Observable<PrismicResult[] | null>;
  constructor(
    private router: Router,
    private inject: Injector,
    private revealService: RevealService,
    private zone: NgZone,
    private bottomPaneService: BottomPaneService,
    private blogService: BlogService,
    private cd: ChangeDetectorRef
  ) {}

  viewBlog(blogID: string) {
    this.revealService.createReveal(false);
    this.revealService.getAnimationState().subscribe((state: boolean) => {
      // need to trigger zone because reveal animations runs outside of ngZone (GSAP)
      this.zone.run(() => {
        if (state) {
          console.log('comp', blogID);
          this.router.navigate(['blog', blogID]);
          this.bottomPaneService.closeBottomPane();
        }
      });
    });
  }

  ngOnInit(): void {
    this.blogList$ = this.blogService.getBlogListState();
    this.blogList$.subscribe((e) => console.log(e));
  }

  ngAfterViewInit(): void {
    const parent = this.inject.get<AppComponent>(AppComponent);
    this.revealService.getRevealHost(parent.revealHost.viewContainerRef);
  }
}
