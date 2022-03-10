import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {ContentService} from 'src/app/services/content.service';
import {AlxvCollection} from 'src/app/services/models/content.interface';
import {gsap} from 'gsap';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'c-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject();
  siteContent?: AlxvCollection;
  app: any;
  @HostBinding('class') class = 'c-content';
  @ViewChild('pixiCanvas') pixiCanvas!: ElementRef;
  constructor(private element: ElementRef, private render: Renderer2, private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.siteContent$.pipe(takeUntil(this.unsubscribe$)).subscribe((resp) => {
      this.siteContent = resp;
    });
  }

  ngAfterViewInit(): void {
    this.app = new PIXI.Application({
      height: 800,
      width: 800,
      antialias: true,
      // resolution: window.devicePixelRatio || 1,
      transparent: true,
    });
    this.render.appendChild(this.pixiCanvas.nativeElement, this.app.view);
    this.render.setStyle(this.app.renderer.view, 'height', '100%');
    this.render.setStyle(this.app.renderer.view, 'width', '100%');
    const container = new PIXI.Container();
    this.app.stage.addChild(container);
    // container.pivot.y = container.height / 2;
    // const blur = new PIXI.filters.BlurFilter();
    // blur.blur = 1;
    // blur.quality = 40;
    for (let i = 0; i < 40; i++) {
      const graphics = new PIXI.Graphics();
      graphics.beginFill(0xb2d148);
      graphics.drawRect(0, 0, 20, this.app.renderer.height);
      graphics.endFill();
      graphics.x = (i % 40) * 40;
      // graphics.filters = [blur];
      container.addChild(graphics);
    }

    container.y = this.app.screen.height / 2;
    container.x = this.app.screen.width / 2;
    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;
    console.log(container.width);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }
}
