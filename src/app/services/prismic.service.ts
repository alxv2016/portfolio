import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, switchMap, map, catchError, of, concat, zip} from 'rxjs';
import {environment} from 'src/environments/environment';
import {ApproachCollection} from './models/approach.interface';
import {HomeCollection} from './models/home.interface';
import {Prismic, PrismicBlogResult, PrismicQuery} from './models/prismic.interface';

@Injectable({
  providedIn: 'root',
})
export class PrismicService {
  private ep = environment.API_URL;
  private token = environment.TOKEN;
  private homeState$ = new BehaviorSubject<HomeCollection | null>(null);
  private approachState$ = new BehaviorSubject<ApproachCollection | null>(null);
  private blogList$ = new BehaviorSubject<PrismicBlogResult[] | null>(null);
  private workList$ = new BehaviorSubject<PrismicBlogResult[] | null>(null);
  private workList2$ = new BehaviorSubject<PrismicBlogResult[] | null>(null);
  constructor(private http: HttpClient) {}

  getHomeState(): Observable<HomeCollection | null> {
    return this.homeState$;
  }

  getApproachState(): Observable<ApproachCollection | null> {
    return this.approachState$;
  }

  getBlogListState(): Observable<PrismicBlogResult[] | null> {
    return this.blogList$;
  }

  getWorkListState(): Observable<PrismicBlogResult[] | null> {
    return this.workList$;
  }

  getWorkListState2(): Observable<PrismicBlogResult[] | null> {
    return this.workList2$;
  }

  private prismicRef(): Observable<string> {
    return this.http.get<Prismic>(`${this.ep}`, {responseType: 'json'}).pipe(
      map((prismic) => {
        const refToken = prismic.refs[0].ref;
        return refToken;
      })
    );
  }

  private homeData(refToken: string): Observable<PrismicQuery> {
    const query = '[[at(document.type, "home_page")]]';
    const params = new HttpParams().set('ref', refToken).set('access_token', this.token).set('q', query);
    return this.http.get<PrismicQuery>(`${this.ep}/documents/search`, {params, responseType: 'json'}).pipe(
      map((data) => {
        return data;
      })
    );
  }

  private approachData(refToken: string): Observable<PrismicQuery> {
    const query = '[[at(document.type, "approach_page")]]';
    const params = new HttpParams().set('ref', refToken).set('access_token', this.token).set('q', query);
    return this.http.get<PrismicQuery>(`${this.ep}/documents/search`, {params, responseType: 'json'}).pipe(
      map((data) => {
        return data;
      })
    );
  }

  private getBlogList(refToken: string): Observable<PrismicQuery> {
    const query = '[[at(document.type, "blog")]]';
    const params = new HttpParams().set('ref', refToken).set('access_token', this.token).set('q', query);
    return this.http.get<PrismicQuery>(`${this.ep}/documents/search`, {params, responseType: 'json'}).pipe(
      map((data) => {
        return data;
      })
    );
  }

  private getWorkList(refToken: string): Observable<PrismicQuery> {
    const query = '[[at(document.type, "case-study")]]';
    const params = new HttpParams().set('ref', refToken).set('access_token', this.token).set('q', query);
    return this.http.get<PrismicQuery>(`${this.ep}/documents/search`, {params, responseType: 'json'}).pipe(
      map((data) => {
        return data;
      })
    );
  }

  private getWorkList2(refToken: string): Observable<PrismicQuery> {
    const query = '[[at(document.type, "case_study")]]';
    const params = new HttpParams().set('ref', refToken).set('access_token', this.token).set('q', query);
    return this.http.get<PrismicQuery>(`${this.ep}/documents/search`, {params, responseType: 'json'}).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getBlog(id: string | null): Observable<PrismicBlogResult | null> {
    return this.prismicRef().pipe(
      switchMap((ref) => {
        const query = `[[at(my.blog.uid, "${id}")]]`;
        const params = new HttpParams().set('ref', ref).set('access_token', this.token).set('q', query);
        return this.http.get<PrismicQuery>(`${this.ep}/documents/search`, {params, responseType: 'json'}).pipe(
          map((resp) => {
            // console.log(resp.results[0].data);
            return resp.results[0];
          })
        );
      }),
      catchError((error) => {
        return of(null);
      })
    );
  }

  getWork(id: string | null): Observable<PrismicBlogResult | null> {
    return this.prismicRef().pipe(
      switchMap((ref) => {
        const query = `[[at(my.case-study.uid, "${id}")]]`;
        const params = new HttpParams().set('ref', ref).set('access_token', this.token).set('q', query);
        return this.http.get<PrismicQuery>(`${this.ep}/documents/search`, {params, responseType: 'json'}).pipe(
          map((resp) => {
            console.log(resp.results[0].data);
            return resp.results[0];
          })
        );
      }),
      catchError((error) => {
        return of(null);
      })
    );
  }

  private cleanUrl(url: string | null) {
    return url ? url.split('?')[0] : null;
  }

  getWork2(id: string | null): Observable<PrismicBlogResult | null> {
    return this.prismicRef().pipe(
      switchMap((ref) => {
        const query = `[[at(my.case_study.uid, "${id}")]]`;
        const params = new HttpParams().set('ref', ref).set('access_token', this.token).set('q', query);
        return this.http.get<PrismicQuery>(`${this.ep}/documents/search`, {params, responseType: 'json'}).pipe(
          map((resp) => {
            const data = resp.results[0].data;
            data.product_images.forEach((i: any) => {
              i.desktop.url = this.cleanUrl(i.desktop.url);
            });
            data.section.forEach((s: any) => {
              s['images'] = data.product_images.filter((i: any) => i.image_id === s.section_id);
              s['images'].length !== 0 ? s['images'] : (s['images'] = null);
            });
            return resp.results[0];
          })
        );
      }),
      catchError((error) => {
        return of(null);
      })
    );
  }

  getSiteData(): void {
    this.prismicRef()
      .pipe(
        switchMap((ref) => {
          return zip([
            this.homeData(ref),
            this.approachData(ref),
            this.getWorkList(ref),
            this.getBlogList(ref),
            this.getWorkList2(ref),
          ]).pipe(
            map((data) => {
              this.homeState$.next(data[0].results[0].data);
              this.approachState$.next(data[1].results[0].data);
              this.workList$.next(data[2].results);
              this.blogList$.next(data[3].results);
              this.workList2$.next(data[4].results);
              // console.log(data);
              return data;
            }),
            catchError((error) => {
              return of(null);
            })
          );
        })
      )
      .subscribe();
  }
}
