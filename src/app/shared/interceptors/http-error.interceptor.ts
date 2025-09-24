import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request and store its method on the headers so we can read it later
    const cloned = req.clone({
      setHeaders: { 'X-Request-Method': req.method }
    });

    return next.handle(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        // In case of HTTP error, preserve the method on the error object
        (error as any).httpMethod = req.method;
        return throwError(() => error);
      })
    );
  }
}
