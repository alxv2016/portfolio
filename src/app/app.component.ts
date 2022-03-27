import {AfterContentChecked, Component, DoCheck, HostBinding, OnInit, ViewChild} from '@angular/core';
import {switchMap} from 'rxjs';
import {BottomPaneDirective} from './components/bottom-pane/bottom-pane.directive';
import {RevealDirective} from './components/reveal/reveal.directive';
import {ContentService} from './services/content.service';
import {AlxvCollection} from './services/models/content.interface';

@Component({
  selector: 'c-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, DoCheck {
  siteContent?: AlxvCollection;
  @HostBinding('class') class = 'c-root';
  @ViewChild(BottomPaneDirective, {static: true}) bottomPaneHost!: BottomPaneDirective;
  @ViewChild(RevealDirective, {static: true}) revealHost!: RevealDirective;
  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService
      .getSiteContent()
      .pipe(switchMap((_) => this.contentService.siteContent$))
      .subscribe((resp) => {
        this.siteContent = resp;
      });
  }

  ngDoCheck(): void {
    console.log('AppComponent', 'change detection went off');
  }
}
