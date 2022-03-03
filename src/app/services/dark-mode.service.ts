import {Injectable, Renderer2} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, switchMap} from 'rxjs';
import {BreakpointObserver, MediaMatcher} from '@angular/cdk/layout';

// Our dark mode interface
export interface DarkModeState {
  prefersDark: boolean;
}
// Initial state for dark mode
const initialState: DarkModeState = {
  prefersDark: false,
};

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  // Our behaviourSubject store
  private _initialState = new BehaviorSubject<DarkModeState>(initialState);
  // Dark mode state's subscription
  darkModeState$ = this.checkDarkMode().pipe(switchMap((_) => this._initialState.asObservable()));

  constructor(private mediaMatcher: MediaMatcher, private bpObserver: BreakpointObserver) {
    // initiate check on stored preferences
    if (localStorage.getItem('prefersDarkMode') !== null) {
      initialState.prefersDark = JSON.parse(localStorage.getItem('prefersDarkMode') || 'false');
      this._initialState.next(initialState);
    }
  }

  // Observes match media event changes through Angular CDK breakpoint observer
  checkDarkMode(): Observable<DarkModeState> {
    return this.bpObserver.observe(['(prefers-color-scheme: dark)']).pipe(
      map((prefersDark) => {
        initialState.prefersDark = prefersDark.matches;
        localStorage.setItem('prefersDarkMode', JSON.stringify(prefersDark.matches));
        return initialState;
      }),
      catchError((_error) => {
        return of(initialState);
      })
    );
  }

  toggleDarkMode(): void {
    initialState.prefersDark = !initialState.prefersDark;
    this._initialState.next(initialState);
    localStorage.setItem('prefersDarkMode', JSON.stringify(initialState.prefersDark));
  }
}
