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
import {concat, switchMap, zip} from 'rxjs';
import {BottomPaneDirective} from './components/bottom-pane/bottom-pane.directive';
import {RevealDirective} from './components/reveal/reveal.directive';
import {BlogService} from './services/blog.service';
import {ContentService} from './services/content.service';
import {BlogResults} from './services/models/blog.interface';
import {AlxvCollection} from './services/models/content.interface';

@Component({
  selector: 'c-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, DoCheck {
  siteContent?: AlxvCollection;
  blogResults?: BlogResults[];
  @HostBinding('class') class = 'c-root';
  @ViewChild(BottomPaneDirective, {static: true}) bottomPaneHost!: BottomPaneDirective;
  @ViewChild(RevealDirective, {static: true}) revealHost!: RevealDirective;
  constructor(
    private contentService: ContentService,
    private blogService: BlogService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    zip(this.contentService.getSiteContent(), this.blogService.getBlogContent())
      .pipe(switchMap((_) => zip(this.contentService.siteContent$, this.blogService.blogContent$)))
      .subscribe((resp) => {
        this.siteContent = resp[0];
        this.blogResults = resp[1];
        console.log(this.blogResults);
        this.cd.markForCheck();
      });

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
