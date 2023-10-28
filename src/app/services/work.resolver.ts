import {Injectable} from '@angular/core';
import {Router, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute} from '@angular/router';
import {Observable, of, switchMap, tap} from 'rxjs';
import {PrismicResult} from './models/prismic.interface';
import {PrismicService} from './prismic.service';

@Injectable({
  providedIn: 'root',
})
export class WorkResolver {
  constructor(private prismic: PrismicService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<PrismicResult | null> {
    const id = route.paramMap.get('id');
    return this.prismic.getWork(id).pipe(
      tap((data) => {
        if (!data) {
          this.router.navigate(['/']);
        }
      })
    );
  }
}
