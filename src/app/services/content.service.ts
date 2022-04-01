import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, switchMap, map, catchError, of, concat} from 'rxjs';
import {environment} from 'src/environments/environment';
import {AlxvCollection} from './models/content.interface';
import {Prismic, PrismicQuery} from './models/prismic.interface';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private ep = environment.API_URL;
  private token = environment.TOKEN;
  private siteState$ = new BehaviorSubject<AlxvCollection | null>(null);
  constructor(private http: HttpClient) {}

  getSiteState(): Observable<AlxvCollection | null> {
    return this.siteState$;
  }
  // API
  getSiteData(): void {
    this.http
      .get<Prismic>(`${this.ep}`, {responseType: 'json'})
      .pipe(
        switchMap((prismic) => {
          const refToken = prismic.refs[0].ref;
          const query = '[[at(document.type, "portfo")]]';
          const params = new HttpParams().set('ref', refToken).set('access_token', this.token).set('q', query);
          return this.http.get<PrismicQuery>(`${this.ep}/documents/search`, {params, responseType: 'json'}).pipe(
            map((data) => {
              this.siteState$.next(data.results[0].data);
              return data.results;
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
