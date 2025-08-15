import {
  ApplicationConfig,
  inject,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { ErrorResponseInterceptor } from '@core/interceptors/error.interceptor';
import { SpinnerInterceptor } from '@core/interceptors/spinner.interceptor';
import { LanguageService } from '@core/services/translation.services';
import { I18N_TOKEN } from '@core/tokens/i18n.token';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        ErrorResponseInterceptor,
        SpinnerInterceptor,
        AuthInterceptor,
      ])
    ),
    provideRouter(routes),
    {
      provide: I18N_TOKEN,
      useFactory: () => inject(LanguageService).i18n,
    },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
