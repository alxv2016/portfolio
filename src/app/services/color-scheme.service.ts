import {Inject, Injectable, Renderer2} from '@angular/core';
import {catchError, fromEvent, map, Observable, of, Subject, switchMap} from 'rxjs';
import {MediaMatcher} from '@angular/cdk/layout';
import {DOCUMENT} from '@angular/common';

// Our dark mode interface
interface SchemePreference {
  prefersDark: boolean;
}
// Initial state for dark mode
const schemePreference: SchemePreference = {
  prefersDark: false,
};

@Injectable({
  providedIn: 'root',
})
export class ColorSchemeService {
  private storageKey = 'prefers-dark';
  private _initialState = new Subject<SchemePreference>();
  // Dark mode state's subscription to detect user preference settings
  schemeState$ = this.checkPreference().pipe(switchMap((_) => this._initialState.asObservable()));
  constructor(@Inject(DOCUMENT) private document: Document, private mediaMatcher: MediaMatcher) {
    // initiate dark mode check
    this.getColorPreference();
  }

  // Set the preference
  private setPreference(prefersDark: boolean) {
    localStorage.setItem(this.storageKey, JSON.stringify(prefersDark));
    this.reflectPreference(prefersDark);
  }
  // Reflect preference
  private reflectPreference(prefersDark: boolean): void {
    const doc = this.document.firstElementChild;
    const darkModeSwitch = this.document.querySelector('button[data-id="dark-mode-switch"]');
    if (prefersDark) {
      doc?.setAttribute('color-scheme', 'dark');
      darkModeSwitch?.classList.add('toggled');
      darkModeSwitch?.setAttribute('aria-checked', 'true');
    } else {
      doc?.setAttribute('color-scheme', 'light');
      darkModeSwitch?.classList.remove('toggled');
      darkModeSwitch?.setAttribute('aria-checked', 'false');
    }
  }

  private getColorPreference() {
    const storagekey = localStorage.getItem(this.storageKey);
    // Check in local storage first
    if (storagekey) {
      schemePreference.prefersDark = JSON.parse(localStorage.getItem(this.storageKey)!);
      this._initialState.next(schemePreference);
      this.setPreference(schemePreference.prefersDark);
    } else {
      // If no key has been set check user preference
      schemePreference.prefersDark = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches;
      this._initialState.next(schemePreference);
      this.setPreference(schemePreference.prefersDark);
    }
  }

  // Observes match media event changes through media matcher
  private checkPreference(): Observable<SchemePreference> {
    return fromEvent<MediaQueryListEvent>(this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)'), 'change').pipe(
      map((state) => {
        schemePreference.prefersDark = state.matches;
        this.setPreference(state.matches);
        return schemePreference;
      }),
      catchError((_) => {
        return of(schemePreference);
      })
    );
  }

  toggleDarkMode(): void {
    schemePreference.prefersDark = !schemePreference.prefersDark;
    this._initialState.next(schemePreference);
    this.setPreference(schemePreference.prefersDark);
  }
}
