import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {finalize, Observable, tap} from 'rxjs';
import {LoadingService} from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loading: LoadingService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loading.show();
    return next.handle(request).pipe(
      tap(() => {
        console.log('loading');
      }),
      finalize(() => this.loading.hide())
    );
  }
}
