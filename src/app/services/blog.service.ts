import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, switchMap} from 'rxjs';
import {environment} from 'src/environments/environment';
import {BlogResults} from './models/blog.interface';
import {Prismic, PrismicQuery} from './models/prismic.interface';
import * as moment from 'moment';

const initialState: BlogResults[] = [];

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private ep = environment.API_URL;
  private token = environment.TOKEN;
  private _initialState = new BehaviorSubject<BlogResults[]>(initialState);
  blogContent$ = this._initialState.asObservable();
  constructor(private http: HttpClient) {}

  getBlogContent(): Observable<BlogResults[]> {
    return this.http.get<Prismic>(`${this.ep}`, {responseType: 'json'}).pipe(
      switchMap((ref) => {
        const refToken = ref.refs[0].ref;
        const query = '[[at(document.type, "alxv_blog")]]';
        const params = new HttpParams().set('ref', refToken).set('access_token', this.token).set('q', query);
        return this.http.get<PrismicQuery>(`${this.ep}/documents/search`, {params, responseType: 'json'}).pipe(
          map((resp) => {
            const siteData = resp.results.map((res) => {
              const date = moment(res.first_publication_date).format('MMM DD, YYYY');
              return {
                date,
                data: res.data,
                tags: res.tags,
                url: res.url,
                uid: res.uid,
              };
            });
            const siteContent = siteData;
            this._initialState.next(siteContent);
            return siteContent;
          })
        );
      }),
      catchError((error) => {
        this._initialState.next(initialState);
        return of(initialState);
      })
    );
  }
}
