import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, switchMap, map, catchError, of} from 'rxjs';
import {environment} from 'src/environments/environment';
import {AlxvCollection, PrismicQuery} from './models/content.interface';
import {Prismic} from './models/prismic.interface';

const initialState: AlxvCollection = {
  page_title: null,
  callout: null,
  content: null,
  social_media_title: null,
  social_links: null,
  navigation_title: null,
  site_links: null,
  about_content: null,
  time_quote: null,
  approach: null,
  playground: null,
};

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private ep = environment.API_URL;
  private token = environment.TOKEN;
  private _initialState = new BehaviorSubject<AlxvCollection>(initialState);
  siteContent$ = this._initialState.asObservable();
  constructor(private http: HttpClient) {}
  // API
  getSiteContent(): Observable<AlxvCollection> {
    return this.http.get<Prismic>(`${this.ep}`, {responseType: 'json'}).pipe(
      switchMap((ref) => {
        const refToken = ref.refs[0].ref;
        const query = '[[at(document.type, "portfo")]]';
        const params = new HttpParams().set('ref', refToken).set('access_token', this.token).set('q', query);
        return this.http.get<PrismicQuery>(`${this.ep}/documents/search`, {params, responseType: 'json'}).pipe(
          map((resp) => {
            const siteData = resp.results[0].data;
            const siteContent = Object.assign(initialState, siteData);
            this._initialState.next(siteContent);
            return initialState;
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
