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
  storageKey = 'prefers-dark';
  // Our behaviourSubject store
  private _initialState = new BehaviorSubject<DarkModeState>(initialState);
  // Dark mode state's subscription to detect user preference settings
  darkModeState$ = this.checkDarkMode().pipe(switchMap((_) => this._initialState.asObservable()));
  constructor(@Inject(DOCUMENT) private document: Document, private mediaMatcher: MediaMatcher) {
    // initiate dark mode check
    this.getColorPreference();
  }

  private getColorPreference() {
    // Check in local storage first
    if (localStorage.getItem(this.storageKey)) {
      initialState.prefersDark = JSON.parse(localStorage.getItem(this.storageKey) || 'false');
      this._initialState.next(initialState);
      this.setPreference(initialState.prefersDark);
    } else {
      // If no key has been set check user preference
      initialState.prefersDark = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches;
      this._initialState.next(initialState);
      this.setPreference(initialState.prefersDark);
    }
  }
  // Set the preference
  private setPreference(state: boolean) {
    localStorage.setItem(this.storageKey, JSON.stringify(state));
    this.reflectPreference(state);
  }

  private reflectPreference(state: boolean): void {
    // Toggle accessibility attributes and dark mode class
    const body = this.document.querySelector('body');
    const darkModeBtn = this.document.querySelector('button[data-id="dark-mode-switch"]');
    if (state) {
      body?.classList.add('dark');
      darkModeBtn?.classList.add('toggled');
      darkModeBtn?.setAttribute('aria-checked', 'true');
    } else {
      body?.classList.remove('dark');
      darkModeBtn?.classList.remove('toggled');
      darkModeBtn?.setAttribute('aria-checked', 'false');
    }
  }

  // Observes match media event changes through media matcher
  private checkDarkMode(): Observable<any> {
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
  }

  toggleDarkMode(): void {
    initialState.prefersDark = !initialState.prefersDark;
    this._initialState.next(initialState);
    this.setPreference(initialState.prefersDark);
  }
}
