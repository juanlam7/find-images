import { inject, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { App } from './app';
import { LanguageService } from './core/services/translation.services';
import { I18N_TOKEN } from './core/tokens/i18n.token';

describe('App with TestBed', () => {
  beforeEach(async () => {
    const mockMediaQuery = {
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    } as any;

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockReturnValue(mockMediaQuery),
    });

    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideZonelessChangeDetection(),
        LanguageService,
        {
          provide: I18N_TOKEN,
          useFactory: () => inject(LanguageService).i18n,
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello');
  });
});

describe('App with Testing Library', () => {
  it('should render the title', async () => {
    await render(App, {
      providers: [
        provideZonelessChangeDetection(),
        LanguageService,
        {
          provide: I18N_TOKEN,
          useFactory: () => inject(LanguageService).i18n,
        },
      ],
    });

    const title = screen.getByRole('heading', { name: 'Hello' });
    expect(title).toBeTruthy();
  });
});
