import {AfterViewInit, ChangeDetectorRef, Component, HostBinding, Injector, Input, NgZone, OnInit} from '@angular/core';
import {AppComponent} from 'src/app/app.component';
import {AlxvCollection, Sitelink} from 'src/app/services/models/content.interface';
import {BottomPaneService} from '../bottom-pane/bottom-pane.service';
import {AestheticClockComponent} from '../aesthetic-clock/aesthetic-clock.component';
import {RevealService} from '../reveal/reveal.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {PlaygroundComponent} from 'src/app/pages/playground/playground.component';

@Component({
  selector: 'c-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, AfterViewInit {
  timeNow: string = '00:00:00';
  @Input() siteContent?: AlxvCollection;
  @HostBinding('class') class = 'c-footer';
  constructor(
    private bottomPaneService: BottomPaneService,
    private revealService: RevealService,
    private inject: Injector,
    private router: Router,
    private zone: NgZone,
    private changeRef: ChangeDetectorRef
  ) {
    this.initClock = this.initClock.bind(this);
  }

  private initClock() {
    const now = moment();
    const seconds = now.format('ss');
    const minutes = now.format('mm');
    const hours = now.format('h');
    const meridian = now.format('A');
    this.timeNow = `${hours}:${minutes}:${seconds} ${meridian}`;
    // Only trigger angular change detection here
    this.changeRef.detectChanges();
    requestAnimationFrame(this.initClock);
  }

  ngOnInit(): void {
    // Run requestAnimationFrame outside angular change detection
    this.zone.runOutsideAngular(() => this.initClock());
  }

  private sendEmail(email: string, subject: string): void {
    const mailTo = `mailto:${email}?subject=${subject}`;
    window.open(mailTo);
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
      case link.link_id === 'contact':
        console.log('contact');
        this.sendEmail('avong2011@gmail.com', 'Hello');
        break;
      default:
        break;
    }
  }

  openClock(): void {
    this.bottomPaneService.createBottomPane(AestheticClockComponent, null, this.siteContent?.time_quote);
  }
}
