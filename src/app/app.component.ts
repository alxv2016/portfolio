import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {BottomPaneDirective} from './components/bottom-pane/bottom-pane.directive';
import {RevealDirective} from './components/reveal/reveal.directive';
import {HomeCollection} from './services/models/home.interface';
import {PrismicService} from './services/prismic.service';

@Component({
  host: {
    class: 'c-root',
  },
  selector: 'c-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  homeContent$?: Observable<HomeCollection | null>;
  @ViewChild(BottomPaneDirective, {static: true}) bottomPaneHost!: BottomPaneDirective;
  @ViewChild(RevealDirective, {static: true}) revealHost!: RevealDirective;
  constructor(private prismic: PrismicService) {}

  ngOnInit(): void {
    this.prismic.getSiteData();
    this.homeContent$ = this.prismic.getHomeState();
    console.log('%c Hey! I see you peaking 👀', 'color: cyan; font-weight: bold; font-size: 16px');
    console.log(
      '%c Alot of code and 🥃 to get this baby running 💯 🔥🔥',
      'color: LightSalmon; font-weight: bold; font-size: 11px'
    );
  }
}
