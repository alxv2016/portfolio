import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {BlogService} from 'src/app/services/blog.service';
import {PrismicResult} from 'src/app/services/models/prismic.interface';

@Component({
  host: {
    class: 'c-blog',
  },
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent implements OnInit {
  blogData$?: Observable<PrismicResult | null>;
  constructor(private route: ActivatedRoute, private blogService: BlogService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const id = param.get('id');
      this.blogData$ = this.blogService.getBlog(id);
    });
  }
}
