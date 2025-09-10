// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}


  // getData() {
  //   return this.http.get('https://example.com/404-will-fail').pipe(
  //     catchError((err) => {
  //       console.error('Error caught in ApiService:', err);
  //       return throwError(() => err); // forward to component or global
  //     })
  //   );
  // }

  getData() {
    return this.http.get('http://localhost:3000/log-error').pipe(
      catchError((err) => {
        console.error('API Error:', err);
        return throwError(() => err);
      })
    );
  }
}



