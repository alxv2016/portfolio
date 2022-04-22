import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AppComponent} from 'src/app/app.component';
import {BottomPaneService} from 'src/app/components/bottom-pane/bottom-pane.service';
import {RevealService} from 'src/app/components/reveal/reveal.service';
import {PrismicResult} from 'src/app/services/models/prismic.interface';
import {PrismicService} from 'src/app/services/prismic.service';

@Component({
  host: {class: 'c-work-list'},
  selector: 'c-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkListComponent implements OnInit {
  workList$?: Observable<PrismicResult[] | null>;
  constructor(
    private router: Router,
    private inject: Injector,
    private revealService: RevealService,
    private zone: NgZone,
    private bottomPaneService: BottomPaneService,
    private prismic: PrismicService,
    private cd: ChangeDetectorRef
  ) {}

  viewBlog(workID: string) {
    this.zone.run(() => {
      this.router.navigate(['work', workID]);
      this.bottomPaneService.closeBottomPane();
    });
    // this.revealService.createReveal(false);
    // this.revealService.getAnimationState().subscribe((state: boolean) => {
    //   // need to trigger zone because reveal animations runs outside of ngZone (GSAP)
    //   this.zone.run(() => {
    //     if (state) {
    //       this.router.navigate(['work', workID]);
    //       this.bottomPaneService.closeBottomPane();
    //     }
    //   });
    // });
  }

  ngOnInit(): void {
    this.workList$ = this.prismic.getWorkListState();
  }

  ngAfterViewInit(): void {
    const parent = this.inject.get<AppComponent>(AppComponent);
    this.revealService.getRevealHost(parent.revealHost.viewContainerRef);
  }
}
