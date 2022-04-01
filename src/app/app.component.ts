import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  HostBinding,
  OnInit,
  ViewChild,
} from '@angular/core';
import {concat, Observable, switchMap, zip} from 'rxjs';
import {BottomPaneDirective} from './components/bottom-pane/bottom-pane.directive';
import {RevealDirective} from './components/reveal/reveal.directive';
import {BlogService} from './services/blog.service';
import {ContentService} from './services/content.service';
import {AlxvCollection} from './services/models/content.interface';
import {PrismicResult} from './services/models/prismic.interface';

@Component({
  host: {
    class: 'c-root',
  },
  selector: 'c-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  siteContent$?: Observable<AlxvCollection | null>;
  blogList?: PrismicResult[];
  @ViewChild(BottomPaneDirective, {static: true}) bottomPaneHost!: BottomPaneDirective;
  @ViewChild(RevealDirective, {static: true}) revealHost!: RevealDirective;
  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.getSiteData();
    this.siteContent$ = this.contentService.getSiteState();

    console.log('%c Hey! I see you peaking 👀', 'color: cyan; font-weight: bold; font-size: 16px');
    console.log(
      '%c Alot of code and 🥃 to get this baby running 💯 🔥🔥',
      'color: LightSalmon; font-weight: bold; font-size: 11px'
    );
  }

  ngDoCheck(): void {
    console.log('AppComponent', 'change detection went off');
  }
}
