
// import { bootstrapApplication } from '@angular/platform-browser';
// import {
//   provideHttpClient,
//   withInterceptorsFromDi,
//   HTTP_INTERCEPTORS
// } from '@angular/common/http';
// import { provideRouter } from '@angular/router';
// import { AppComponent } from './app/app.component';
// import { HttpErrorInterceptor } from './app/interceptors/http-error.interceptor';
// import { routes } from './app/app.routes';
// import { TrackitService, UpdateWorkerService, CustomErrorHandlerService } from 'buglens';
// import { ErrorHandler, importProvidersFrom, isDevMode } from '@angular/core';
// import { buglensModuleModule } from 'buglens';
// import { environment } from './environments/environment';
// import { provideServiceWorker } from '@angular/service-worker'; // Make sure path is correct

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(withInterceptorsFromDi()),
//     { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
//     provideRouter(routes),
//     importProvidersFrom(buglensModuleModule),
//     {
//       provide: TrackitService,
//       useFactory: () => {
//         const service = new TrackitService();
//         service.environmentApiUrl = environment.baseURL;
//         return service;
//       }
//     },
//     CustomErrorHandlerService,
//     UpdateWorkerService,
//     { provide: ErrorHandler, useClass: CustomErrorHandlerService }, provideServiceWorker('ngsw-worker.js', {
//             enabled: !isDevMode(),
//             registrationStrategy: 'registerWhenStable:30000'
//           })
//   ]
// }).catch(err => console.error(err));


import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HttpErrorInterceptor } from './app/interceptors/http-error.interceptor';
import { routes } from './app/app.routes';
import { TrackitService, UpdateWorkerService, CustomErrorHandlerService } from 'buglens';
import { ErrorHandler, importProvidersFrom, isDevMode } from '@angular/core';
import { buglensModuleModule } from 'buglens';
import { environment } from './environments/environment';
import { provideServiceWorker } from '@angular/service-worker';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    provideRouter(routes),
    importProvidersFrom(buglensModuleModule),
    {
      provide: TrackitService,
      useFactory: () => {
        const service = new TrackitService();
        service.environmentApiUrl = environment.baseURL;
        return service;
      }
    },
    CustomErrorHandlerService,
    UpdateWorkerService,
    { provide: ErrorHandler, useClass: CustomErrorHandlerService },
    provideServiceWorker('worker.js', {   // <-- changed here
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ]
})
  .then(appRef => {
    const updateWorker = appRef.injector.get(UpdateWorkerService);

    // Register BugLens custom worker + check for updates
    updateWorker.registerServiceWorker();
    updateWorker.checkForUpdate();
  })
  .catch(err => console.error(err));
