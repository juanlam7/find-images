import { TestBed } from '@angular/core/testing';
import { Locales } from '../types';
import { LanguageService } from './translation.services';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguageService],
    });
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to English labels', () => {
    expect(service.i18n()).toEqual({
      greeting: 'Hello',
      farewell: 'Goodbye',
    });
  });

  it('should switch to Spanish', () => {
    service.switchLanguage(Locales.Es);
    expect(service.i18n()).toEqual({
      greeting: 'Hola',
      farewell: 'Adiós',
    });
  });

  it('should switch back to English', () => {
    service.switchLanguage(Locales.Es);
    service.switchLanguage(Locales.En);
    expect(service.i18n()).toEqual({
      greeting: 'Hello',
      farewell: 'Goodbye',
    });
  });

  it('should default to English if an unknown locale is passed', () => {
    service.switchLanguage('unknown' as Locales);
    expect(service.i18n()).toEqual({
      greeting: 'Hello',
      farewell: 'Goodbye',
    });
  });
});
