// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-test-errors',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './test-error.component.html',
//   styleUrls: ['./test-error.component.scss'],
// })
// export class TestErrorComponent {
//   message = '';

  //   constructor(
  //     private http: HttpClient,
  //     private tracker: TrackitService
  //   ) {}

  //   // 1) JavaScript runtime error
  //   triggerRuntimeError(): void {
  //     try {
  //       (null as any).doSomething();  // will throw
  //     } catch (err: any) {
  //       this.tracker.trackError(err, '/test-error');
  //     }
  //   }

  //   // 2) HTTP 500 error
  //   trigger500(): void {
  //     this.http.get('http://localhost:3000/api/server-error').subscribe({
  //       next: () => {
  //         this.message = 'Unexpected success';
  //       },
  //       error: (err) => {
  //         this.tracker.trackError(err, '/test-error');
  //       }
  //     });
  //   }
  //   // 3) HTTP 422 error
  //   trigger422(): void {
  //     this.http.get('http://localhost:3000/api/unprocessable').subscribe({
  //       next: () => {
  //         this.message = 'Unexpected success';
  //       },
  //       error: (err) => {
  //         this.tracker.trackError(err, '/test-error');
  //       }
  //     });
  //   }
// }

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-test-errors',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './test-error.component.html',
//   styleUrls: ['./test-error.component.scss'],
// })
// export class TestErrorComponent {
//   message = '';

//   constructor(private http: HttpClient) { }

//   /** 1) Runtime JavaScript error */
//   triggerRuntimeError(): void {
//     (null as any).doSomething(); // Will throw and be caught by GlobalErrorHandler
//   }

//   /** 2) HTTP 500 error */
//   trigger500(): void {
//     this.http.get('http://localhost:3000/api/server-error').subscribe({
//       next: () => this.message = 'Unexpected success from 500 endpoint',
//       error: () => this.message = '500 error triggered'
//     });
//   }

//   /** 3) HTTP 422 error */
//   trigger422(): void {
//     this.http.get('http://localhost:3000/api/unprocessable').subscribe({
//       next: () => this.message = 'Unexpected success from 422 endpoint',
//       error: () => this.message = '422 error triggered'
//     });
//   }

//   /** 4) Custom manual error */
//   triggerCustomError(): void {
//     throw new Error('This is a custom thrown error for testing');
//   }
// }




import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss'],
})
export class TestErrorComponent {
  message = '';

  /** 1) Runtime TypeError (classic JS bug) */
  triggerRuntimeError(): void {
    (null as any).doSomething(); // Null dereference
  }

  /** 2) ReferenceError (using undefined variable) */
  triggerReferenceError(): void {
    // @ts-ignore
    console.log(notDefinedVariable); // Will throw ReferenceError
  }

  /** 3) SyntaxError (dynamic code parsing) */
  triggerSyntaxError(): void {
    // Bad JSON parse (runtime SyntaxError)
    JSON.parse('{ invalid json }');
  }

  /** 4) Application logic error (manual throw) */
  triggerCustomError(): void {
    throw new Error('This is a custom thrown error for testing');
  }

  /** 5) Angular zone error (async issue inside Angular) */
  triggerAsyncError(): void {
    setTimeout(() => {
      throw new Error('Async error inside Angular zone');
    }, 0);
  }
}
