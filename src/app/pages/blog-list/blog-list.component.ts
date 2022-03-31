import {AfterViewInit, ChangeDetectionStrategy, Component, Injector, Input, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppComponent} from 'src/app/app.component';
import {BottomPaneService} from 'src/app/components/bottom-pane/bottom-pane.service';
import {RevealService} from 'src/app/components/reveal/reveal.service';

@Component({
  host: {
    class: 'c-blog-list',
  },
  selector: 'c-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListComponent implements AfterViewInit {
  @Input() data: any;
  constructor(
    private router: Router,
    private inject: Injector,
    private revealService: RevealService,
    private zone: NgZone,
    private bottomPaneService: BottomPaneService
  ) {}

  viewBlog() {
    this.revealService.createReveal(false);
    this.revealService.getAnimationState().subscribe((state: boolean) => {
      // need to trigger zone because reveal animations runs outside of ngZone (GSAP)
      this.zone.run(() => {
        if (state) {
          this.router.navigate(['approach']);
          this.bottomPaneService.closeBottomPane();
        }
      });
    });
  }

  ngAfterViewInit(): void {
    const parent = this.inject.get<AppComponent>(AppComponent);
    this.revealService.getRevealHost(parent.revealHost.viewContainerRef);
  }
}
