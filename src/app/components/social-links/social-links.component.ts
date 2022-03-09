import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'c-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss'],
})
export class SocialLinksComponent implements OnInit {
  @HostBinding('class') class = 'c-social-links';
  constructor() {}

  ngOnInit(): void {}
}
