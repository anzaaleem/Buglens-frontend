import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, retry, throwError } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl: string = environment.apiURL;
  authKey: any = localStorage.getItem('authKey') ? localStorage.getItem('authKey') : '';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  httpOptionsFile = {
    headers: new HttpHeaders({
      'Content-Type': 'application/msword',
    }),
  };
  /**
   * http header, it is set when downloading a csv function in service is triggered
   */
  httpOptionsCVS = {
    headers: new HttpHeaders({
      'Authorization': this.authKey
    }),
  };

  private readonly http = inject(HttpClient);
  //private readonly snackBarService = inject(SnackbarService);
  private readonly baseUrl = environment.apiURL;

  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(this.buildUrl(endpoint), { params }).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(this.buildUrl(endpoint), body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(this.buildUrl(endpoint), body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  patch<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.patch<T>(this.buildUrl(endpoint), body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  delete<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.delete<T>(this.buildUrl(endpoint), { params }).pipe(
      catchError(this.handleError)
    );
  }

  postLogin(body: any) {
    return this.http
      .post<any>(this.apiUrl + '/login', body, this.httpOptions)
      .pipe(retry(0));
  }

  postLogout() {
    return this.http.post<any>(this.apiUrl + '/logout', null, this.httpOptions);
  }

  handleError = (error: any) => {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      // errorMessage = 'Invalid Credentials';
      errorMessage = `Error: ${error.status}\nMessage: ${error.message}`;

    }
    //Not displaying the 404's as the backend returns 404 if no data is found on the API
    if (error.status == 404) {
      //Do nothing for now
    } else if (error.status == 401) {
      //Not auth
      let loginLink = document.createElement('a');
      loginLink.href = "/login";
      //this.snackBarService.showMessage('Session has expired, Redirecting...', 'snackbar-info', `Error Code:${error.status}`);
        setTimeout(() => { loginLink.click() }, 3000)
    } else {
      //this.snackBarService.showMessage(`Error Message:${error.message}`, 'snackbar-error', `Error Code:${error.status}`);
    }

    return throwError( () => errorMessage );
  }
}

export { HttpHeaders };
