import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  HostBinding,
  Injector,
  Input,
  NgZone,
  OnInit,
} from '@angular/core';
import {AppComponent} from 'src/app/app.component';
import {AlxvCollection, Sitelink} from 'src/app/services/models/content.interface';
import {BottomPaneService} from '../bottom-pane/bottom-pane.service';
import {AestheticClockComponent} from '../aesthetic-clock/aesthetic-clock.component';
import {RevealService} from '../reveal/reveal.service';
import {Router} from '@angular/router';
import {PlaygroundComponent} from 'src/app/pages/playground/playground.component';
import {BlogResults} from 'src/app/services/models/blog.interface';
import {BlogListComponent} from 'src/app/pages/blog-list/blog-list.component';

@Component({
  host: {
    class: 'c-footer',
  },
  selector: 'c-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements AfterViewInit {
  @Input() siteContent?: AlxvCollection;
  @Input() blogResults?: BlogResults[];
  constructor(
    private bottomPaneService: BottomPaneService,
    private revealService: RevealService,
    private inject: Injector,
    private router: Router,
    private zone: NgZone,
    private cd: ChangeDetectorRef
  ) {}

  private sendEmail(email: string, subject: string): void {
    const mailTo = `mailto:${email}?subject=${subject}`;
    window.open(mailTo);
  }

  private contactLink(url: string): void {
    window.open(url, '_blank');
  }

  ngAfterViewInit(): void {
    const parent = this.inject.get<AppComponent>(AppComponent);
    this.bottomPaneService.getBottomPaneHost(parent.bottomPaneHost.viewContainerRef);
    this.revealService.getRevealHost(parent.revealHost.viewContainerRef);
  }

  openBottomPane(link: Sitelink): void {
    switch (true) {
      case link.link_id === 'approach' && this.router.url !== `/${link.link_id}`:
        this.revealService.createReveal(false);
        this.revealService.getAnimationState().subscribe((state: boolean) => {
          // need to trigger zone because reveal animations runs outside of ngZone (GSAP)
          this.zone.run(() => {
            if (state) {
              this.router.navigate(['approach']);
            }
          });
        });
        break;
      case link.link_id === 'playground':
        // console.log('playground');
        this.bottomPaneService.createBottomPane(PlaygroundComponent, 'Coding Playground', this.siteContent?.playground);
        break;
      case link.link_id === 'blog':
        // console.log('playground');
        this.bottomPaneService.createBottomPane(BlogListComponent, 'Blogs', this.blogResults);
        break;
      case link.link_id === 'contact':
        console.log('contact');
        // this.sendEmail('avong2011@gmail.com', 'Hello');
        this.contactLink('https://www.linkedin.com/in/avong');
        break;
      default:
        break;
    }
  }
}
