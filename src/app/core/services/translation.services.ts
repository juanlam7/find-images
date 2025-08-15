import { Injectable, signal } from '@angular/core';
import { IAppLabels, Locales } from '@core/types';

const ENGLISH: IAppLabels = {
  greeting: 'Hello',
  farewell: 'Goodbye',
};

const SPANISH: IAppLabels = {
  greeting: 'Hola',
  farewell: 'Adiós',
};

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  readonly i18n = signal<IAppLabels>(ENGLISH);

  switchLanguage(lang: Locales) {
    switch (lang) {
      case Locales.Es:
        this.i18n.set(SPANISH);
        break;
      case Locales.En:
      default:
        this.i18n.set(ENGLISH);
    }
  }
}
