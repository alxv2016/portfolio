import {Inject, Injectable, Renderer2} from '@angular/core';
import {BehaviorSubject, catchError, distinctUntilChanged, fromEvent, map, Observable, of, switchMap, tap} from 'rxjs';
import {BreakpointObserver, MediaMatcher} from '@angular/cdk/layout';
import {DOCUMENT} from '@angular/common';

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
  storageKey = 'theme-preference';
  // Our behaviourSubject store
  private _initialState = new BehaviorSubject<DarkModeState>(initialState);
  // Dark mode state's subscription
  darkModeState$ = this.checkDarkMode().pipe(switchMap((_) => this._initialState.asObservable()));

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private mediaMatcher: MediaMatcher,
    private bpObserver: BreakpointObserver
  ) {
    // initiate check on stored preferences
    this.getColorPreference();
    // if (localStorage.getItem('prefersDarkMode') !== null) {
    //   initialState.prefersDark = JSON.parse(localStorage.getItem('prefersDarkMode') || 'false');
    //   this._initialState.next(initialState);
    // }
  }

  private getColorPreference() {
    if (localStorage.getItem(this.storageKey)) {
      initialState.prefersDark = JSON.parse(localStorage.getItem(this.storageKey) || 'false');
      console.log(initialState);
      this._initialState.next(initialState);
      this.setPreference(initialState.prefersDark);
    } else {
      initialState.prefersDark = this.mediaMatcher.matchMedia('(prefers-color-scheme): dark').matches;
      this._initialState.next(initialState);
      this.setPreference(initialState.prefersDark);
    }
  }

  private setPreference(state: boolean) {
    localStorage.setItem(this.storageKey, JSON.stringify(state));
    this.reflectPreference(state);
  }

  private reflectPreference(state: boolean): void {
    const body = this.document.querySelector('body');
    if (state) {
      body?.classList.add('dark');
    } else {
      body?.classList.remove('dark');
    }
  }

  // Observes match media event changes through Angular CDK breakpoint observer
  checkDarkMode(): Observable<any> {
    console.log(this.document);
    return fromEvent<MediaQueryListEvent>(this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)'), 'change').pipe(
      map((state) => {
        initialState.prefersDark = state.matches;
        this.setPreference(state.matches);
        return initialState;
      }),
      catchError((_) => {
        return of(initialState);
      })
    );
    // return this.bpObserver.observe(['(prefers-color-scheme: dark)']).pipe(
    //   distinctUntilChanged(),
    //   map((prefersDark) => {
    //     console.log(prefersDark);
    //     initialState.prefersDark = prefersDark.matches;
    //     this.setPreference(prefersDark.matches);
    //     return initialState;
    //   }),
    //   catchError((_error) => {
    //     return of(initialState);
    //   })
    // );
  }

  toggleDarkMode(): void {
    initialState.prefersDark = !initialState.prefersDark;
    this._initialState.next(initialState);
    this.setPreference(initialState.prefersDark);
  }
}
