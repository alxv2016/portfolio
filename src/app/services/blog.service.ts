import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, filter, map, Observable, of, switchMap, tap} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Prismic, PrismicBlogResult, PrismicQuery} from './models/prismic.interface';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private ep = environment.API_URL;
  private token = environment.TOKEN;
  private blogList$ = new BehaviorSubject<PrismicBlogResult[] | null>(null);
  constructor(private http: HttpClient) {}

  getBlogListState(): Observable<PrismicBlogResult[] | null> {
    return this.blogList$;
  }

  getBlog(id: string | null): Observable<PrismicBlogResult | null> {
    return this.http.get<Prismic>(`${this.ep}`, {responseType: 'json'}).pipe(
      switchMap((prismic) => {
        const refToken = prismic.refs[0].ref;
        const query = `[[at(my.alxv_blog.uid, "${id}")]]`;
        const params = new HttpParams().set('ref', refToken).set('access_token', this.token).set('q', query);
        return this.http.get<PrismicQuery>(`${this.ep}/documents/search`, {params, responseType: 'json'}).pipe(
          map((resp) => {
            resp.results[0].first_publication_date = moment(resp.results[0].first_publication_date).format(
              'YYYY-MM-DD'
            );
            resp.results[0].last_publication_date = moment(resp.results[0].first_publication_date).format('YYYY-MM-DD');
            return resp.results[0];
          })
        );
      }),
      catchError((error) => {
        return of(null);
      })
    );
  }

  getBlogList(): void {
    this.http
      .get<Prismic>(`${this.ep}`, {responseType: 'json'})
      .pipe(
        switchMap((prismic) => {
          const refToken = prismic.refs[0].ref;
          const query = '[[at(document.type, "alxv_blog")]]';
          const params = new HttpParams().set('ref', refToken).set('access_token', this.token).set('q', query);
          return this.http.get<PrismicQuery>(`${this.ep}/documents/search`, {params, responseType: 'json'}).pipe(
            map((resp) => {
              const blogList = resp.results;
              blogList.forEach((result) => {
                result.first_publication_date = moment(result.first_publication_date).format('YYYY-MM-DD');
                result.last_publication_date = moment(result.first_publication_date).format('YYYY-MM-DD');
              });
              this.blogList$.next(blogList);
              return blogList;
            })
          );
        }),
        catchError((error) => {
          return of(null);
        })
      )
      .subscribe();
  }
}
