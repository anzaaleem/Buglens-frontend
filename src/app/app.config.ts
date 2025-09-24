import { ApplicationConfig, ErrorHandler, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import { buglensModuleModule, TrackitService, CustomErrorHandlerService, UpdateWorkerService } from 'buglens';
import { environment } from '../environments/environment';
import { HttpErrorInterceptor } from './shared/interceptors/http-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(buglensModuleModule),
    CustomErrorHandlerService,
    UpdateWorkerService,
    {
      provide: TrackitService,
      useFactory: () => {
        const service = new TrackitService();
        service.environmentApiUrl = environment.baseURL;
        return service;
      },
    },
    { provide: ErrorHandler, useClass: CustomErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    ),
    provideZoneChangeDetection({
      eventCoalescing: true, runCoalescing: true
    }),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),
    // ✅ Register only your custom BugLens service worker
    provideServiceWorker('worker.js', {
      enabled: true,
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
